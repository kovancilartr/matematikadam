import { View, Text } from "react-native";
import React, { useEffect } from "react";
import CustomHeader from "../components/CustomHeader";
import { useAuth } from "../store/AuthContext";

const ServicesScreen = () => {
  const { userLoggedIn } = useAuth();

  useEffect(() => {
    const test = async () => {
      console.log("USERLOGGEDIN:", userLoggedIn);
    };
    test();
  }, []);
  return (
    <View>
      <CustomHeader
        title="Services"
        onBackPress={() => console.log("onBackPress")}
        logo={true}
      />
      <Text>ServicesScreen</Text>
    </View>
  );
};

export default ServicesScreen;
