import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "./global.css";
import SplashScreen from "./src/screens/SplashScreen";
import TabNavigator from "./src/navigation/TabNavigator";
import Toast from "react-native-toast-message";
import RegisterScreen from "./src/screens/RegisterScreen";
import { AuthProvider } from "./src/store/AuthContext";
import CourseDetailScreen from "./src/screens/CourseDetailScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <AuthProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Home" component={TabNavigator} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen name="CourseDetailScreen" component={CourseDetailScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
      <Toast />
    </>
  );
}
