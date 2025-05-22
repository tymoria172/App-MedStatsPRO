import { StyleSheet } from 'react-native';
import { theme } from '../../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  subtitleWrapper: {
    marginBottom: 32,
  },
  textSubtitle: {
    fontSize: 14,
    color: '#6b7280',
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
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  codeInput: {
    width: 48,
    height: 48,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 6,
    textAlign: 'center',
    fontSize: 18,
  },
  resendButton: {
    alignSelf: 'center',
    marginTop: 16,
  },
  resendText: {
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  successContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 20,
},
successTitle: {
  fontSize: 24,
  fontWeight: 'bold',
  color: theme.colors.primary,
  marginTop: 24,
  textAlign: 'center',
},
successText: {
  fontSize: 16,
  color: theme.colors.text,
  textAlign: 'center',
  marginTop: 16,
  lineHeight: 24,
},
});