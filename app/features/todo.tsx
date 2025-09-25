import { useEffect, useState } from 'react';
import '../../app-components/features/todo/TodoPage.css';
import {
  addTodo,
  deleteTodo,
  getTodos,
  toggleTodo,
  toggleTopTask,
  markAsTopTask,
  updateTodoDates,
  getSubtasks,      // <-- Add
  addSubtask,       // <-- Add
  toggleSubtask,    // <-- Add
  deleteSubtask,    // <-- Add
} from '../../app-components/features/todo/todoService';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'expo-router';

// Define Todo type
type Todo = {
  id: string;
  task: string;
  completed: boolean;
  isTopTask: boolean;
  userId: string;
  created_at: string;
  start_date?: string;
  due_date?: string;
  notes?: string; // <-- Add notes field
};

type Subtask = {
  sid: string;
  todo_id: string;
  userId: string;
  subtask: string;
  completed: boolean;
};

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [userId, setUserId] = useState<string | null>(null);
  const [showDateModal, setShowDateModal] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [startDate, setStartDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [notes, setNotes] = useState(''); // <-- Add state for notes
  const [subtasks, setSubtasks] = useState<Subtask[]>([]);
  const [newSubtask, setNewSubtask] = useState('');
  const [allSubtasks, setAllSubtasks] = useState<{ [todoId: string]: Subtask[] }>({});
  const [showSubtasks, setShowSubtasks] = useState<{ [todoId: string]: boolean }>({});
  const router = useRouter();

  // Helper to get today's date in yyyy-mm-dd
  const getToday = () => {
    const d = new Date();
    return d.toISOString().slice(0, 10);
  };

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

  // Fetch all subtasks for all todos
  const fetchAllSubtasks = async (todos: Todo[]) => {
    const subtasksMap: { [todoId: string]: Subtask[] } = {};
    await Promise.all(
      todos.map(async (todo) => {
        try {
          const subs = await getSubtasks(todo.id);
          subtasksMap[todo.id] = subs;
        } catch (err) {
          subtasksMap[todo.id] = [];
        }
      })
    );
    setAllSubtasks(subtasksMap);
  };

  // Fetch todos from DB and sort by due date then alphabetical
  const fetchTodos = async () => {
    if (!userId) return;
    try {
      const userTodos = await getTodos(userId);
      // Sort: dueDate (nulls last), then alphabetical by task
      userTodos.sort((a, b) => {
        if (a.due_date && b.due_date) {
          if (a.due_date < b.due_date) return -1;
          if (a.due_date > b.due_date) return 1;
        } else if (a.due_date && !b.due_date) {
          return -1;
        } else if (!a.due_date && b.due_date) {
          return 1;
        }
        return a.task.localeCompare(b.task);
      });
      setTodos(userTodos);
      await fetchAllSubtasks(userTodos);
    } catch (err) {
      console.error('Error fetching todos:', err);
    }
  };

  // Refetch when userId is ready
  useEffect(() => {
    if (userId) fetchTodos();
  }, [userId]);

  // Add a new task (no date modal)
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

  // Open date modal for editing a todo
  const handleEditDates = (todo: Todo) => {
    setEditingTodo(todo);
    setStartDate(todo.start_date|| getToday());
    setDueDate(todo.due_date || '');
    setNotes(todo.notes || ''); // <-- Set notes
    setShowDateModal(true);
  };

  // Confirm date edit for a todo
  const handleConfirmEditDates = async () => {
    if (!editingTodo) return;
    try {
      await updateTodoDates(editingTodo.id, startDate, dueDate, notes); // <-- Pass notes
      setShowDateModal(false);
      setEditingTodo(null);
      // Do not reset startDate/dueDate/notes so values persist for next edit
      fetchTodos();
    } catch (error) {
      console.error('Error updating todo dates:', error);
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

  // Fetch subtasks for the editing todo
  useEffect(() => {
    if (editingTodo) {
      fetchSubtasks(editingTodo.id);
    } else {
      setSubtasks([]);
    }
  }, [editingTodo]);

  const fetchSubtasks = async (todoId: string) => {
    try {
      const data = await getSubtasks(todoId);
      setSubtasks(data);
    } catch (err) {
      console.error('Error fetching subtasks:', err);
    }
  };

  const handleAddSubtask = async () => {
    if (!editingTodo || !newSubtask.trim() || !userId) return;
    try {
      await addSubtask(editingTodo.id, userId, newSubtask.trim());
      setNewSubtask('');
      fetchSubtasks(editingTodo.id);
    } catch (err) {
      console.error('Error adding subtask:', err);
    }
  };

  const handleToggleSubtask = async (sid: string, completed: boolean) => {
    try {
      await toggleSubtask(sid, !completed);
      if (editingTodo) fetchSubtasks(editingTodo.id);
    } catch (err) {
      console.error('Error toggling subtask:', err);
    }
  };

  const handleDeleteSubtask = async (sid: string) => {
    try {
      await deleteSubtask(sid);
      if (editingTodo) fetchSubtasks(editingTodo.id);
    } catch (err) {
      console.error('Error deleting subtask:', err);
    }
  };

  // Subtask handlers for main list
  const handleToggleSubtaskMain = async (sid: string, completed: boolean, todoId: string) => {
    try {
      await toggleSubtask(sid, !completed);
      fetchAllSubtasks(todos);
    } catch (err) {
      console.error('Error toggling subtask:', err);
    }
  };

  const handleDeleteSubtaskMain = async (sid: string, todoId: string) => {
    try {
      await deleteSubtask(sid);
      fetchAllSubtasks(todos);
    } catch (err) {
      console.error('Error deleting subtask:', err);
    }
  };

  // Toggle subtasks visibility for a todo
  const handleToggleShowSubtasks = (todoId: string) => {
    setShowSubtasks((prev) => ({
      ...prev,
      [todoId]: !prev[todoId],
    }));
  };

  // Helper to get time remaining string
  function getTimeRemaining(dueDateStr?: string) {
    if (!dueDateStr) return '';
    const due = new Date(dueDateStr);
    const now = new Date();
    const diffMs = due.getTime() - now.getTime();
    if (isNaN(diffMs)) return '';
    if (diffMs < 0) return 'Past due';

    const totalSeconds = Math.floor(diffMs / 1000);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    let parts = [];
    if (days > 0) parts.push(`${days} day${days !== 1 ? 's' : ''}`);
    if (hours > 0) parts.push(`${hours} hour${hours !== 1 ? 's' : ''}`);
    if (minutes > 0) parts.push(`${minutes} minute${minutes !== 1 ? 's' : ''}`);
    if (seconds > 0 && days === 0 && hours === 0) parts.push(`${seconds} second${seconds !== 1 ? 's' : ''}`);
    return parts.length ? parts.join(', ') : 'Less than a second';
  }

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
          <div key={todo.id}>
            <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
              <span
                onClick={() => handleEditDates(todo)}
                style={{ cursor: 'pointer', textDecoration: 'underline' }}
                title="Click to set dates"
              >
                {todo.task}
              </span>
              {/* Show notes if present */}
              {todo.notes && todo.notes.trim() !== '' && (
                <span
                  style={{
                    marginLeft: 12,
                    color: '#bdbdbd',
                    fontStyle: 'italic',
                    fontSize: 14,
                    maxWidth: 180,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    display: 'inline-block',
                    textAlign: 'left', // <-- Left align notes
                  }}
                  title={todo.notes}
                >
                  {todo.notes}
                </span>
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                {/* Toggle subtasks button */}
                {allSubtasks[todo.id] && allSubtasks[todo.id].length > 0 && (
                  <button
                    onClick={() => handleToggleShowSubtasks(todo.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#a991ff',
                      fontSize: 16,
                      cursor: 'pointer',
                      marginRight: 4,
                      textDecoration: 'underline',
                    }}
                  >
                    {showSubtasks[todo.id] ? 'Hide Subtasks' : 'Show Subtasks'}
                  </button>
                )}
                {/* Time remaining on right */}
                {todo.due_date && (
                  <span className="todo-due-date" style={{ marginRight: 16, color: '#a991ff', fontWeight: 500 }}>
                    Time remaining: {getTimeRemaining(todo.due_date)}
                  </span>
                )}
                <button onClick={() => handleToggleTopTask(todo)} className="star-button">
                  {todo.isTopTask ? '⭐' : '☆'}
                </button>
                <button onClick={() => handleDelete(todo.id)} className="delete-button">
                  ✕
                </button>
              </div>
            </li>
            {/* Subtasks for this todo */}
            {allSubtasks[todo.id] && allSubtasks[todo.id].length > 0 && showSubtasks[todo.id] && (
              <ul className="subtask-list">
                {allSubtasks[todo.id].map((sub, idx) => (
                  <li
                    key={sub.sid}
                    className={`subtask-item${sub.completed ? ' completed' : ''}`}
                    style={{
                      background: '#232323',
                      borderRadius: 8,
                      padding: '8px 14px',
                      marginBottom: idx === allSubtasks[todo.id].length - 1 ? 16 : 6, // Extra bottom padding for last subtask
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={sub.completed}
                      onChange={() => handleToggleSubtaskMain(sub.sid, sub.completed, todo.id)}
                    />
                    <span>{sub.subtask}</span>
                    <button
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#ff6b6b',
                        fontSize: 16,
                        cursor: 'pointer',
                        marginLeft: 4,
                      }}
                      onClick={() => handleDeleteSubtaskMain(sub.sid, todo.id)}
                      title="Delete subtask"
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </ul>

      {/* Date Modal for editing */}
      {showDateModal && editingTodo && (
        <div className="modal-overlay">
          <div className="modal-content small-modal">
            <h3>Set Task Dates</h3>
            <label>
              Start Date:
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </label>
            <label>
              Due Date:
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </label>
            {/* Notes input */}
            <label>
              Notes:
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                style={{
                  minHeight: 60,
                  borderRadius: 6,
                  border: '1px solid #333',
                  background: '#1e1e1e',
                  color: '#fff',
                  padding: 8,
                  fontSize: 15,
                  resize: 'vertical',
                  marginBottom: 8,
                }}
                placeholder="Add personal notes for this task..."
              />
            </label>
            {/* Subtasks UI */}
            <div style={{ marginTop: 12 }}>
              <label style={{ fontWeight: 500, marginBottom: 4 }}>Subtasks:</label>
              <ul style={{ listStyle: 'none', paddingLeft: 0, marginBottom: 8 }}>
                {subtasks.map((sub) => (
                  <li
                    key={sub.sid}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      marginBottom: 4,
                      opacity: sub.completed ? 0.6 : 1,
                      textDecoration: sub.completed ? 'line-through' : 'none',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={sub.completed}
                      onChange={() => handleToggleSubtask(sub.sid, sub.completed)}
                    />
                    <span>{sub.subtask}</span>
                    <button
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#ff6b6b',
                        fontSize: 16,
                        cursor: 'pointer',
                        marginLeft: 4,
                      }}
                      onClick={() => handleDeleteSubtask(sub.sid)}
                      title="Delete subtask"
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
              <div style={{ display: 'flex', gap: 8 }}>
                <input
                  type="text"
                  placeholder="Add subtask"
                  value={newSubtask}
                  onChange={(e) => setNewSubtask(e.target.value)}
                  style={{
                    flexGrow: 1,
                    padding: 7,
                    borderRadius: 6,
                    border: '1px solid #333',
                    background: '#1e1e1e',
                    color: '#fff',
                  }}
                />
                <button
                  onClick={handleAddSubtask}
                  style={{
                    padding: '7px 12px',
                    borderRadius: 6,
                    border: 'none',
                    background: '#7b61ff',
                    color: '#fff',
                    fontSize: 15,
                    cursor: 'pointer',
                  }}
                >
                  Add
                </button>
              </div>
            </div>
            <div className="modal-actions">
              <button
                onClick={() => {
                  setShowDateModal(false);
                  setEditingTodo(null);
                  // Do not reset startDate/dueDate so values persist for next edit
                }}
              >
                Cancel
              </button>
              <button onClick={handleConfirmEditDates}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

}