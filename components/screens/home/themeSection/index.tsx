import React, { JSX, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { Heart, Stethoscope } from 'phosphor-react-native';
import { theme } from '../../../../styles/theme';

interface ThemeStats {
    name: string;
    totalAnswered: number;
    correctAnswers: number;
}

interface ThemesTabProps {
    themes: ThemeStats[];
    onPressTheme?: (theme: string) => void;
}

const iconMap: Record<string, JSX.Element> = {
    'Cirurgia / Gastroenterologia': <Heart size={24} color="#1f2937" />,
    'Endocrinologia': <Heart size={24} color="#1f2937" />,
    'Hemodinâmica / Cardiologia': <Heart size={24} color="#1f2937" />,
    'Hematologia': <Heart size={24} color="#1f2937" />,
};

const ORDER_OPTIONS = [
    { label: 'A → Z', value: 'A_Z' },
    { label: 'Z → A', value: 'Z_A' },
    { label: 'Tema mais dominado', value: 'TEMA_MAIS_DOMINADO' },
    { label: 'Tema menos dominado', value: 'TEMA_MENOS_DOMINADO' },
    { label: 'Tema mais respondido', value: 'TEMA_MAIS_RESPONDIDO' },
    { label: 'Tema menos respondido', value: 'TEMA_MENOS_RESPONDIDO' },
] as const;

type SortOption = typeof ORDER_OPTIONS[number]['value'];

export function ThemesTab({ themes, onPressTheme }: ThemesTabProps) {
    const [sortOption, setSortOption] = useState<SortOption>('TEMA_MAIS_RESPONDIDO');
    const [showDropdown, setShowDropdown] = useState(false);

    const getSortLabel = (value: SortOption) => {
        const found = ORDER_OPTIONS.find(opt => opt.value === value);
        return found?.label ?? '';
    };

    const sortedThemes = [...themes].sort((a, b) => {
        const accuracyA = a.totalAnswered ? a.correctAnswers / a.totalAnswered : 0;
        const accuracyB = b.totalAnswered ? b.correctAnswers / b.totalAnswered : 0;

        switch (sortOption) {
            case 'A_Z':
                return a.name.localeCompare(b.name);
            case 'Z_A':
                return b.name.localeCompare(a.name);
            case 'TEMA_MAIS_DOMINADO':
                return accuracyB - accuracyA;
            case 'TEMA_MENOS_DOMINADO':
                return accuracyA - accuracyB;
            case 'TEMA_MAIS_RESPONDIDO':
                return b.totalAnswered - a.totalAnswered;
            case 'TEMA_MENOS_RESPONDIDO':
                return a.totalAnswered - b.totalAnswered;
            default:
                return 0;
        }
    });

    return (
        <View style={styles.container}>
            <View style={{ marginBottom: 16 }}>
                <TouchableOpacity
                    style={styles.sortButton}
                    onPress={() => setShowDropdown(prev => !prev)}
                >
                    <Text style={styles.sortButtonText}>
                        Ordenar por: {getSortLabel(sortOption)} ⌄
                    </Text>
                </TouchableOpacity>

                {showDropdown && (
                    <View style={styles.dropdown}>
                        {ORDER_OPTIONS.map(option => (
                            <TouchableOpacity
                                key={option.value}
                                onPress={() => {
                                    setSortOption(option.value);
                                    setShowDropdown(false);
                                }}
                            >
                                <Text style={styles.dropdownItem}>{option.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </View>

            <FlatList
                data={sortedThemes}
                keyExtractor={(item, index) => `${item.name}-${index}`}
                contentContainerStyle={{ paddingBottom: 40 }}
                renderItem={({ item }) => {
                    const progressCorrect =
                        item.totalAnswered > 0 ? item.correctAnswers / item.totalAnswered : 0;
                    const progressAnswered = item.totalAnswered > 0 ? 1 : 0;

                    return (
                        <TouchableOpacity
                            style={styles.card}
                            onPress={() => onPressTheme?.(item.name)}
                        >
                            <View style={styles.cardHeader}>
                                {iconMap[item.name] ?? <Stethoscope size={24} color={theme.colors.primary} />}
                                <Text style={styles.cardTitle}>{item.name}</Text>
                            </View>

                            <Text style={styles.cardText}>
                                {item.totalAnswered} total de questões respondidas
                            </Text>
                            <ProgressBar progress={progressAnswered} color={theme.colors.primary} style={styles.progress} />

                            <Text style={styles.cardText}>
                                {item.correctAnswers} respostas corretas
                            </Text>
                            <ProgressBar progress={progressCorrect} color="#10b981" style={styles.progress} />
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 16,
    },
    sortButton: {
        borderWidth: 1,
        borderColor: '#e5e7eb',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        alignSelf: 'flex-start',
    },
    sortButtonText: {
        fontSize: 14,
        color: '#1f2937',
    },
    dropdown: {
        marginTop: 8,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        borderRadius: 8,
        backgroundColor: '#fff',
        elevation: 2,
        paddingVertical: 8,
    },
    dropdownItem: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        fontSize: 14,
        color: '#1f2937',
    },
    card: {
        borderWidth: 1,
        borderColor: '#e5e7eb',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        backgroundColor: '#fff',
        elevation: 1,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 8,
        color: '#1f2937',
    },
    cardText: {
        fontSize: 12,
        color: '#6b7280',
        marginTop: 8,
    },
    progress: {
        height: 6,
        borderRadius: 4,
        marginTop: 4,
    },
});
