import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { mockUsers } from "../store/mockData/mockUserData";
import { useAuth } from "../context/AuthContext";

export const Login: React.FC = () => {
  const { setUser } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a user to log in:</Text>
      {mockUsers.map((user) => (
        <TouchableOpacity
          key={user.id}
          style={styles.card}
          onPress={() => setUser(user)}
        >
          <Text style={styles.name}>{user.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: "center", marginTop: 40 },
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