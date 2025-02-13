import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  LoginCredentials,
  RegisterCredentials,
  User,
  authApi,
} from "@/lib/api-client";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (
    credentials: LoginCredentials
  ) => Promise<{ success: boolean; error?: string }>;
  register: (credentials: RegisterCredentials) => Promise<boolean>;
  logout: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getSession = useCallback(async () => {
    try {
      const user = await authApi.getSession();
      setUser(user);
    } catch (error) {
      console.warn("Session retrieval failed", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getSession();
  }, [getSession]);

  const login = async (credentials: LoginCredentials) => {
    try {
      setError(null);
      const result = await authApi.login(credentials);
      setUser(result);
      return { success: true };
    } catch (error: any) {
      let errorMessage = "An error occurred during login";

      if (error.status === 400) {
        // Specifically handle 400 status errors (likely invalid credentials)
        errorMessage =
          error.detail ||
          "Invalid credentials. Please check your email and password.";
      } else if (error instanceof Error) {
        // For other types of errors, use the error message
        errorMessage = error.message;
      }

      // Set the error state
      setError(errorMessage);

      // Return the error information
      return {
        success: false,
        error: errorMessage,
      };
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    try {
      setError(null);
      const user = await authApi.register(credentials);
      setUser(user);
      return true;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An error occurred during registration");
      }
      return false;
    }
  };

  const logout = async () => {
    try {
      setError(null);
      await authApi.logout();
      setUser(null);
      return true;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An error occurred during logout");
      }
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, error, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
