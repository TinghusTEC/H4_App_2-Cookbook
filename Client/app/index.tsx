import { View, Text } from "react-native";
import { useAuth } from "../context/AuthContext";
import { Login } from "../components/Login";
import { cookHistoryMockData } from "../store/mockData/cookHistoryMockData";
import { CookHistoryWidget } from "../components/CookHistoryWidget";

export default function HomeScreen() {
  const { user } = useAuth();

  if (!user) return <Login />;

  const userHistory = cookHistoryMockData.filter(h => h.userId === user.id);

  return (
    <View style={{ flex: 1, padding: 12 }}>
      <CookHistoryWidget cookHistoryArray={userHistory} />
    </View>
  );
}