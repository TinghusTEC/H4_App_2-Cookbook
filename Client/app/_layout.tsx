import { router, Stack } from "expo-router";
import { Header } from "../components/Header";
import { View } from "react-native";
import { AuthProvider } from "../context/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <View style={{ flex: 1 }}>
        <Header
          onMenu={() => {
            // TODO: open drawer or show menu with Home, Mock1, Mock2
          }}
          onProfile={() => router.push({ pathname: "/account" })}
          onSearch={(q) => {
            // TODO: handle search
          }}
        />
        <Stack>
          <Stack.Screen name="index" options={{ title: "Home" }} />
          <Stack.Screen name="recipe/[id]" options={{ title: "Recipes" }} />
          <Stack.Screen name="cook/[id]" options={{ title: "Cook" }} />
          <Stack.Screen name="recipe/index" options={{ title: "Recipes" }} />
          <Stack.Screen name="recipeList/index" options={{ title: "Recipes" }} />
          <Stack.Screen name="account/index" options={{ title: "Account" }} />
        </Stack>
      </View>
    </AuthProvider>
  );
}