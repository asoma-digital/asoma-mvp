import { View, Text, ScrollView, ActivityIndicator, Pressable } from 'react-native';
import DashboardCard from '@/app-components/drawer/dashboard/DashboardCard';
import { getCurrentUser } from '@/lib/supabaseAuthUtils';
import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import { Link } from 'expo-router';


import styles from '../../styles/pages/DashboardStyles';
import { Timer, ClipboardCheck } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import StatDot from '@/app-components/drawer/dashboard/StatDot';
import Divider from '@/app-components/drawer/dashboard/Divider';

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
      <div style={styles.topTwo}>
        <DashboardCard
          color1='#04BDE7'
          color2='#0486BE'
          icon={<Timer size={24} color="black" />}
          title="Pomodoro Timer"
          description="Stay focused with timed work sessions and breaks"
          link="/features/pomodoro"
          buttonText='Start Session'
        />

        <DashboardCard
          color1='#6AEAFB'
          color2='#04BDE7'
          icon={<ClipboardCheck size={24} color="black" />}
          title="To-Do List"
          description="Organize your priorities and track progress on important tasks"
          link="/features/todo"
          buttonText='View Tasks'
        />
      </div>

      <View style={styles.card}>
        <div style={styles.cardHeader}>
          <div style={styles.cardText}>
            <Text style={styles.cardTitle}>Today's Focus</Text>
            <Text style={styles.cardSubtitle}>Your top priorities for maximum productivity</Text>
          </div>
          <div style={styles.cardStatsBar}>
            <div style={styles.dots}>
              <StatDot color="10B981" tasks="0"/>
              <StatDot color="FF8A65" tasks="3"/>
              <StatDot color="6B7280" tasks="3"/>
            </div>
            <LinearGradient
              colors={['#04BDE7', '#0486BE']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.button}
            >
              <Link href="/features/todo">
                <Pressable>
                  <Text style={styles.buttonText}>Add Task</Text>
                </Pressable>
              </Link>
            </LinearGradient>
          </div>
        </div>

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
        <Divider/>

      </View>
    </ScrollView>
  );
}