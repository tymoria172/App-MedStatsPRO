import { StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  logoutButton: {
    padding: 8,
    borderRadius: 4,
    backgroundColor: '#fef2f2',
  },
  logoutText: {
    color: '#dc2626',
    fontWeight: '500',
  },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 24, color: '#1f2937' },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    marginBottom: 20,
  },
  tab: { paddingBottom: 12, marginRight: 24 },
  activeTab: { borderBottomWidth: 2, borderBottomColor: theme.colors.primary },
  tabText: { fontSize: 16, color: '#6b7280' },
  activeTabText: { fontSize: 16, fontWeight: 'bold', color: theme.colors.primary },
});