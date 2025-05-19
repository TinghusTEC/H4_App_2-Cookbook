import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

export default function CookScreen() {
  const { id } = useLocalSearchParams();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Cook Screen for Recipe ID: {id}</Text>
    </View>
  );
}