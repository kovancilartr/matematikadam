import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import CustomHeader from "../components/CustomHeader";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Course, RootStackParamList } from "../types/globalTypes";
import MeVideoPlayer from "../utils/video-player";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../store/AuthContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Toast from "react-native-toast-message";

const CourseDetailScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, "CourseDetailScreen">>();
  const { currentUser, userLoggedIn } = useAuth();
  const { course } = route.params as {
    course: Course;
  };

  useEffect(() => {
    if (!userLoggedIn) {
      Toast.show({
        type: "error",
        text1: "Giriş yapmış olmanız gerekmektedir",
        text2: "Lütfen giriş yapın",
        position: "top",
      });
      setTimeout(() => {
        navigation.navigate("Home"); // Kullanıcı girişi yapılmamışsa LoginScreen'e yönlendir
        // navigation.navigate("LoginScreen");
      }, 500);
    } else {
      console.log("currentUser:", currentUser);
    }
  }, [currentUser, navigation]);

  if (!currentUser) {
    return null;
  }
  return (
    <View className="flex-1 bg-slate-100">
      {/* Custom Header */}
      <CustomHeader
        title={course.title}
        onBackPress={() => navigation.goBack()}
        logo={false}
      />

      {/* Video Player Section */}
      <View className="p-4">
        <MeVideoPlayer videoUrl={course.videoUrl} />
      </View>

      {/* Course Details */}
      <View className="flex-1 bg-white mx-4 my-6 p-6 rounded-2xl shadow-lg mb-10">
        {/* Price Tag */}
        <TouchableOpacity className="absolute top-0 z-10 right-0 bg-myColor4 rounded-full px-4 py-2 shadow-lg">
          <Text className="text-white font-bold text-base">
            {course.price} TL
          </Text>
        </TouchableOpacity>

        <View className="mb-4">
          <Text className="text-2xl font-semibold text-gray-800">
            {course.title}
          </Text>
          <Text className="text-gray-600 mt-2">{course.description}</Text>
        </View>

        {/* Sections Header */}
        <Text className="text-center text-lg font-bold text-gray-700 mb-4">
          Bölümler
        </Text>

        {/* Sections List */}
        <ScrollView className="space-y-4">
          {course.sections.map((section) => (
            <View
              key={section.documentId}
              className="bg-slate-50 border border-gray-200 rounded-lg p-4 shadow-sm mb-4"
            >
              <Text className="text-lg font-bold text-gray-800 mb-2">
                {section.title}
              </Text>
              {section.chapters.map((chapter) => (
                <TouchableOpacity
                  key={chapter.documentId}
                  className="flex-row items-center border-b border-gray-200 py-2"
                  onPress={() => console.log(chapter.documentId)}
                >
                  {chapter.isFree ? (
                    <Ionicons name="lock-open" size={20} color="green" />
                  ) : (
                    <Ionicons name="lock-closed" size={20} color="gray" />
                  )}
                  <Text className="ml-2 text-black">{chapter.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </ScrollView>

        {/* Enroll Button */}
        <TouchableOpacity className="bg-myColor2 py-3 px-6 rounded-lg shadow-lg mt-6 mx-auto">
          <Text className="text-center text-white font-bold text-lg">
            Kursa Kayıt Ol
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CourseDetailScreen;
