import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Category, Course, RootStackParamList } from "../types/globalTypes";
import CustomHeader from "../components/CustomHeader";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { getFilteredCategories } from "../services/get-api";

const SubCategoryScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, "SubCategoryScreen">>();

  const [category, setCategory] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { categoryName, categoryId } = route.params as {
    categoryName: string;
    categoryId: string;
  };

  const filteredCategory = async () => {
    try {
      setIsLoading(true);
      const response = await getFilteredCategories(categoryName);
      if (response?.success) {
        setCategory(response.data);
      } else {
        console.log("Veri Çekilemedi..");
      }
    } catch (error) {
      console.error(
        "There was a problem with the getFilteredCategories function:",
        error
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSeeCategories = () => {};

  const renderFilteredCategory = ({ item }: { item: Course }) => {
    return (
      <TouchableOpacity className="flex-1 p-2">
        <Image
          source={{ uri: item.imageUrl }}
          className="w-full h-36 rounded-lg"
          resizeMode="cover"
        />
        <Text className="text-center text-gray-700 text-lg font-bold pt-2">
          {item.title}
        </Text>
        <Text className="text-center text-gray-500 text-sm pb-2 overflow-hidden">
          {item.description}
        </Text>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    filteredCategory();
    console.log("TAKİPTE:", category);
  }, [categoryName, categoryId]);

  return (
    <View className="flex-1 bg-slate-200">
      <CustomHeader
        title={categoryName}
        onBackPress={() => navigation.navigate("Search")}
        logo={false}
      />
      {isLoading ? (
        <Text>Yükleniyor...</Text>
      ) : (
        <>
          <Text className="text-center text-gray-700 text-lg font-bold p-2">
            Kurslar
          </Text>
          <FlatList
            data={category.flatMap((item) => item.courses)}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            renderItem={renderFilteredCategory}
          />
        </>
      )}
    </View>
  );
};

export default SubCategoryScreen;
