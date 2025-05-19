import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Modal, Pressable, useWindowDimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const Header: React.FC<{ onMenu?: () => void; onProfile: () => void; onSearch: (q: string) => void; }> = ({
  onMenu,
  onProfile,
  onSearch,
}) => {
  const [search, setSearch] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);
  const { width } = useWindowDimensions();

  return (
    <View style={styles.container}>
      {/* Burger menu */}
      <TouchableOpacity onPress={() => setMenuVisible(true)} style={styles.menuButton}>
        <Ionicons name="menu" size={28} color="#333" />
      </TouchableOpacity>

      {/* Search box */}
      <View style={styles.centerContainer}>
        <View style={[styles.searchBoxWrapper, { maxWidth: width > 600 ? 400 : "100%" }]}>
          <TextInput
            style={styles.searchBox}
            placeholder="Search recipes..."
            value={search}
            onChangeText={setSearch}
            onSubmitEditing={() => onSearch(search)}
            returnKeyType="search"
          />
        </View>
      </View>

      {/* Profile link */}
      <TouchableOpacity onPress={onProfile} style={styles.profileButton}>
        <Ionicons name="person-circle-outline" size={28} color="#333" />
      </TouchableOpacity>

      {/* Modal for burger menu */}
      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setMenuVisible(false)}>
          <View style={styles.menuModal}>
            <TouchableOpacity onPress={() => { setMenuVisible(false); onMenu?.(); }}>
              <Text style={styles.menuItem}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setMenuVisible(false)}>
              <Text style={styles.menuItem}>Mock Link 1</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setMenuVisible(false)}>
              <Text style={styles.menuItem}>Mock Link 2</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    position: "relative",
  },
  menuButton: {
    position: "absolute",
    left: 12,
    zIndex: 2,
    padding: 4,
  },
  profileButton: {
    position: "absolute",
    right: 12,
    zIndex: 2,
    padding: 4,
  },
  centerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  searchBoxWrapper: {
    width: "80%",
    maxWidth: 400,
  },
  searchBox: {
    width: "100%",
    minWidth: 120,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  menuModal: {
    marginTop: 50,
    marginLeft: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  menuItem: {
    fontSize: 18,
    paddingVertical: 8,
    color: "#333",
  },
});