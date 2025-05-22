import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/main/index';
import { Header } from '../components/global/header';
import { useAuth } from '../contexts/authContext';


const Stack = createNativeStackNavigator<AppRoutes>();

type AppRoutes = {
    home: undefined;
};

export function AppRoutes() {
    const { authState, logout } = useAuth();
    
    return (
        <Stack.Navigator initialRouteName="home">
            <Stack.Screen
                name="home"
                component={Home}
                options={{
                   header: () => <Header title="Home"  onLogout={logout} />,
                    animation: 'none',
                }}
            />
        </Stack.Navigator>
    );
}