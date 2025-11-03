import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { storage } from '../utils/storage';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = await storage.getToken();
      if (token) {
        router.replace('/(tabs)/dashboard');
      } else {
        router.replace('/login');
      }
    } catch (error) {
      router.replace('/login');
    }
  };

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#009639" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a'
  }
});
