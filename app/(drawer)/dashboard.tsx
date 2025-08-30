import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import DashboardCard from '@/components/dashboard/DashboardCard';
import { getCurrentUser } from '@/lib/supabaseAuthUtils';
import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';

type Task = {
  id: string;
  task: string;
  completed: boolean;
};

export default function DashboardScreen() {
  const [displayName, setDisplayName] = useState<string>('User');
  const [loading, setLoading] = useState<boolean>(true);
  const [topTasks, setTopTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchUserAndTasks = async () => {
      try {
        const user = await getCurrentUser();
        if (!user) {
          console.warn('No user found');
          return;
        }

        const name = user.user_metadata?.display_name || 'User';
        setDisplayName(name);

        const { data, error } = await supabase
          .from('todos')
          .select('id, task, completed')
          .eq('userId', user.id)
          .eq('isTopTask', true)
          .limit(3);

        if (error) throw error;
        setTopTasks(data as Task[]);
      } catch (error) {
        console.error('Error loading user or top tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndTasks();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{`Welcome back, ${displayName}!`}</Text>

      <DashboardCard
        title="Start a Pomodoro Timer"
        description="Stay focused and productive with timed work sessions"
        link="/features/pomodoro"
      />

      <DashboardCard
        title="Go to Your To-Do List"
        description="Organize your day and keep track of tasks"
        link="/features/todo"
      />

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Top 3 Tasks</Text>
        {topTasks.length === 0 ? (
          <Text style={styles.taskTextEmpty}>No top tasks set yet!</Text>
        ) : (
          topTasks.map((task) => (
            <Text
              key={task.id}
              style={[
                styles.taskText,
                task.completed && styles.completedTaskText,
              ]}
            >
              {task.task}
            </Text>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 12,
    color: 'white',
  },
  card: {
    backgroundColor: '#1C1C1E',
    borderRadius: 20,
    padding: 20,
    marginVertical: 12,
    width: '90%',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: 'white',
    textAlign: 'center',
  },
  taskText: {
    backgroundColor: '#2C2C2E',
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    color: 'white',
    textAlign: 'center',
  },
  completedTaskText: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  taskTextEmpty: {
    color: '#ccc',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});