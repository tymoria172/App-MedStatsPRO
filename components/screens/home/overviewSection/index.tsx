import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../../../styles/theme';
import { overviewStyles } from './styles';

interface OverviewTabProps {
  stats: {
    totalQuestions: number;
    correctAnswers: number;
    averageAccuracy: number;
    strongestSubject: string;
    weakestSubject: string;
  };
}

export function OverviewTab({ stats }: OverviewTabProps) {
  const strongestSubjectFormatted = stats.strongestSubject.replace(/\+/g, ' ');
  const weakestSubjectFormatted = stats.weakestSubject.replace(/\+/g, ' ');

  return (
    <View style={overviewStyles.statsContainer}>
      <View style={overviewStyles.statRow}>
        <Text style={overviewStyles.statLabel}>Total de questões respondidas</Text>
        <Text style={overviewStyles.statValue}>{stats.totalQuestions}</Text>
      </View>

      <View style={overviewStyles.statRow}>
        <Text style={overviewStyles.statLabel}>Questões corretas</Text>
        <Text style={overviewStyles.statValue}>{stats.correctAnswers}</Text>
      </View>

      <View style={overviewStyles.statRow}>
        <Text style={overviewStyles.statLabel}>Média de acertos</Text>
        <Text style={overviewStyles.statValue}>{stats.averageAccuracy}%</Text>
      </View>

      <View style={overviewStyles.statRow}>
        <Text style={overviewStyles.statLabel}>Tema mais dominado</Text>
        <Text style={overviewStyles.statValue}>{strongestSubjectFormatted}</Text>
      </View>

      <View style={[overviewStyles.statRow, { borderBottomWidth: 0 }]}>
        <Text style={overviewStyles.statLabel}>Tema menos dominado</Text>
        <Text style={overviewStyles.statValue}>{weakestSubjectFormatted}</Text>
      </View>
    </View>
  );
}
