import { useEffect, useState } from 'react';
import '../../app-components/features/todo/TodoPage.css';
import {
  addTodo,
  deleteTodo,
  getTodos,
  toggleTodo,
  toggleTopTask,
  markAsTopTask,
} from '../../app-components/features/todo/todoService';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'expo-router';

// Define Todo type
type Todo = {
  id: string;
  task: string;
  completed: boolean;
  isTopTask?: boolean;
};

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  // Fetch current user on load
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) console.error('Error fetching user:', error);
      setUserId(user?.id || null);
    };
    fetchUser();
  }, []);

  // Fetch todos from DB
  const fetchTodos = async () => {
    if (!userId) return;
    try {
      const userTodos = await getTodos(userId);
      setTodos(userTodos);
    } catch (err) {
      console.error('Error fetching todos:', err);
    }
  };

  // Refetch when userId is ready
  useEffect(() => {
    if (userId) fetchTodos();
  }, [userId]);

  // Add a new task
  const handleAddTodo = async () => {
    if (!newTodo.trim() || !userId) return;
    try {
      await addTodo(newTodo.trim(), userId);
      setNewTodo('');
      fetchTodos();
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  // Toggle completed
  const handleToggle = async (id: string, completed: boolean) => {
    try {
      await toggleTodo(id, !completed);
      fetchTodos();
    } catch (error) {
      console.error('Error toggling completed:', error);
    }
  };

  // Delete task
  const handleDelete = async (id: string) => {
    try {
      await deleteTodo(id);
      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  // Mark/unmark top task
  const handleToggleTopTask = async (todo: Todo) => {
    if (!userId) return;
    try {
      if (!todo.isTopTask) {
        await markAsTopTask(todo.id, userId);
      } else {
        await toggleTopTask(todo.id, false);
      }
      fetchTodos();
    } catch (error) {
      alert("Could not update top task. Please try again.");
      console.error("Error toggling top task:", error);
    }
  };
return (
    <div className="todo-page-container">
      <button className="back-button" onClick={() => router.push('/dashboard')}>
        ← Back to Dashboard
      </button>

      <h1 className="todo-title">Your To-Do List</h1>

      <div className="todo-input-row">
        <input
          type="text"
          placeholder="What do you need to do?"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="todo-input"
        />
        <button onClick={handleAddTodo} className="todo-add-button">
          Add
        </button>
      </div>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <span onClick={() => handleToggle(todo.id, todo.completed)}>{todo.task}</span>
            <button onClick={() => handleToggleTopTask(todo)} className="star-button">
              {todo.isTopTask ? '⭐' : '☆'}
            </button>
            <button onClick={() => handleDelete(todo.id)} className="delete-button">
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );

}