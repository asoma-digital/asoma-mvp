import { supabase } from '../../../lib/supabase'

// Define a consistent return type
export type Todo = {
  id: string
  task: string
  completed: boolean
  isTopTask: boolean
  userId: string
  created_at: string
  start_date?: string
  due_date?: string 
  notes?: string // <-- Add notes field
}

// Add a new todo
export const addTodo = async (task: string, userId: string): Promise<Todo[]> => {
  const { data, error } = await supabase.from('todos').insert([
    {
      task,
      completed: false,
      isTopTask: false,
      userId,
    },
  ]).select('*') // Ensures new task is returned

  if (error) throw new Error(`Failed to add todo: ${error.message}`)
  return data as Todo[]
}

// Get all todos for current user
export const getTodos = async (userId: string): Promise<Todo[]> => {
  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .eq('userId', userId)
    .order('created_at', { ascending: false })

  if (error) throw new Error(`Failed to fetch todos: ${error.message}`)
  return data as Todo[]
}

// Delete a todo by ID
export const deleteTodo = async (id: string): Promise<void> => {
  const { error } = await supabase.from('todos').delete().eq('id', id)
  if (error) throw new Error(`Failed to delete todo: ${error.message}`)
}

// Toggle completed status
export const toggleTodo = async (id: string, completed: boolean): Promise<void> => {
  const { error } = await supabase
    .from('todos')
    .update({ completed })
    .eq('id', id)

  if (error) throw new Error(`Failed to toggle todo: ${error.message}`)
}

// Mark as Top Task (only if under 3 already)
export const markAsTopTask = async (taskId: string, userId: string): Promise<void> => {
  const { data: topTasks, error: fetchError } = await supabase
    .from('todos')
    .select('id')
    .eq('userId', userId)
    .eq('isTopTask', true)

  if (fetchError) throw new Error(`Failed to fetch top tasks: ${fetchError.message}`)

  if ((topTasks?.length || 0) >= 3) {
    alert('You can only have 3 top tasks at a time.')
    return
  }

  const { error } = await supabase
    .from('todos')
    .update({ isTopTask: true })
    .eq('id', taskId)

  if (error) throw new Error(`Failed to mark as top task: ${error.message}`)
}

// Toggle isTopTask status
export const toggleTopTask = async (taskId: string, newStatus: boolean): Promise<void> => {
  const { error } = await supabase
    .from('todos')
    .update({ isTopTask: newStatus })
    .eq('id', taskId)

  if (error) throw new Error(`Failed to toggle top task: ${error.message}`)
}

// Get top 3 tasks for user
export const getTopTasks = async (userId: string): Promise<Todo[]> => {
  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .eq('userId', userId)
    .eq('isTopTask', true)
    .limit(3)

  if (error) throw new Error(`Failed to get top tasks: ${error.message}`)
  return data as Todo[]
}

// Update start and due dates for a todo (now also notes)
export const updateTodoDates = async (
  id: string,
  startDate: string,
  dueDate: string,
  notes?: string // <-- Add notes param
): Promise<void> => {
  const { error } = await supabase
    .from('todos')
    .update({
      start_date: startDate || null,
      due_date: dueDate || null,
      notes: notes ?? null, // <-- Update notes
    })
    .eq('id', id);

  if (error) throw new Error(`Failed to update todo dates: ${error.message}`);
}

// Subtask type
export type Subtask = {
  sid: string
  todo_id: string
  userId: string
  subtask: string
  completed: boolean
}

// Get all subtasks for a todo
export const getSubtasks = async (todoId: string): Promise<Subtask[]> => {
  const { data, error } = await supabase
    .from('subtasks')
    .select('*')
    .eq('todo_id', todoId)
    .order('sid', { ascending: true });
  if (error) throw new Error(`Failed to fetch subtasks: ${error.message}`);
  return data as Subtask[];
}

// Add a subtask to a todo (requires userId)
export const addSubtask = async (todoId: string, userId: string, subtask: string): Promise<void> => {
  const { error } = await supabase
    .from('subtasks')
    .insert([{ todo_id: todoId, userId, subtask, completed: false }]);
  if (error) throw new Error(`Failed to add subtask: ${error.message}`);
}

// Toggle subtask completion
export const toggleSubtask = async (sid: string, completed: boolean): Promise<void> => {
  const { error } = await supabase
    .from('subtasks')
    .update({ completed })
    .eq('sid', sid);
  if (error) throw new Error(`Failed to toggle subtask: ${error.message}`);
}

// Delete a subtask
export const deleteSubtask = async (sid: string): Promise<void> => {
  const { error } = await supabase
    .from('subtasks')
    .delete()
    .eq('sid', sid);
  if (error) throw new Error(`Failed to delete subtask: ${error.message}`);
}