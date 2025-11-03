import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { authAPI } from '../api/client';
import { storage } from '../utils/storage';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please enter both username and password');
      return;
    }

    setLoading(true);
    try {
      const response = await authAPI.login(username, password);
      await storage.saveToken(response.token);
      await storage.saveDriver(response.driver);
      router.replace('/(tabs)/dashboard');
    } catch (error: any) {
      Alert.alert('Login Failed', error.response?.data?.error || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.logo}>🚚</Text>
          <Text style={styles.title}>Merkato Driver</Text>
          <Text style={styles.subtitle}>Last-Mile Delivery for Ethiopia</Text>
          <View style={styles.colorBar}>
            <View style={[styles.colorStripe, { backgroundColor: '#009639' }]} />
            <View style={[styles.colorStripe, { backgroundColor: '#FEDD00' }]} />
            <View style={[styles.colorStripe, { backgroundColor: '#DA121A' }]} />
          </View>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter username"
            placeholderTextColor="#666"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter password"
            placeholderTextColor="#666"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity 
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Logging in...' : 'Login'}
            </Text>
          </TouchableOpacity>

          <View style={styles.demoCredentials}>
            <Text style={styles.demoTitle}>Demo Credentials:</Text>
            <Text style={styles.demoText}>abebe / 1234</Text>
            <Text style={styles.demoText}>mekdes / 5678</Text>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a'
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 24
  },
  header: {
    alignItems: 'center',
    marginBottom: 48
  },
  logo: {
    fontSize: 64,
    marginBottom: 16
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8
  },
  subtitle: {
    fontSize: 16,
    color: '#999',
    marginBottom: 16
  },
  colorBar: {
    flexDirection: 'row',
    width: 120,
    height: 4,
    borderRadius: 2,
    overflow: 'hidden'
  },
  colorStripe: {
    flex: 1
  },
  form: {
    width: '100%'
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8
  },
  input: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#3a3a3a'
  },
  button: {
    backgroundColor: '#009639',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8
  },
  buttonDisabled: {
    opacity: 0.6
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  demoCredentials: {
    marginTop: 32,
    padding: 16,
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#FEDD00'
  },
  demoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FEDD00',
    marginBottom: 8
  },
  demoText: {
    fontSize: 14,
    color: '#999',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace'
  }
});
