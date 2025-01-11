import React from "react";
import { View, Text, Image } from "react-native";
import { useEffect } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/globalTypes";

interface SplashScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList>;
}
const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace("Home");
    }, 2000);
  }, [navigation]);
  return (
    <View className="flex-1 items-center justify-center bg-myColor1">
      <Text className="text-4xl font-semibold italic top-28 text-myColor5">
        Video Ders Uygulaması
      </Text>
      <Image source={require("../../assets/g.png")} className="w-96 h-96" />
    </View>
  );
};

export default SplashScreen;
