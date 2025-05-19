import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

export default function RecipeScreen() {
  const { id } = useLocalSearchParams();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Recipe ID: {id}</Text>
    </View>
  );
}