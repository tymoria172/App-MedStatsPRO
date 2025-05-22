import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Asclepius } from 'phosphor-react-native';
import { theme } from '../../../styles/theme';
import { LinearGradient } from 'expo-linear-gradient';

export function AppLogo() {
  return (
    <View style={styles.container}>

      <View style={styles.logoContainer}>
        <Asclepius
          size={48}
          color={theme.colors.primary}
          weight="fill"
        />
      </View>

      <Text style={styles.appName}>
        MedStats<Text style={styles.proText}>Pro</Text>
      </Text>
    </View>
  );
}

export function AppLogoGradient() {
  return (
    <View style={styles.gradientContainer}>

      <LinearGradient
        colors={[theme.colors.primary, '#ff758f']}
        style={styles.gradientCircle}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Asclepius
          size={64}
          color="white"
          weight="fill"
        />
      </LinearGradient>


      <View style={styles.textContainer}>
        <Text style={styles.gradientAppName}>
          MedStats<Text style={styles.gradientProText}>Pro</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 24,
  },
  gradientContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
  },
  logoContainer: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradientCircle: {
    width: 86,
    height: 86,
    borderRadius: 43,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    marginTop: 8,
  },
  appName: {
    fontFamily: 'Roboto-Bold',
    fontSize: 28,
    color: '#1a1a1a',
    letterSpacing: 0.8,
  },
  gradientAppName: {
    fontFamily: 'Roboto-Bold',
    fontSize: 32,
    color: '#1a1a1a',
    letterSpacing: 1,
    textAlign: 'center',
  },
  proText: {
    color: theme.colors.primary,
    fontWeight: '800',
    fontSize: 28,
  },
  gradientProText: {
    color: theme.colors.primary,
    fontWeight: '900',
    fontSize: 32,
  },
});