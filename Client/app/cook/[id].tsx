import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { getRecipeById } from "../../services/recipeService";
import type { IRecipe } from "../../interfaces/IRecipe";
import { CookStepView } from "../../components/CookStepView";
import { useAuth } from "../../context/AuthContext";

export default function CookScreen() {
  const { id } = useLocalSearchParams();
  const [recipe, setRecipe] = useState<IRecipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const router = useRouter();
  const { user } = useAuth();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (typeof id === "string") {
      getRecipeById(id).then(r => {
        setRecipe(r ?? null);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centered}>
          <ActivityIndicator size="large" />
        </View>
      </SafeAreaView>
    );
  }

  if (!recipe) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centered}>
          <Text>Recipe not found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!user) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centered}>
          <Text>You must be logged in to cook!</Text>
        </View>
      </SafeAreaView>
    );
  }

  const steps = recipe.steps;

  function handlePrev() {
    if (currentStep === 0) {
      router.back();
    } else {
      setCurrentStep(s => Math.max(0, s - 1));
    }
  }

  function handleNext() {
    if (currentStep === steps.length - 1) {
      const recipeId = Array.isArray(id) ? id[0] : id;
      router.replace({ pathname: "/cookHistory/[id]", params: { id: recipeId } });
    } else {
      setCurrentStep(s => Math.min(steps.length - 1, s + 1));
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.container, { paddingBottom: insets.bottom || 0 }]}>
        <CookStepView
          step={steps[currentStep]}
          stepIndex={currentStep}
          totalSteps={steps.length}
          onPrev={handlePrev}
          onNext={handleNext}
          isFirst={currentStep === 0}
          isLast={currentStep === steps.length - 1}
          isLandscape={isLandscape}
          allSteps={steps}
          currentUserId={user.id}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1 },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});