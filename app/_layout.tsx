import { PomodoroSettingsProvider } from '../app-components/features/pomodoro/context/PomodoroSettingsContext';
import { PomodoroProvider } from '../app-components/features/pomodoro/context/PomodoroContext';
import '../styles/global.css';

import { Slot } from 'expo-router';
import { View } from 'react-native';



export default function RootLayout() {
  return (
    
      <PomodoroSettingsProvider>
        <PomodoroProvider>
          <View style={{ flex: 1 }}>
            <Slot />
          </View>
        </PomodoroProvider>
      </PomodoroSettingsProvider>
  );
}