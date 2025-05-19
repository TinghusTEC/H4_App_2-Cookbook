import { Stack } from "expo-router";
import { Header } from "../components/Header";
import { View } from "react-native";
import { AuthProvider } from "../context/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <View style={{ flex: 1 }}>
        <Header
          onMenu={() => {
            // TODO: open drawer or show menu with Home, Mock1, Mock2
          }}
          onProfile={() => {
            // TODO: navigate to profile
          }}
          onSearch={(q) => {
            // TODO: handle search
          }}
        />
        <Stack />
      </View>
    </AuthProvider>
  );
}