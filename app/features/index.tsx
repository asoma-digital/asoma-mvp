import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function FeaturesScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explore Features</Text>

      <Pressable style={styles.card} onPress={() => router.push('/features/pomodoro')}>
        <Text style={styles.cardTitle}>Pomodoro Timer</Text>
        <Text style={styles.cardDescription}>Boost focus with timed work sessions.</Text>
      </Pressable>

      <Pressable style={styles.card} onPress={() => router.push('/features/todo')}>
        <Text style={styles.cardTitle}>To-Do List</Text>
        <Text style={styles.cardDescription}>Organize your tasks efficiently.</Text>
      </Pressable>

      <Pressable style={styles.card} onPress={() => router.push('/features/topThreeTasks')}>
        <Text style={styles.cardTitle}>Top 3 Tasks</Text>
        <Text style={styles.cardDescription}>Highlight your top priorities today.</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 24,
    color: 'white',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#1e1e1e',
    padding: 20,
    marginBottom: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    marginBottom: 6,
  },
  cardDescription: {
    color: '#bbb',
    fontSize: 14,
  },
});