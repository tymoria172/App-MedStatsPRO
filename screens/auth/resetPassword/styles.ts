import { StyleSheet } from 'react-native';
import { theme } from '../../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
  containerinfo: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 24,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 6,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  icon: {
    marginRight: 8,
    color: '#9ca3af',
  },
  input: {
    flex: 1,
    height: 48,
    color: '#1f2937',
  },
  requirementsContainer: {
    marginVertical: 24,
    padding: 16,
    backgroundColor: theme.colors.background,
    borderRadius: 8,
  },
  requirementsTitle: {
    fontWeight: 'bold',
    marginBottom: 12,
    color: theme.colors.primary,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  requirementText: {
    marginLeft: 8,
    color: '#6b7280',
  },
  requirementTextChecked: {
    color: '#3aa958',
  },
  button: {
    width: '100%',
    backgroundColor: theme.colors.primary,
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    backgroundColor: theme.colors.primaryLight,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.sucessBackground,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.background,
    marginTop: 24,
    textAlign: 'center',
  },
  successText: {
    fontSize: 16,
    color: theme.colors.background,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 16,
    lineHeight: 24,
  },
});