import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    useWindowDimensions,
    Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import type { ICookHistory, IRecipe } from '../interfaces/IRecipe';
import { getRecipes } from '../services/recipeService';

type Props = {
    cookHistoryArray: ICookHistory[];
};

export const CookHistoryWidget: React.FC<Props> = ({ cookHistoryArray }) => {
    const { width, height } = useWindowDimensions();
    const [isLandscape, setIsLandscape] = useState(width > height);
    const [recipes, setRecipes] = useState<IRecipe[]>([]);
    const router = useRouter();

    useEffect(() => {
        setIsLandscape(width > height);
    }, [width, height]);

    // Load recipes from persistent storage/service
    useEffect(() => {
        getRecipes().then(setRecipes);
    }, []);

    const sortedHistory = [...cookHistoryArray].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );

    const getRecipe = (id: string) => recipes.find((r) => r.id === id);

    const renderItem = ({ item }: { item: ICookHistory }) => {
        const recipe = getRecipe(item.recipeId);
        if (!recipe) {
            console.warn('No recipe found for recipeId:', item.recipeId);
            return null;
        }

        const imageSource = { uri: recipe.imageUrl };

        if (!isLandscape) {
            // Compact view for portrait
            return (
                <TouchableOpacity
                    style={styles.compactItem}
                    onPress={() =>
                        router.push({ pathname: '/recipe/[id]', params: { id: item.recipeId } })
                    }
                >
                    <Image
                        source={require('../assets/images/recipes/default.jpg')}
                        style={styles.compactImage}
                    />
                    <View style={styles.compactTextContainer}>
                        <Text
                            style={styles.recipeName}
                            numberOfLines={1}
                        >
                            {recipe.name}
                        </Text>
                        <Text style={styles.compactSub}>
                            {item.rating} ⭐ • {new Date(item.date).toLocaleDateString()}
                        </Text>
                    </View>
                </TouchableOpacity>
            );
        }

        // Landscape: horizontal layout, larger text, better alignment
        return (
            <TouchableOpacity
                style={styles.itemLandscape}
                onPress={() =>
                    router.push({ pathname: '/recipe/[id]', params: { id: item.recipeId } })
                }
            >
                {/* Left: Image */}
                <Image
                    source={imageSource}
                    style={styles.landscapeImage}
                />
                {/* Center: Main info */}
                <View style={styles.landscapeInfo}>
                    <Text
                        style={styles.recipeNameLandscape}
                        numberOfLines={1}
                    >
                        {recipe.name}
                    </Text>
                    <Text style={styles.extraLandscape}>Rating: {item.rating} ⭐</Text>
                    <Text style={styles.extraLandscape}>
                        Cooked: {new Date(item.date).toLocaleDateString()}
                    </Text>
                    <Text style={styles.extraLandscape}>Time: {item.totalCookTime} min</Text>
                    <Text style={styles.extraLandscape}>
                        Favorite: {item.isFavorite ? 'Yes' : 'No'}
                    </Text>
                </View>
                {/* Right: Ingredients */}
                <View style={styles.landscapeIngredients}>
                    <Text style={styles.ingredientTitle}>Ingredients:</Text>
                    {recipe.ingredients.slice(0, 4).map((ing) => (
                        <Text
                            key={ing.id}
                            style={styles.ingredientItemLandscape}
                        >
                            • {ing.name} {ing.quantity}
                            {ing.unit}
                        </Text>
                    ))}
                    {recipe.ingredients.length > 4 && (
                        <Text style={styles.ingredientItemLandscape}>...and more</Text>
                    )}
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.widgetContainer}>
            <Text style={styles.title}>History</Text>
            {sortedHistory.length === 0 ? (
                <TouchableOpacity
                    style={styles.placeholder}
                    onPress={() => router.push('/')}
                >
                    <Text style={styles.placeholderText}>
                        No cooked recipes. Click here to find recipes and start cooking
                    </Text>
                </TouchableOpacity>
            ) : (
                <FlatList
                    data={sortedHistory}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    style={styles.list}
                    contentContainerStyle={{ paddingBottom: 32 }}
                    showsVerticalScrollIndicator={false}
                    ListFooterComponent={<View style={{ height: 24 }} />}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    widgetContainer: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        margin: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        minHeight: 120,
        flex: 1,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#222',
    },
    list: {
        flex: 1,
    },
    // Compact view
    compactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    compactImage: {
        width: 72,
        height: 72,
        borderRadius: 14,
        marginRight: 16,
        backgroundColor: '#eee',
    },
    compactTextContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    recipeName: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#333',
    },
    compactSub: {
        color: '#888',
        fontSize: 17,
        marginTop: 2,
    },
    // Landscape view
    itemLandscape: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        minHeight: 100,
    },
    landscapeImage: {
        width: 100,
        height: 100,
        borderRadius: 18,
        backgroundColor: '#eee',
        marginRight: 16,
    },
    landscapeInfo: {
        flex: 2,
        justifyContent: 'flex-start',
        minWidth: 120,
        paddingRight: 12,
    },
    recipeNameLandscape: {
        fontWeight: 'bold',
        fontSize: 22,
        color: '#222',
        marginBottom: 2,
    },
    extraLandscape: {
        fontSize: 18,
        color: '#555',
        marginTop: 1,
    },
    landscapeIngredients: {
        flex: 1.2,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        minWidth: 110,
        paddingLeft: 12,
    },
    ingredientTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 2,
        color: '#333',
    },
    ingredientItemLandscape: {
        fontSize: 16,
        color: '#444',
        marginBottom: 1,
    },
    // Shared
    placeholder: {
        padding: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    placeholderText: {
        color: '#888',
        fontSize: 18,
        textAlign: 'center',
    },
});
