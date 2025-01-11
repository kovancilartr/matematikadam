import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { login } from "../utils/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { useAuth } from "../store/AuthContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/globalTypes";

const LoginScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [email, setEmail] = useState("ogrencitest1@yandex.com");
  const [password, setPassword] = useState("123456");
  const { handleCheckUserUpdate } = useAuth();

  const handleRegisterNavigation = () => {
    navigation.navigate("RegisterScreen");
  };

  const handleLogin = async () => {
    try {
      const result = await login(email, password);
      if (result.success) {
        await AsyncStorage.setItem("token", result.token); // Token sakla

        handleCheckUserUpdate(); // Kullanıcı durumunu güncelle

        Toast.show({
          type: "success",
          text1: "Giriş Başarılı",
          text2: "Giriş yaptınız",
          position: "top",
        });
        setTimeout(() => {
          navigation.reset({
            index: 0,
            routes: [{ name: "Profile" }],
          });
        }, 1000);
      }
    } catch (error) {
      console.error("There was a problem with the login function:", error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex flex-1 justify-center items-center p-8 bg-myColor1 min-h-screen">
        <Image
          source={require("../../assets/g.png")}
          resizeMode="contain"
          className="w-56 h-56 border rounded-3xl bg-gray-100 mb-10"
        />

        <View className="w-full flex flex-col items-center justify-center gap-y-2">
          <View className="flex flex-row items-center gap-x-2 px-8">
            <Text className="text-md">Email :</Text>
            <TextInput
              className="w-full px-4 py-3 border border-gray-300 bg-white mb-2 rounded-lg"
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>

          <View className="flex flex-row items-center gap-x-2 px-8">
            <Text className="text-md">Şifre :</Text>
            <TextInput
              className="w-full px-4 py-3 border border-gray-300 bg-white mb-2 rounded-lg"
              placeholder="Password"
              value={password}
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
            />
          </View>

          <TouchableOpacity
            onPress={handleLogin}
            className="w-full bg-myColor2 border p-3 rounded-lg"
          >
            <Text className="text-white text-center text-sm font-semibold">
              Giriş Yap
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;
