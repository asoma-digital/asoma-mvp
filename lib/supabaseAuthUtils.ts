// utils/supabaseAuth.ts
import { supabase } from '@/lib/supabase';

/**
 * Sign up a new user
 */
export async function signUpWithEmail(email: string, password: string, fullName: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: fullName,
      },
    },
  });

  if (error) throw error;
  return data; // contains user and session
}

/**
 * Log in existing user
 */
export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
}

/**
 * Sign out user
 */
export async function signOutUser() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

/**
 * Get current user session
 */
export async function getUserSession() {
  const { data, error } = await supabase.auth.getSession();
  return { data, error };
}

/**
 * Get current user (if already logged in)
 */
// utils/supabaseAuth.ts
export async function getCurrentUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) throw error;
  return user;
}

/**
 * Update user email or password
 */
export async function updateUserProfile(updates: {
  email?: string;
  password?: string;
}) {
  const { data, error } = await supabase.auth.updateUser(updates);
  return { data, error };
}

/**
 * Send password reset email
 */
export async function resetPassword(email: string) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email);
  return { data, error };
}