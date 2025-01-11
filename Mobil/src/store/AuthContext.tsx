import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../types/globalTypes";
import { getCurrentUser } from "../utils/auth";

// AuthContext için doğru başlangıç değeri
const AuthContext = createContext<{
  currentUser: User | undefined;
  userLoggedIn: boolean;
  setUserLoggedIn: (loggedIn: boolean) => void;
  handleCheckUserUpdate: () => Promise<void>;
}>({
  currentUser: undefined,
  userLoggedIn: false,
  setUserLoggedIn: () => {},
  handleCheckUserUpdate: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);

  const handleCheckUserUpdate = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      setUserLoggedIn(!!token); // Token varsa true, yoksa false
    } catch (error) {
      console.error("Error checking user:", error);
    }
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        const response = await getCurrentUser(token);
        if (response.success) {
          setCurrentUser(response.data);
        }
      }
    } catch (error) {
      console.error("Error fetching current user:", error);
    }
  };

  useEffect(() => {
    handleCheckUserUpdate(); // Uygulama başladığında token kontrolü
    fetchCurrentUser(); // Kullanıcı bilgilerini getirip set etme
  }, [handleCheckUserUpdate]);

  return (
    <AuthContext.Provider
      value={{
        userLoggedIn,
        setUserLoggedIn,
        handleCheckUserUpdate,
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
