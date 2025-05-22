import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/auth/login';
import ForgotPassword from '../screens/auth/forgotPassword';
import ResetPassword from '../screens/auth/resetPassword';
import { Header } from '../components/global/header';
import { useAuth } from '../contexts/authContext';

export type AuthRoutes = {
  login: undefined;
  forgotPassword: undefined;
  resetPassword: { email: string; token: string };
};

const Stack = createNativeStackNavigator<AuthRoutes>();

interface AuthRoutesProps {
  onLoginSuccess: () => void;
}

export function AuthRoutes() {
  
  return (
    <Stack.Navigator initialRouteName="login">
      <Stack.Screen
        name="forgotPassword"
        component={ForgotPassword}
        options={{
          header: () => <Header showBack title='a' />,
          animation: 'none',
        }}
      />
      <Stack.Screen
        name="resetPassword"
        component={ResetPassword}
        options={{
          header: () => <Header showBack title='a'  />,
          animation: 'none',
        }}
      />
      <Stack.Screen
        name="login"
        component={Login}
        options={{ header: () => null, animation: 'none' }}
      />
    </Stack.Navigator>
  );
}

