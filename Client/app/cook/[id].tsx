import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  useWindowDimensions,
  Alert,
} from "react-native";
import { getRecipeById } from "../../services/recipeService";
import type { IRecipe, IRecipeStep } from "../../interfaces/IRecipe";
import { CookStepView } from "../../components/CookStepView";

export default function CookScreen() {
  const { id } = useLocalSearchParams();
  const [recipe, setRecipe] = useState<IRecipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const router = useRouter();

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
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!recipe) {
    return (
      <View style={styles.centered}>
        <Text>Recipe not found.</Text>
      </View>
    );
  }

  const steps = recipe.steps;

  function handlePrev() {
    if (currentStep === 0) {
      // Cancel: go back
      router.back();
    } else {
      setCurrentStep(s => Math.max(0, s - 1));
    }
  }

  function handleNext() {
    if (currentStep === steps.length - 1) {
      // TODO: Create cookHistory item here
      router.replace("/cookHistory");
    } else {
      setCurrentStep(s => Math.min(steps.length - 1, s + 1));
    }
  }

  return (
    <View style={styles.container}>
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
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});