import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  StyleSheet
} from 'react-native';
import { EnvelopeSimple, Lock, Eye, EyeSlash } from 'phosphor-react-native';
import { useAuth } from '../../../contexts/authContext';
import { styles as loginStyles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { useToast } from '../../../contexts/toastContext';
import { theme } from '../../../styles/theme';
import { AppLogoGradient } from '../../../components/global/logo';
import { Header } from '../../../components/global/header';
import { LinearGradient } from 'expo-linear-gradient';
import ShakeAnimation, { ShakeAnimationRef } from '../../../components/global/snakeAnimation';

const gradientStyles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  }
});

export default function Login() {
  const [email, setEmail] = useState('generico1MobSolution@gmail.com');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigation = useNavigation();

  const { showToast } = useToast();
  const { login } = useAuth();

  const shakeRef = useRef<ShakeAnimationRef>(null);

  const handleLogin = async () => {
    if (!email || !password) {
      showToast('Atenção preencha todos os campos', 'error');
      shakeRef.current?.shake();
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      showToast('Login realizado com sucesso!', 'success');
    } catch (error) {
      let errorMessage = error.message ?? 'Erro desconhecido';
      if (errorMessage === 'Usuário+ou+senha+inválidos.') {
        errorMessage = 'Usuário ou senha inválidos'
      }
      console.log(errorMessage)
      showToast(errorMessage);
      shakeRef.current?.shake();
    } finally {
      setLoading(false);
    }
  };

  const goToForgotPassword = () => {
    navigation.navigate('forgotPassword');
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ShakeAnimation
      ref={shakeRef}
      style={gradientStyles.gradientContainer}
      intensity={10} // Opcional (default é 8)
      duration={400} // Opcional (default é 300ms)
    >
      <LinearGradient
        colors={['#e63946', '#f3eeee', '#ffffff']}
        locations={[0.1, 0.25, 1]}
        style={gradientStyles.gradientContainer}
      >
        <Header />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={loginStyles.container}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
              contentContainerStyle={loginStyles.scrollContainer}
              keyboardShouldPersistTaps="handled"
            >
              <View style={loginStyles.innerContainer}>
                <View style={loginStyles.containerIcon}><AppLogoGradient /></View>
                <Text style={loginStyles.subtitle}>Bem-vindo(a) de volta!</Text>

                <View style={loginStyles.inputWrapper}>
                  <EnvelopeSimple size={20} weight="light" style={loginStyles.icon} />
                  <TextInput
                    placeholder="Email"
                    placeholderTextColor="#999"
                    style={loginStyles.input}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>

                <View style={loginStyles.inputWrapper}>
                  <Lock size={20} weight="light" style={loginStyles.icon} />
                  <TextInput
                    placeholder="Senha"
                    placeholderTextColor="#999"
                    secureTextEntry={!showPassword}
                    style={loginStyles.input}
                    value={password}
                    onChangeText={setPassword}
                  />
                  <TouchableOpacity onPress={toggleShowPassword} style={loginStyles.passwordToggle}>
                    {showPassword ? (
                      <EyeSlash size={20} weight="light" color={theme.colors.primary} />
                    ) : (
                      <Eye size={20} weight="light" color={theme.colors.primary} />
                    )}
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={loginStyles.button}
                  onPress={handleLogin}
                  disabled={loading}
                >
                  <Text style={loginStyles.buttonText}>
                    {loading ? 'Carregando...' : 'Entrar'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={goToForgotPassword}>
                  <Text style={loginStyles.forgotPassword}>Esqueci a senha</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </LinearGradient>
    </ShakeAnimation>

  );
}