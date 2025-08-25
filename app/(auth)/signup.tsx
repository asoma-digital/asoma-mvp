import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useRouter } from 'expo-router';
import { signUpWithEmail } from '@/lib/supabaseAuthUtils';
import { showAlert } from '../../utils/showAlert';

export default function SignUpScreen() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!fullName.trim() || !email.trim() || !password.trim()) {
      showAlert('Missing Fields', 'Please fill out all required fields.');
      return;
    }
  setLoading(true);
  try {
    const { user, session } = await signUpWithEmail(email, password, fullName);

    console.log('Sign up response:', { user, session });

    if (user || session) {
      Alert.alert('Success', 'Please check your email to confirm your account.');
      router.replace('/(drawer)/dashboard');
    } else {
      showAlert('Account Created', 'Check your email to confirm your account.');
    }

  } catch (error: any) {
    console.error('Sign up error:', error.message);
    showAlert('Sign Up Error', error.message || 'Something went wrong');
  } finally {
    setLoading(false);
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        placeholderTextColor="#aaa"
        value={fullName}
        onChangeText={setFullName}
      />
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

      <TouchableOpacity
  style={[styles.button, loading && { opacity: 0.6 }]}
  onPress={handleSignUp}
  disabled={loading}
>
  <Text style={styles.buttonText}>
    {loading ? 'Signing up...' : 'Sign Up'}
  </Text>
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
    backgroundColor: '#123dd8',
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
});