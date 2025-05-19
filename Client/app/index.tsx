import { View } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { Login } from '../components/Login';
import { CookHistoryWidget } from '../components/CookHistoryWidget';
import { useEffect, useState } from 'react';
import { getCookHistory } from '../services/cookHistoryService';
import type { ICookHistory } from '../interfaces/IRecipe';

export default function HomeScreen() {
    const { user } = useAuth();
    const [history, setHistory] = useState<ICookHistory[]>([]);

    useEffect(() => {
        if (user) {
            getCookHistory().then((h) => {
                console.log('Cook history loaded:', h);
                console.log('Current user:', user);
                const filtered = h.filter((item) => String(item.userId) === String(user.id));
                console.log('Filtered cook history:', filtered);
                setHistory(filtered);
            });
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            getCookHistory().then((h) => {
                console.log('Cook history loaded:', h);
                setHistory(h.filter((item) => item.userId === user.id));
            });
        }
    }, [user]);

    if (!user) return <Login />;

    return (
        <View style={{ flex: 1, padding: 12 }}>
            <CookHistoryWidget cookHistoryArray={history} />
        </View>
    );
}
