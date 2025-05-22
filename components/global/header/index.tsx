import React from 'react';
import { View, TouchableOpacity, StyleSheet, StatusBar, Text, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SignOut, List, ArrowLeft } from 'phosphor-react-native';
import { Asclepius } from 'phosphor-react-native';
import { theme } from '../../../styles/theme';

export const Header = ({
  title,
  onLogout,
  showBack = false,
  showMenu = false
}: {
  title?: string;
  onLogout?: () => void;
  showBack?: boolean;
  showMenu?: boolean;
}) => {
  const navigation = useNavigation();

  return (
    <>
      <SafeAreaView style={{ flex: 0, backgroundColor: theme.colors.primary }}>
        <StatusBar backgroundColor={theme.colors.primary} barStyle="light-content" />
        <View style={styles.container}>
          {/* Lado Esquerdo - Ícone de menu ou voltar */}
          <View style={styles.leftSection}>
            {showBack ? (
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
                <ArrowLeft size={22} color="#fff" />
              </TouchableOpacity>
            ) : showMenu ? (
              <TouchableOpacity style={styles.iconButton}>
                <List size={22} color="#fff" />
              </TouchableOpacity>
            ) : null}
          </View>

          {/* Centro - Logo (sempre centralizado) */}
          <View style={styles.logoContainer}>
            <Asclepius size={28} color="#fff" weight="fill" />
            {title && <Text style={styles.appName}>MedStats<Text style={styles.proText}>Pro</Text></Text>}
          </View>

          {/* Lado Direito - Botão Sair (ou espaço vazio para manter balanceado) */}
          <View style={styles.rightSection}>
            {onLogout ? (
              <TouchableOpacity onPress={onLogout} style={styles.logoutButton}>
                <SignOut size={20} color="#fff" weight="fill" />
              </TouchableOpacity>
            ) : (
              <View style={styles.emptySpace} />
            )}
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 56,
    paddingHorizontal: 16,
    backgroundColor: theme.colors.primary, 
  },
  leftSection: {
    width: 40,
    alignItems: 'flex-start',
  },
  rightSection: {
    width: 40,
    alignItems: 'flex-end',
  },
  emptySpace: {
    width: 40,
  },
  logoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  appName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  proText: {
    color: '#fff',
    fontWeight: '800',
  },
  iconButton: {
    padding: 4,
  },
  logoutButton: {
    padding: 6,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});