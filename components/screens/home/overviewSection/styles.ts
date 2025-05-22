import { StyleSheet } from 'react-native';
import { theme } from '../../../../styles/theme';

export const overviewStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: 16,
  },
  statsContainer: {
    backgroundColor: theme.colors.background,
    borderRadius: 8,
    padding: 16,
    marginTop: 20,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  statLabel: {
    fontSize: 16,
    color: theme.colors.primary,

    flexShrink: 1,
  },
  statValue: {
    fontSize: 16,
    color: theme.colors.primaryLight,
    flexShrink: 1,
    textAlign: 'right',
    maxWidth: '50%',
  },
});