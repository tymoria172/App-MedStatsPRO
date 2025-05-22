import { createContext, useContext, useState } from 'react';
import { View, Text, Animated, StyleSheet, Dimensions } from 'react-native';
import { WarningCircle, CheckCircle } from 'phosphor-react-native';

interface ToastContextType {
  showToast: (message: string, type?: 'success' | 'error') => void;
}

const ToastContext = createContext<ToastContextType>({ showToast: () => { } });

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [opacity] = useState(new Animated.Value(0));

  const showToast = (message: string, type: 'success' | 'error' = 'error') => {
    setToast({ message, type });

    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => setToast(null));
    }, 3000);
  };

  const backgroundColor = toast?.type === 'success' ? '#388E3C' : '#D32F2F';
  const Icon = toast?.type === 'success' ? CheckCircle : WarningCircle;

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <Animated.View style={[styles.toast, { opacity, backgroundColor }]}>
          <Icon color="#fff" size={20} style={styles.icon} />
          <Text style={styles.toastText}>{toast.message}</Text>
        </Animated.View>
      )}
    </ToastContext.Provider>
  );
};

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    top: 100, // mantém no topo
    right: 20, // joga para o canto superior direito
    maxWidth: Dimensions.get('window').width * 0.7, // evita que vá até o meio
    backgroundColor: '#D32F2F', // cor padrão de erro
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    zIndex: 9999,
  },
  toastText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 14,
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  icon: {
    marginRight: 4,
  },
});
