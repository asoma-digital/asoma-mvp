// components/TopThreeTasks.tsx

import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase';
import './TopThreeTasks.css';

type Task = {
  id: string;
  task: string;
  completed: boolean;
};

export default function TopThreeTasks() {
  const [topTasks, setTopTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopTasks = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error('Error getting user:', userError);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('todos')
        .select('id, task, completed')
        .eq('userId', user.id)
        .eq('isTopTask', true)
        .limit(3);

      if (error) {
        console.error('Error fetching top tasks:', error);
      } else {
        setTopTasks(data as Task[]);
      }

      setLoading(false);
    };

    fetchTopTasks();
  }, []);

  if (loading) return <p className="top-tasks-loading">Loading top tasks...</p>;

  return (
    <div className="top-tasks-card">
      <h2 className="top-tasks-title">Top 3 Tasks</h2>
      <ul className="top-tasks-list">
        {topTasks.length === 0 ? (
          <li className="empty-message">No top tasks set yet!</li>
        ) : (
          topTasks.map((task) => (
            <li
              key={task.id}
              className={`top-task-item ${task.completed ? 'completed' : ''}`}
            >
              {task.task}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}