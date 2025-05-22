import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useAuth } from '../../contexts/authContext';
import { OverviewTab } from '../../components/screens/home/overviewSection';
import { ThemesTab } from '../../components/screens/home/themeSection';
import { getOverviewStats, getThemeStats } from '../../service/studyService';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../styles/theme';
import { useToast } from '../../contexts/toastContext';
import { styles } from './styles';

export default function MainScreen() {
  const { authState, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'themes'>('overview');
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [themeSortOption, setThemeSortOption] = useState<'A_Z' | 'Z_A' | 'TEMA_MAIS_DOMINADO' | 'TEMA_MENOS_DOMINADO' | 'TEMA_MAIS_RESPONDIDO' | 'TEMA_MENOS_RESPONDIDO'>('TEMA_MAIS_RESPONDIDO');

  const [themeData, setThemeData] = useState<{ name: string; totalAnswered: number; correctAnswers: number }[]>([]);

  const { showToast } = useToast();

  useEffect(() => {
    const fetchStats = async () => {
      if (!authState?.user?.id) return;
      try {
        setLoading(true);
        const statsData = await getOverviewStats(authState.user.id);
        setStats(statsData);
      } catch (err) {

      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [authState?.user?.id]);


  useEffect(() => {
    if (!authState?.user?.id || activeTab !== 'themes') return;

    const fetchThemeStats = async () => {
      try {
        setLoading(true);
        const response = await getThemeStats(8, themeSortOption);

        const formatted = response.listaEstatisticasTemas.map((item: any) => ({
          name: decodeURIComponent(item.tema.nome.replace(/\+/g, ' ')),
          totalAnswered: item.qtdRespondidas,
          correctAnswers: item.qtdAcertos,
        }));
        setThemeData(formatted);
      } catch (err) {
        showToast('Erro ao buscar os themas, tente novamente mais tarde.', 'error')
        setThemeData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchThemeStats();
  }, [authState?.user?.id, themeSortOption, activeTab]);

  const handleThemePress = (themeName: string) => {
    console.log('Tema selecionado:', themeName);
  };

  const handleLogout = async () => {
    try {
      await logout();

    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      showToast('Erro sair do aplicativo, tente novamente mais tarde.', 'error')
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.header}>Minhas estatísticas</Text>

      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'overview' && styles.activeTab]}
          onPress={() => setActiveTab('overview')}
        >
          <Text style={[styles.tabText, activeTab === 'overview' && styles.activeTabText]}>
            Visão geral
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'themes' && styles.activeTab]}
          onPress={() => setActiveTab('themes')}
        >
          <Text style={[styles.tabText, activeTab === 'themes' && styles.activeTabText]}>
            Por tema
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'overview' ? (
        loading ? (
          <ActivityIndicator size="large" color={theme.colors.primary} />
        ) : stats ? (
          <OverviewTab stats={stats} />
        ) : (
          <Text>Erro ao carregar dados</Text>
        )
      ) : loading ? (
        <ActivityIndicator size="large" color={theme.colors.primary} />
      ) : (
        <ThemesTab
          themes={themeData}
          onPressTheme={handleThemePress}
          sortOption={themeSortOption}
          onSortChange={setThemeSortOption}
        />
      )}
    </View>
  );
}


