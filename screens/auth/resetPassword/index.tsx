import { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Lock, CheckCircle, Eye, EyeSlash } from 'phosphor-react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { styles } from './styles';
import { AuthService } from '../../../service/authService';
import { theme } from '../../../styles/theme';

import React from 'react';
import ShakeAnimation, { ShakeAnimationRef } from '../../../components/global/snakeAnimation';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing
} from 'react-native-reanimated';


type AuthRoutes = {
  login: undefined;
  forgotPassword: undefined;
  resetPassword: { email: string; token: string };
};

type ResetPasswordRouteProp = RouteProp<AuthRoutes, 'resetPassword'>;

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [requirements, setRequirements] = useState({
    length: false,
    number: false,
    letter: false,
    specialChar: false,
    match: false 
  });
  const [success, setSuccess] = useState(false);
  const navigation = useNavigation();
  const route = useRoute<ResetPasswordRouteProp>();
  const { email, token } = route.params;

  useEffect(() => {
    setRequirements({
      length: password.length >= 8,
      number: /\d/.test(password),
      letter: /[a-zA-Z]/.test(password),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      match: password === confirmPassword && password !== '' // Nova lógica para verificar se as senhas confere
    });
  }, [password, confirmPassword]); 

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const shakeRef = useRef<ShakeAnimationRef>(null);

  const handleResetPassword = async () => {
    if (!Object.values(requirements).every(Boolean)) {
      Alert.alert('Senha inválida', 'Verifique todos os requisitos');
      shakeRef.current?.shake();
      return;
    }

    try {
      const response = await AuthService.modificarSenha(email, token, password);

      if (response.erro) {
        Alert.alert('Erro', response.mensagem || 'Não foi possível alterar a senha');
        shakeRef.current?.shake();
        return;
      }

      setSuccess(true);
    } catch (error) {
      Alert.alert('Erro', 'Erro ao processar a requisição');
      shakeRef.current?.shake();
    }
  };

  const handleGoToLogin = () => {
    navigation.navigate('login');
  };

  const fadeOpacity = useSharedValue(0);
  const iconScale = useSharedValue(0.5);

  useEffect(() => {
    if (success) {
      fadeOpacity.value = withTiming(1, { duration: 1000 });
      iconScale.value = withTiming(1, {
        duration: 800,
        easing: Easing.out(Easing.exp)
      });
    }
  }, [success]);

  const fadeStyle = useAnimatedStyle(() => ({
    opacity: fadeOpacity.value
  }));

  const iconAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: iconScale.value }]
  }));

  return (
    <ShakeAnimation
      ref={shakeRef}
      style={{ flex: 1 }}
      intensity={10}
      duration={400}
    >
      <View style={styles.container}>
        {success ? (
          <Animated.View style={[styles.successContainer, fadeStyle]}>
            <Animated.View style={iconAnimatedStyle}>
              <CheckCircle
                size={150}
                color={theme.colors.background}
                weight="light"
              />
            </Animated.View>
            <Text style={styles.successTitle}>Senha redefinida!</Text>
            <Text style={styles.successText}>
              Sua senha foi redefinida com sucesso.{'\n'}
              Clique abaixo para fazer o login
            </Text>

          
            <TouchableOpacity
              style={[styles.button, { marginTop: 32, paddingVertical: 14 }]}
              onPress={handleGoToLogin}
            >
              <Text style={[styles.buttonText, { fontSize: 16 }]}>Login</Text>
            </TouchableOpacity>
          </Animated.View>
        ) : (
          <View style={styles.containerinfo}>
            <Text style={styles.title}>Redefina sua senha</Text>
            <Text style={styles.subtitle}>
              Sua nova senha deve ser diferente de senhas utilizadas previamente
            </Text>

            <View style={styles.inputWrapper}>
              <Lock
                size={20}
                color={theme.colors.primary}
                weight="fill"
                style={styles.icon}
              />
              <TextInput
                placeholder="Insira nova senha"
                placeholderTextColor="#999"
                style={styles.input}
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                onPress={toggleShowPassword}

              >
                {showPassword ? (
                  <EyeSlash size={20} color={theme.colors.primary} weight="fill" />
                ) : (
                  <Eye size={20} color={theme.colors.primary} weight="fill" />
                )}
              </TouchableOpacity>
            </View>

            <View style={styles.inputWrapper}>
              <Lock
                size={20}
                color={theme.colors.primary}
                weight="fill"
                style={styles.icon}
              />
              <TextInput
                placeholder="Confirme nova senha"
                placeholderTextColor="#999"
                style={styles.input}
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <TouchableOpacity
                onPress={toggleShowConfirmPassword}

              >
                {showConfirmPassword ? (
                  <EyeSlash size={20} color={theme.colors.primary} weight="fill" />
                ) : (
                  <Eye size={20} color={theme.colors.primary} weight="fill" />
                )}
              </TouchableOpacity>
            </View>

            <View style={styles.requirementsContainer}>
              <Text style={styles.requirementsTitle}>Pré-requisitos:</Text>

              <RequirementItem
                checked={requirements.match}
                text="As senhas devem conferir"
              />
              <RequirementItem
                checked={requirements.length}
                text="Conter pelo menos 8 caracteres"
              />
              <RequirementItem
                checked={requirements.number}
                text="Conter pelo menos um número"
              />
              <RequirementItem
                checked={requirements.letter}
                text="Conter pelo menos uma letra"
              />
              <RequirementItem
                checked={requirements.specialChar}
                text="Conter pelo menos um caractere especial (!@#$%^&*)"
              />
            </View>

            <TouchableOpacity
              style={[
                styles.button,
                !Object.values(requirements).every(Boolean) && styles.buttonDisabled
              ]}
              onPress={handleResetPassword}
              disabled={!Object.values(requirements).every(Boolean)}
            >
              <Text style={styles.buttonText}>Redefinir senha</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ShakeAnimation>
  );
}

const RequirementItem = ({ checked, text }: { checked: boolean; text: string }) => (
  <View style={styles.requirementItem}>
    <CheckCircle
      size={20}
      weight={checked ? 'fill' : 'light'}
      color={checked ? theme.colors.success : '#9ca3af'}
    />
    <Text
      style={[
        styles.requirementText,
        checked && styles.requirementTextChecked
      ]}
    >
      {text}
    </Text>
  </View>
);