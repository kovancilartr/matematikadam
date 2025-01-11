import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import CustomHeader from "../components/CustomHeader";
import { Course } from "../types/globalTypes";
import CourseList from "../components/CourseList";
import { getCourses } from "../services/get-api";

const CoursesScreen = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchCourses = async () => {
    try {
      setIsLoading(true);
      const response = await getCourses();
      if (response?.success) {
        setIsLoading(false);
        setCourses(response.data);
      }
    } catch (error) {
      console.error(
        "There was a problem with the fetchCourses function:",
        error
      );
    }
  };
  useEffect(() => {
    fetchCourses();
  }, []);
  return (
    <View className="flex-1 bg-slate-200">
      <CustomHeader
        onBackPress={() => console.log("onBackPress")}
        logo={true}
      />
      <Text className="text-center text-gray-700 text-lg font-bold p-2">
        Kurslar
      </Text>
      <FlatList
        data={courses}
        renderItem={({ item }) => <CourseList key={item.id} course={item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={1}
        className="px-2"
      />
    </View>
  );
};

export default CoursesScreen;
