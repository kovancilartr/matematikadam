import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomHeader from "../components/CustomHeader";
import { Category, RootStackParamList } from "../types/globalTypes";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { getCategories } from "../services/get-api";

const SearchScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [category, setCategory] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const response = await getCategories();
      if (response?.success) {
        setCategory(response.data);
      } else {
        console.log("Veri Çekilemedi..");
      }
    } catch (error) {
      console.error(
        "There was a problem with the fetchCategories function:",
        error
      );
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategoryPress = (categoryName: string, categoryId: string) => {
    navigation.navigate("SubCategoryScreen", {
      categoryName,
      categoryId,
    });
  };

  const renderCategory = ({ item }: { item: Category }) => {
    return (
      <TouchableOpacity
        className="flex-row items-center py-3 px-2 border-b border-gray-300"
        onPress={() => handleCategoryPress(item.name, item.documentId)}
      >
        <View
          className="rounded-full p-2 mr-4"
          style={{ backgroundColor: item.color }}
        >
          <FontAwesome6 name={item.icon as any} size={20} color="white" />
        </View>
        <Text className="text-xl flex-1 px-4">{item.name}</Text>
        <Ionicons name="chevron-forward" size={20} color="gray" />
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 bg-slate-200">
      <CustomHeader
        title="Search"
        onBackPress={() => console.log("onBackPress")}
        logo={true}
      />
      <TextInput
        className="h-12 border border-gray-300 bg-white px-3 my-4 mx-4 rounded-lg"
        placeholder="Search"
      />
      <Text className="text-center text-gray-700 text-lg font-bold">
        Kategoriler
      </Text>
      <FlatList
        data={category}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id.toString()}
        className="px-2"
      />
    </View>
  );
};

export default SearchScreen;
