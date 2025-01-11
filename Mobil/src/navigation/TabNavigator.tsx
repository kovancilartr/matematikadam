import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SearchScreen from "../screens/SearchScreen";
import ServicesScreen from "../screens/ServicesScreen";
import PostAddScreen from "../screens/PostAddScreen";
import {
  AntDesign,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { View, TouchableOpacity, Text } from "react-native";
import SubCategoryScreen from "../screens/SubCategoryScreen";
import LoginScreen from "../screens/LoginScreen";
import CoursesScreen from "../screens/CoursesScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { useAuth } from "../store/AuthContext";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const { userLoggedIn } = useAuth(); // Kullanıcı durumu
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let IconComponent;

          if (route.name === "Courses") {
            IconComponent = (
              <Ionicons name="grid-outline" size={size} color={color} />
            );
          } else if (route.name === "Search") {
            IconComponent = (
              <Ionicons name="search-outline" size={size} color={color} />
            );
          } else if (route.name === "LoginScreen") {
            IconComponent = (
              <View className="absolute bottom-5 w-16 h-16 rounded-full bg-myColor2 flex items-center justify-center z-10">
                <Ionicons name="add-outline" size={size} color={color} />
              </View>
            );
          } else if (route.name === "Profile") {
            <View className="absolute bottom-5 w-16 h-16 rounded-full bg-myColor2 flex items-center justify-center z-10">
              <Ionicons name="person-outline" size={size} color={color} />
            </View>;
          } else if (route.name === "Services") {
            IconComponent = (
              <Ionicons name="list-outline" size={size} color={color} />
            );
          } else if (route.name === "PostAdd") {
            IconComponent = (
              <Ionicons name="person-outline" size={size} color={color} />
            );
          }

          return IconComponent;
        },
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: `#000`,
        tabBarInactiveTintColor: `#A1A1A1`,
        tabBarStyle: {
          height: 60,
        },
        tabBarItemStyle: {},
      })}
    >
      <Tab.Screen name="Courses" component={CoursesScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />

      {userLoggedIn ? (
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarButton: (props) => (
              <TouchableOpacity
                onPress={props.onPress}
                className="justify-center items-center -top-3"
              >
                <View className="w-12 h-12 bg-myColor2 rounded-md justify-center items-center">
                  <FontAwesome6 name="user" size={20} color="white" />
                </View>
                <Text className="mt-2 text-myColor2 font-bold">Hesabım</Text>
              </TouchableOpacity>
            ),
          }}
        />
      ) : (
        <Tab.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            tabBarButton: (props) => (
              <TouchableOpacity
                onPress={props.onPress}
                className="justify-center items-center -top-3"
              >
                <View className="w-12 h-12 bg-myColor2 rounded-md justify-center items-center">
                  <AntDesign name="login" size={22} color="white" />
                </View>
                <Text className="mt-2 text-myColor2 font-bold">Giriş Yap</Text>
              </TouchableOpacity>
            ),
          }}
        />
      )}

      <Tab.Screen name="Services" component={ServicesScreen} />
      <Tab.Screen name="PostAdd" component={PostAddScreen} />
      <Tab.Screen
        name="SubCategoryScreen"
        component={SubCategoryScreen}
        options={{
          tabBarItemStyle: {
            display: "none",
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
