"use client";

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { User } from "../types/globalTypes";
import { getCurrentUser, login } from "@/lib/auth";
import toast from "react-hot-toast";

interface AuthContextType {
  currentUser: User | null;
  isLoggedIn: boolean;
  loading: boolean;
  loginUser: (
    email: string,
    password: string
  ) => Promise<{
    success: boolean;
    token?: string;
    user?: User;
    message?: string;
  }>;
  logoutUser: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const fetchUser = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (token) {
        const response = await getCurrentUser(token);
        if (response.success) {
          setCurrentUser(response.data);
          setLoading(false);
          setIsLoggedIn(true);
        } else {
          setCurrentUser(null);
          setLoading(false);
          setIsLoggedIn(false);
        }
      } else {
        setCurrentUser(null);
        setLoading(false);
        setIsLoggedIn(false);
        console.log("Token yok");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setCurrentUser(null);
      setLoading(false);
      setIsLoggedIn(false);
    }
  }, []);

  const loginUser = async (email: string, password: string) => {
    try {
      const response = await login(email, password);

      if (response.success) {
        localStorage.setItem("token", response.token);
        const userResponse = await getCurrentUser(response.token);

        setCurrentUser(userResponse.data);
        setIsLoggedIn(true);
        setLoading(false);

        return {
          success: true,
          token: response.token,
          user: response.user,
          message: "Giriş başarılı",
        };
      } else {
        return {
          success: false,
          message: response.message,
        };
      }
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        message: "Bir hata oluştu. Lütfen tekrar deneyin.",
      };
    }
  };

  const logoutUser = () => {
    setLoading(true);
    localStorage.removeItem("token");
    setCurrentUser(null);
    setIsLoggedIn(false);
    setLoading(false);
    toast.success("Çıkış yaptınız", {
      style: {
        textAlign: "center",
      },
    });
    router.push("/browse"); // Yönlendirme
  };

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isLoggedIn,
        loading,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
