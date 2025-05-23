import { router, Stack } from "expo-router";
import { Header } from "../components/Header";
import { View } from "react-native";
import { AuthProvider } from "../context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <AuthProvider>
                <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
                    <Header
                        onMenu={() => {
                            // TODO: Move menu logic to a separate component
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
                        <Stack.Screen name="recipeList/index" options={{ title: "Recipes" }} />
                        <Stack.Screen name="account/index" options={{ title: "Account" }} />
                    </Stack>
                </SafeAreaView>
            </AuthProvider>
        </GestureHandlerRootView>
    );
}
