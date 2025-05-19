import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { saveCookHistory } from "../../services/cookHistoryService";
import { useAuth } from "../../context/AuthContext";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

export default function CookHistoryScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  const [rating, setRating] = useState("");
  const [comments, setComments] = useState("");
  const [saving, setSaving] = useState(false);
  const insets = useSafeAreaInsets();

  async function handleSave() {
    if (!user) {
      Alert.alert("Error", "User not authenticated.");
      return;
    }
    setSaving(true);
    try {
      await saveCookHistory({
        recipeId: id as string,
        userId: user.id,
        rating: Number(rating),
        comments,
        date: new Date(),
      });
      router.replace("/");
    } catch (e) {
      Alert.alert("Error", "Could not save cook history.");
    } finally {
      setSaving(false);
    }
  }

  function handleSkip() {
    router.replace("/");
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.container, { paddingBottom: insets.bottom || 16 }]}>
        <Text style={styles.title}>How did it go?</Text>
        <TextInput
          style={styles.input}
          placeholder="Rating (1-5)"
          keyboardType="numeric"
          value={rating}
          onChangeText={setRating}
        />
        <TextInput
          style={styles.input}
          placeholder="Comments"
          value={comments}
          onChangeText={setComments}
          multiline
        />
        <Button title="Save" onPress={handleSave} disabled={saving} />
        <Button title="Skip" onPress={handleSkip} color="#888" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1, padding: 24, justifyContent: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
});