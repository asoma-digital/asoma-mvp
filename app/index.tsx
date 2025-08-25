import { useEffect, useState } from 'react';
import { useRouter, useNavigationContainerRef } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';

export default function Index() {
  const router = useRouter();
  const [hasNavigated, setHasNavigated] = useState(false);

  useEffect(() => {
    // Avoid trying to navigate more than once
    if (!hasNavigated) {
      setHasNavigated(true);
      // Delay navigation to avoid layout mount issue
      setTimeout(() => {
        router.replace('/(auth)/login');
      }, 0); // Can increase to 100ms if still buggy
    }
  }, [hasNavigated]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
}