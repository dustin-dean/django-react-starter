import axios from "axios";

const API_URL = "http://localhost:8000/api";

export const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Request interceptor to handle CSRF token
apiClient.interceptors.request.use(async (config) => {
  // Only get CSRF token for non-GET methods
  if (config.method !== "get") {
    try {
      const { data } = await axios.get(`${API_URL}/accounts/csrf`, {
        withCredentials: true,
      });
      config.headers["X-CSRFToken"] = data.detail;
    } catch (error) {
      console.error("Failed to fetch CSRF token:", error);
    }
  }
  return config;
});

// Types based on your Django Ninja schemas
export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  email: string;
  first_name?: string;
  last_name?: string;
}

export interface ApiResponse<T> {
  data: T;
}

export interface MessageResponse {
  detail: string;
}

// Auth API functions
export const authApi = {
  login: async (credentials: LoginCredentials): Promise<User> => {
    const { data } = await apiClient.post<User>("/accounts/login", credentials);
    return data;
  },

  register: async (credentials: RegisterCredentials): Promise<User> => {
    const { data } = await apiClient.post<User>(
      "/accounts/register",
      credentials
    );
    return data;
  },

  logout: async (): Promise<MessageResponse> => {
    const { data } = await apiClient.post<MessageResponse>("/accounts/logout");
    return data;
  },

  async getSession() {
    try {
      const { data } = await apiClient.get<User | null>("/accounts/user");
      return data;
    } catch (error: any) {
      // If 401, it means no user is logged in
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        return null;
      }
      // For other errors, rethrow
      throw error;
    }
  },
};
