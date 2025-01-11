
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
import { register } from "../utils/auth";
import Toast from "react-native-toast-message";
import { RootStackParamList } from "../types/globalTypes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const RegisterScreen = () => {
  const navigation =
  useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  
  const [email, setEmail] = useState("asdas213@yandex.com");
  const [username, setUsername] = useState("sadsad23");
  const [password, setPassword] = useState("123456123");

  const handleLoginNavigation = () => {
    navigation.navigate("LoginScreen");
  };

  const handleRegister = async () => {
    try {
      const result = await register(email, password, username);
      if (result.success) {
        Toast.show({
          type: "success",
          text1: "Giriş Başarılı",
          text2: "Giriş yaptınız",
          position: "top",
        });

        setTimeout(() => {
          navigation.reset({
            index: 0,
            routes: [{ name: "LoginScreen" }],
          });
        }, 2000);
      } else {
        Toast.show({
          type: "error",
          text1: "Bilgileriniz yanlış ya da kullanıcı yok",
          text2: result.message,
          position: "top",
        });
      }
    } catch (error) {
      console.error("There was a problem with the login function:", error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex flex-1 justify-center items-center p-8 bg-myColor1">
        <Image
          source={require("../../assets/g.png")}
          resizeMode="contain"
          className="w-48 h-48 mb-20"
        />
        <Text className="text-center text-black text-2xl font-bold">
          Kayıt Ol
        </Text>
        <TouchableOpacity onPress={handleLoginNavigation} className="p-2 mb-8">
          <Text className="text-center text-gray-700 text-xs font-semibold">
            Hesabım var, giriş yapmak istiyorum.
          </Text>
        </TouchableOpacity>

        <TextInput
          className="w-full px-4 py-3 border-2 bg-white mb-2 rounded-lg"
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          className="w-full px-4 py-3 border-2 bg-white mb-2 rounded-lg"
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          className="w-full px-4 py-3 border-2 bg-white mb-2 rounded-lg"
          placeholder="Password"
          value={password}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />

        <TouchableOpacity
          onPress={handleRegister}
          className="w-full bg-myColor2 border p-3 rounded-lg"
        >
          <Text className="text-white text-center text-sm font-semibold">
            Kayıt Ol
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RegisterScreen;
