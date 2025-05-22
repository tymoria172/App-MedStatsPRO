import { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { EnvelopeSimple } from 'phosphor-react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { AuthService } from '../../../service/authService';
import { useToast } from '../../../contexts/toastContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthRoutes } from '../../../routes/auth.routes';
import React from 'react';
import ShakeAnimation, { ShakeAnimationRef } from '../../../components/global/snakeAnimation';

type ForgotPasswordNavigationProp = NativeStackNavigationProp<AuthRoutes, 'forgotPassword'>;

export default function ForgotPassword() {
  const [email, setEmail] = useState('generico1MobSolution@gmail.com');
  const [code, setCode] = useState(['', '', '', '', '']);
  const [step, setStep] = useState(1); // 1 = email, 2 = código
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const navigation = useNavigation<ForgotPasswordNavigationProp>();
  const [loading, setLoading] = useState(false);

  const { showToast } = useToast();
  const shakeRef = useRef<ShakeAnimationRef>(null);

  const handleSendEmail = async () => {
    if (!email) {
      showToast('E-mail inválido. Por favor, insira um e-mail válido', 'error');
      shakeRef.current?.shake();
      return;
    }

    setLoading(true);
    const response = await AuthService.recuperarSenha(email);
    setLoading(false);

    console.log('resposta', response)

    if (response.error) {
      showToast('Falha ao solicitar o Token', 'error');
      shakeRef.current?.shake();
    } else {
      showToast('E-mail enviado com sucesso.', 'success');
      setTimeout(() => {
        setStep(2)
      }, 500);

    }
  };

  const validarCodigo = async () => {
    const fullCode = code.join('');

    if (fullCode !== '12345') {
      showToast('Código inválido. Tente novamente.');
      shakeRef.current?.shake();
      setCode(['', '', '', '', '']);
      inputRefs.current[0]?.focus();
      return;
    }

    const response = await AuthService.validarTokenRecuperacao(email, fullCode);

    if (response.error) {
      showToast('Erro ao validar código. Tente novamente.');
      shakeRef.current?.shake();
      setCode(['', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } else {
      showToast('Código validado com sucesso', 'success');
      setTimeout(() => {
        navigation.navigate('resetPassword', {
          email: email,
          token: fullCode
        });
      }, 500);

    }
  };

  useEffect(() => {
    if (step === 2 && code.every(c => c !== '')) {
      validarCodigo();
    }
  }, [code, step]);

  const handleCodeChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  if (step === 1) {
    return (
      <ShakeAnimation
        ref={shakeRef}
        style={{ flex: 1 }}
        intensity={10} 
        duration={400} 
      >
        <View style={styles.container}>
          <Text style={styles.subtitle}>Esqueceu a senha?</Text>
          <View style={styles.subtitleWrapper}>
            <Text style={styles.textSubtitle}>
              Insira seu e-mail para enviarmos um email de recuperação de senha
            </Text>
          </View>

          <View style={styles.inputWrapper}>
            <EnvelopeSimple size={20} weight="light" style={styles.icon} />
            <TextInput
              placeholder="Insira seu E-mail"
              placeholderTextColor="#999"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={handleSendEmail}
            disabled={!email || loading}
          >
            <Text style={styles.buttonText}>Enviar Código</Text>
          </TouchableOpacity>
        </View>
      </ShakeAnimation>

    );
  }

  return (
    <ShakeAnimation
      ref={shakeRef}
      style={{ flex: 1 }}
      intensity={10} 
      duration={400} 
    >
      <View style={styles.container}>
        <Text style={styles.subtitle}>Verifique o código</Text>
        <View style={styles.subtitleWrapper}>
          <Text style={styles.textSubtitle}>
            Verifique o código que enviamos para o email {email.replace(/(.{3}).*@/, '$1****@')}
          </Text>
        </View>

        <View style={styles.codeContainer}>
          {[0, 1, 2, 3, 4].map((index) => (
            <TextInput
              key={index}
              style={styles.codeInput}
              maxLength={1}
              keyboardType="numeric"
              value={code[index]}
              onChangeText={(text) => handleCodeChange(text, index)}
              ref={(ref) => (inputRefs.current[index] = ref)}
            />
          ))}
        </View>

        <TouchableOpacity
          style={styles.resendButton}
          onPress={handleSendEmail}
        >
          <Text style={styles.resendText}>Reenviar código</Text>
        </TouchableOpacity>
      </View>
    </ShakeAnimation>

  );
}
