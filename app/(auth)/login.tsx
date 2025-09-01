import { StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { Text, View } from '@/components/Themed';

import { useRouter } from 'expo-router';
import { useState } from 'react';
import { showAlert } from '../../utils/showAlert';
import { signInWithEmail } from '../../lib/supabaseAuthUtils';

export default function LoginScreen() {
  const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

const handleLogin = async () => {
  if (!email.trim() || !password.trim()) {
    showAlert('Missing Fields', 'Please fill out all required fields.');
    return;
  }

  setLoading(true);
  try {
    const { data, error } = await signInWithEmail(email, password);

    console.log('Sign in response:', { data, error });

    if (error) {
      showAlert('Login Error', error.message);
    } else if (data?.user) {
      router.replace('/(drawer)/dashboard');
    } else {
      showAlert('Login Failed', 'Please check your credentials.');
    }
  } catch (err: any) {
    showAlert('Unexpected Error', err.message || 'Something went wrong');
  } finally {
    setLoading(false);
  }
};

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/clarifi.jpg')} style={styles.logo} />

      <Text style={styles.title}>Welcome Back</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        placeholderTextColor="#aaa"
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={[styles.button, loading && { opacity: 0.6 }]} onPress={handleLogin} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Logging in...' : 'Log In'}</Text>
      </TouchableOpacity>

      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 32,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: 'white',
    color: '#333',
  },
  button: {
    backgroundColor: '#1275ea', // Swap in your brand secondary or preferred login color
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '100%',
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginBottom: 32,
    resizeMode: 'contain',
  },
});