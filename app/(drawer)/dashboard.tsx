import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import DashboardCard from '@/components/dashboard/DashboardCard';
import { getCurrentUser } from '@/lib/supabaseAuthUtils';
import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import { dashboardStyles as styles } from './dashboardStyles';

type Task = {
  id: string;
  task: string;
  completed: boolean;
};

export default function DashboardScreen() {
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [topTasks, setTopTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchUserAndTasks = async () => {
      try {
        const user = await getCurrentUser();
        const name = user?.user_metadata?.display_name || 'User';
        setDisplayName(name);

        if (!user) {
          console.warn('No user found');
          return;
        }

        const { data, error } = await supabase
          .from('todos')
          .select('id, task, completed')
          .eq('userId', user.id)
          .eq('isTopTask', true)
          .limit(3);

        if (error) throw error;
        setTopTasks(data as Task[]);
      } catch (err) {
        console.error('Error loading user or top tasks:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndTasks();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View>
      <Text style={styles.title}> {`Welcome back, ${displayName}!`}</Text>
      <ScrollView contentContainerStyle={styles.container}>
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
    </View>
  );
}