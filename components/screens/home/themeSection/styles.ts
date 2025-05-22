import { StyleSheet } from 'react-native';
import { theme } from '../../../../styles/theme';


export const componentStyles = StyleSheet.create({
    container: {
        paddingBottom: 16,
        backgroundColor: theme.colors.background,
    },
    sortButton: {
        borderWidth: 1,
        borderColor: theme.colors.border || '#e5e7eb',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        alignSelf: 'flex-start',
        backgroundColor: theme.colors.surface || '#fff',
    },
    sortButtonText: {
        fontSize: 14,
        color: theme.colors.textPrimary || '#1f2937',
    },
    dropdown: {
        marginTop: 8,
        borderWidth: 1,
        borderColor: theme.colors.border || '#e5e7eb',
        borderRadius: 8,
        backgroundColor: theme.colors.surface || '#fff',
        elevation: 2,
        paddingVertical: 8,
    },
    dropdownItem: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        fontSize: 14,
        color: theme.colors.textPrimary || '#1f2937',
    },
    card: {
        borderWidth: 1,
        borderColor: theme.colors.border || '#e5e7eb',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        backgroundColor: theme.colors.surface || '#fff',
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
        color: theme.colors.textPrimary || '#1f2937',
    },
    cardText: {
        fontSize: 12,
        color: theme.colors.textSecondary || '#6b7280',
        marginTop: 8,

    },
    progress: {
        height: 6,
        borderRadius: 4,
        marginTop: 4,
        backgroundColor: theme.colors.primaryLight, // Cor do progresso
    },
});