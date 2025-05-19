import React, { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import DraggableFlatList, { RenderItemParams } from "react-native-draggable-flatlist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native";
import { mockUsers } from "../store/mockData/mockUserData";
import { useAuth } from "../context/AuthContext";

const STORAGE_KEY = "LOGIN_USER_ORDER";

export const Login: React.FC = () => {
  const { setUser } = useAuth();
  const [users, setUsers] = useState(mockUsers);

  // Load order from AsyncStorage
  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const ids = JSON.parse(saved);

          const ordered = ids
            .map((id: string) => mockUsers.find(u => u.id === id))
            .filter(Boolean);
          const missing = mockUsers.filter(u => !ids.includes(u.id));
          setUsers([...ordered, ...missing]);
        } catch {
          setUsers(mockUsers);
        }
      }
    })();
  }, []);

  const saveOrder = useCallback(async (data: typeof mockUsers) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data.map(u => u.id)));
  }, []);

  const handleDragEnd = useCallback(({ data }) => {
    setUsers(data);
    saveOrder(data);
  }, [saveOrder]);

  const renderItem = useCallback(
    ({ item, drag, isActive }: RenderItemParams<typeof mockUsers[0]>) => (
      <TouchableOpacity
        style={[
          styles.card,
          isActive && { backgroundColor: "#e0e7ff" }
        ]}
        onLongPress={drag}
        onPress={() => setUser(item)}
        delayLongPress={150}
      >
        <Text style={styles.name}>{item.name}</Text>
      </TouchableOpacity>
    ),
    [setUser]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a user to log in:</Text>
      <DraggableFlatList
        data={users}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        onDragEnd={handleDragEnd}
        activationDistance={8}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: "center", marginTop: 40, flex: 1 },
  title: { fontSize: 18, marginBottom: 16 },
  card: {
    backgroundColor: "#fff",
    paddingVertical: 28,
    paddingHorizontal: 32,
    borderRadius: 14,
    marginVertical: 14,
    width: 280,
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    borderWidth: 1,
    borderColor: "#ddd",
  },
  name: { fontSize: 20, fontWeight: "bold", color: "#222" },
});