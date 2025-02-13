import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router";

import { StrictMode } from "react";

import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/contexts/auth-context";
import HomePage from "@/pages/home";
import Login from "@/pages/login";
import Register from "@/pages/register";

import { ProtectedRoute } from "./components/auth/protected-route";
import "./style.css";

// Create router
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster />
      </AuthProvider>
    </StrictMode>
  );
}
