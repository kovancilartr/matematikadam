import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

interface CustomHeaderProps {
  title?: string;
  onBackPress?: () => void;
  logo?: boolean;
  rightButtonText?: string;
  onRightPress?: () => void;
}

const CustomHeader = ({
  title,
  onBackPress,
  logo,
  rightButtonText,
  onRightPress,
}: CustomHeaderProps) => {
  return (
    <View className="flex-row flex items-center justify-between bg-myColor2 px-6 pt-10 h-28 shadow-md z-10">
      <View>
        {logo ? (
          <View className="bg-myColor1 rounded-md">
            <Image
              source={require("../../assets/g.png")}
              className="w-10 h-10 p-1"
            />
          </View>
        ) : onBackPress ? (
          <TouchableOpacity onPress={onBackPress} className="mr-2">
            <Ionicons name="arrow-back-outline" size={30} color="#fff" />
          </TouchableOpacity>
        ) : null}
      </View>

      <View className="flex-1 items-center">
        <Text className="text-lg font-bold text-white text-center">
          {title}
        </Text>
      </View>

      {rightButtonText ? (
        <TouchableOpacity onPress={onRightPress} className="ml-2">
          <Text className="text-white">{rightButtonText}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default CustomHeader;
