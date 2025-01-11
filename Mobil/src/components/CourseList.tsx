import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Course, RootStackParamList } from "../types/globalTypes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const CourseList = ({ course }: { course: Course }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  console.log("COURSE:", course);
  return (
    <TouchableOpacity
      className="flex-1 m-2 border-gray-300 bg-white overflow-hidden rounded-lg"
      onPress={() => navigation.navigate("CourseDetailScreen", { course })}
    >
      <Image source={{ uri: course?.imageUrl }} className="w-full h-48" />
      <Text className="text-center text-gray-700 text-lg font-bold pt-2">
        {course.title}
      </Text>
      <Text className="text-center text-gray-500 text-sm p-2 overflow-hidden">
        {course.description}
      </Text>
      <View className="flex-row justify-center items-center pb-2">
        <Text className="text-gray-500 text-sm">
          Section Sayısı :{" "}
          {course.sections.map((section) => (
            <Text key={section.id}>({section.title})</Text>
          ))}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CourseList;
