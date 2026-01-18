import { supabase } from './supabase'
import { User, UserUpdate } from '../types'
import type { AuthError, Session, User as SupabaseUser } from '@supabase/supabase-js'

export interface SignUpData {
  email: string
  password: string
  name?: string
}

export interface SignInData {
  email: string
  password: string
}

export interface AuthResponse {
  user: SupabaseUser | null
  session: Session | null
  error: AuthError | null
}

// ============================================
// 🔐 AUTENTICAÇÃO
// ============================================

/**
 * Registra um novo usuário
 */
export async function signUp(data: SignUpData): Promise<AuthResponse> {
  try {
    const { data: authData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          name: data.name || data.email.split('@')[0],
        },
      },
    })

    return {
      user: authData.user,
      session: authData.session,
      error,
    }
  } catch (error) {
    return {
      user: null,
      session: null,
      error: error as AuthError,
    }
  }
}

/**
 * Faz login do usuário
 */
export async function signIn(data: SignInData): Promise<AuthResponse> {
  try {
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    })

    return {
      user: authData.user,
      session: authData.session,
      error,
    }
  } catch (error) {
    return {
      user: null,
      session: null,
      error: error as AuthError,
    }
  }
}

/**
 * Faz logout do usuário
 */
export async function signOut(): Promise<{ error: AuthError | null }> {
  try {
    const { error } = await supabase.auth.signOut()
    return { error }
  } catch (error) {
    return { error: error as AuthError }
  }
}

/**
 * Obtém a sessão atual
 */
export async function getSession(): Promise<Session | null> {
  try {
    const { data: { session } } = await supabase.auth.getSession()
    return session
  } catch (error) {
    console.error('Error getting session:', error)
    return null
  }
}

/**
 * Obtém o usuário atual
 */
export async function getCurrentUser(): Promise<SupabaseUser | null> {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    return user
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}

/**
 * Atualiza a senha do usuário
 */
export async function updatePassword(newPassword: string): Promise<{ error: AuthError | null }> {
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    })
    return { error }
  } catch (error) {
    return { error: error as AuthError }
  }
}

/**
 * Envia email de recuperação de senha
 */
export async function resetPassword(email: string): Promise<{ error: AuthError | null }> {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    return { error }
  } catch (error) {
    return { error: error as AuthError }
  }
}

// ============================================
// 👤 PERFIL DO USUÁRIO
// ============================================

/**
 * Obtém o perfil do usuário da tabela users
 */
export async function getUserProfile(userId: string): Promise<{ data: User | null; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) {
      return { data: null, error: new Error(error.message) }
    }

    return { data, error: null }
  } catch (error) {
    return { data: null, error: error as Error }
  }
}

/**
 * Atualiza o perfil do usuário
 */
export async function updateUserProfile(userId: string, updates: UserUpdate): Promise<{ data: User | null; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()

    if (error) {
      return { data: null, error: new Error(error.message) }
    }

    return { data, error: null }
  } catch (error) {
    return { data: null, error: error as Error }
  }
}

/**
 * Listener para mudanças na autenticação
 */
export function onAuthStateChange(callback: (session: Session | null) => void) {
  return supabase.auth.onAuthStateChange((_event, session) => {
    callback(session)
  })
}
