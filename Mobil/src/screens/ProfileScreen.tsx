import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import CustomHeader from "../components/CustomHeader";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { getCurrentUser, logout } from "../utils/auth";
import { RootStackParamList, User } from "../types/globalTypes";
import LoginScreen from "./LoginScreen";
import { useAuth } from "../store/AuthContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const ProfileScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { setUserLoggedIn } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const token = await AsyncStorage.getItem("token");

        if (!token) {
          Toast.show({
            type: "error",
            text1: "Giriş yapmış olmanız gerekmektedir",
            text2: "Lütfen giriş yapın",
            position: "top",
          });
          navigation.navigate("LoginScreen");
        } else {
          const response = await getCurrentUser(token);

          if (response.success) {
            setUser(response.data);
          } else {
            Toast.show({
              type: "error",
              text1: "Bilgileriniz yanlış ya da kullanıcı yok",
              text2: response.success.toString(),
              position: "top",
            });
            navigation.navigate("LoginScreen");
          }
        }
      } catch (error) {
        console.error(
          "There was a problem with the  function:",
          error
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [navigation]);

  const handleLogout = async () => {
    try {
      const result = await logout();
      if (result.success) {
        await AsyncStorage.removeItem("token"); // Token sil
        setUser(null);
        setUserLoggedIn(false); // AuthContext'teki durumu güncelle
        Toast.show({
          type: "success",
          text1: "Çıkış Başarılı",
          text2: "Çıkış yaptınız",
          position: "top",
        });
        navigation.reset({
          index: 0,
          routes: [{ name: "Home" }], // Ana sayfaya yönlendir
        });
      }
    } catch (error) {
      console.error("There was a problem with the logout function:", error);
    }
  };

  return (
    <>
      {isLoading ? (
        <View className="flex flex-1 justify-center items-center p-8">
          <Text>Yükleniyor...</Text>
        </View>
      ) : user ? (
        <>
          <View>
            <CustomHeader
              title="Hesabım"
              onBackPress={() => console.log("onBackPress")}
              logo={true}
            />
          </View>
          <View className="flex flex-1 justify-around items-center p-8">
            <View className="flex flex-col items-center justify-center mb-2">
              <Text className="text-center text-gray-700 text-lg font-bold">
                {user?.username}
              </Text>
              <Text className="text-center text-gray-700 text-sm font-bold">
                {user?.email}
              </Text>
              <Text className="text-center text-gray-700 text-sm font-bold">
                {user?.documentId}
              </Text>
              <Text className="text-center text-gray-700 text-sm font-bold">
                {user?.role.type === "student"
                  ? "Öğrenci"
                  : user?.role.type === "teacher"
                  ? "Öğretmen"
                  : null}
              </Text>
            </View>
            <TouchableOpacity
              onPress={handleLogout}
              className="w-full bg-myColor2 border p-3 rounded-lg"
            >
              <Text className="text-white text-center text-sm font-semibold">
                Çıkış Yap
              </Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <LoginScreen />
      )}
    </>
  );
};

export default ProfileScreen;
