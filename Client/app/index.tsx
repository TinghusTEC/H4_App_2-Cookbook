import { View, Button, StyleSheet } from "react-native";
import { useAuth } from "../context/AuthContext";
import { Login } from "../components/Login";
import { CookHistoryWidget } from "../components/CookHistoryWidget";
import { useEffect, useState } from "react";
import { getCookHistory } from "../services/cookHistoryService";
import type { ICookHistory } from "../interfaces/IRecipe";
import { useRouter } from "expo-router";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function HomeScreen() {
    const { user } = useAuth();
    const [history, setHistory] = useState<ICookHistory[]>([]);
    const router = useRouter();
    const insets = useSafeAreaInsets();

    useEffect(() => {
        if (user) {
            getCookHistory().then((h) => {
                const filtered = h.filter((item) => String(item.userId) === String(user.id));
                setHistory(filtered);
            });
        }
    }, [user]);

    if (!user) return <Login />;

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
                <View style={styles.container}>
                    <View style={styles.historyContainer}>
                        <CookHistoryWidget cookHistoryArray={history} />
                    </View>
                    <View style={[styles.buttonContainer, { paddingBottom: insets.bottom || 16 }]}>
                        <Button
                            title="Show recipes"
                            onPress={() => router.push({ pathname: "/recipeList" })}
                            color="#2563eb"
                        />
                    </View>
                </View>
            </SafeAreaView>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#fff",
    },
    container: {
        flex: 1,
        padding: 12,
        justifyContent: "flex-start",
    },
    historyContainer: {
        flex: 1,
        marginBottom: 24,
    },
    buttonContainer: {
        marginTop: "auto",
        marginBottom: 0,
    },
});
