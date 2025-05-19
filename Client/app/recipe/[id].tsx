import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    ScrollView,
    Image,
    StyleSheet,
    useWindowDimensions,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import { getRecipeById } from '../../services/recipeService';
import type { IRecipe } from '../../interfaces/IRecipe';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export const options = {
    title: 'Recipes',
};

export default function RecipeScreen() {
    const { id } = useLocalSearchParams();
    const [recipe, setRecipe] = React.useState<IRecipe | null>(null);
    const [loading, setLoading] = React.useState(true);
    const { width, height } = useWindowDimensions();
    const isLandscape = width > height;
    const router = useRouter();
    const insets = useSafeAreaInsets();

    React.useEffect(() => {
        if (typeof id === 'string') {
            getRecipeById(id).then((r) => {
                setRecipe(r ?? null);
                setLoading(false);
            });
        }
    }, [id]);

    if (loading) {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <View style={styles.centered}>
                    <ActivityIndicator size='large' />
                </View>
            </SafeAreaView>
        );
    }

    if (!recipe) {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <View style={styles.centered}>
                    <Text>Recipe not found.</Text>
                </View>
            </SafeAreaView>
        );
    }

    // --- Overview Widget ---
    const Overview = () => (
        <View style={styles.widget}>
            <Image
                source={require('../../assets/images/recipes/default.jpg')}
                style={styles.recipeImage}
            />
            <Text style={styles.recipeName}>{recipe.name}</Text>
            <View style={styles.ratingRow}>
                <Text style={styles.ratingText}>
                    Global: {recipe.globalRating ? `${recipe.globalRating} ⭐` : 'unrated'}
                </Text>
                <Text style={styles.ratingText}>
                    | Your rating: {recipe.yourRating ? `${recipe.yourRating} ⭐` : 'unrated'}
                </Text>
            </View>
            <Text style={styles.timeText}>
                Cooking: {recipe.cookingTime} min | Working: {recipe.workingTime} min
            </Text>
            <View style={styles.tagsRow}>
                {recipe.tags.map((tag) => (
                    <View
                        key={tag}
                        style={styles.tag}
                    >
                        <Text style={styles.tagText}>{tag}</Text>
                    </View>
                ))}
            </View>
        </View>
    );

    // --- Requirements Widget ---
    const Requirements = () => (
        <View style={styles.widget}>
            <Text style={styles.sectionTitle}>Kitchenware</Text>
            <FlatList
                data={recipe.kitchenware}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <Text style={styles.requirementItem}>• {item.name}</Text>}
                scrollEnabled={false}
            />
            <Text style={[styles.sectionTitle, { marginTop: 12 }]}>Ingredients</Text>
            <FlatList
                data={recipe.ingredients}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Text style={styles.requirementItem}>
                        • {item.name} ({item.quantity} {item.unit})
                    </Text>
                )}
                scrollEnabled={false}
            />
        </View>
    );

    // --- Steps Widget ---
    const Steps = () => (
        <View style={styles.widget}>
            <Text style={styles.sectionTitle}>Steps</Text>
            {recipe.steps.map((step, idx) => {
                const stepObj = step.type;
                return (
                    <View
                        key={step.id}
                        style={styles.stepItem}
                    >
                        <Text style={styles.stepNumber}>Step {idx + 1}:</Text>
                        <Text style={styles.stepText}>{stepObj.text}</Text>
                        <Text style={styles.stepTime}>
                            {stepObj.duration ? `⏱️ ${stepObj.duration} min` : ''}
                        </Text>
                    </View>
                );
            })}
        </View>
    );

    // --- Layout ---
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={{ flex: 1 }}>
                <ScrollView
                    contentContainerStyle={
                        isLandscape ? styles.landscapeScroll : styles.portraitScroll
                    }
                >
                    {isLandscape ? (
                        <>
                            <View style={styles.landscapeTopRow}>
                                <Overview />
                                <Requirements />
                            </View>
                            <Steps />
                        </>
                    ) : (
                        <>
                            <Overview />
                            <Requirements />
                            <Steps />
                        </>
                    )}
                </ScrollView>
                <TouchableOpacity
                    style={[
                        styles.cookButton,
                        { paddingBottom: insets.bottom || 16 }
                    ]}
                    onPress={() => router.push({ pathname: '/cook/[id]', params: { id: recipe.id } })}
                >
                    <Text style={styles.cookButtonText}>Start Cooking</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    widget: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        margin: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        flex: 1,
        minWidth: 180,
    },
    recipeImage: {
        width: '100%',
        height: 160,
        borderRadius: 10,
        marginBottom: 12,
        backgroundColor: '#eee',
    },
    recipeName: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 6,
        color: '#222',
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    ratingText: {
        fontSize: 15,
        color: '#666',
        marginRight: 8,
    },
    timeText: {
        fontSize: 14,
        color: '#888',
        marginBottom: 8,
    },
    tagsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 4,
        gap: 6,
    },
    tag: {
        backgroundColor: '#e0e7ff',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 4,
        marginRight: 6,
        marginTop: 4,
    },
    tagText: {
        color: '#3730a3',
        fontWeight: 'bold',
        fontSize: 13,
    },
    sectionTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        marginBottom: 6,
        color: '#333',
    },
    requirementItem: {
        fontSize: 15,
        color: '#444',
        marginBottom: 2,
    },
    stepItem: {
        marginBottom: 12,
        backgroundColor: '#f8fafc',
        borderRadius: 8,
        padding: 10,
    },
    stepNumber: {
        fontWeight: 'bold',
        color: '#2563eb',
        marginBottom: 2,
    },
    stepText: {
        fontSize: 15,
        color: '#222',
        marginBottom: 2,
    },
    stepTime: {
        fontSize: 13,
        color: '#666',
    },
    cookButton: {
        backgroundColor: '#2563eb',
        paddingVertical: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 0,
        margin: 0,
    },
    cookButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    portraitScroll: {
        paddingBottom: 80,
    },
    landscapeScroll: {
        paddingBottom: 80,
    },
    landscapeTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: 8,
    },
});