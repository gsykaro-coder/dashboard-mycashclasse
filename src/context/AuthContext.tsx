import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { Session, User as SupabaseUser } from '@supabase/supabase-js'
import * as authService from '../services/auth'
import { User } from '../types'

interface AuthContextType {
  user: SupabaseUser | null
  userProfile: User | null
  session: Session | null
  loading: boolean
  signUp: (email: string, password: string, name?: string) => Promise<{ error: Error | null }>
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>
  signOut: () => Promise<void>
  updateProfile: (updates: { name?: string; avatar_url?: string | null }) => Promise<{ error: Error | null }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [userProfile, setUserProfile] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Obter sessão inicial
    authService.getSession().then((session) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) {
        loadUserProfile(session.user.id)
      } else {
        setLoading(false)
      }
    })

    // Listener para mudanças na autenticação
    const { data: { subscription } } = authService.onAuthStateChange(async (session) => {
      setSession(session)
      setUser(session?.user ?? null)
      
      if (session?.user) {
        await loadUserProfile(session.user.id)
      } else {
        setUserProfile(null)
        setLoading(false)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const loadUserProfile = async (userId: string) => {
    try {
      const { data, error } = await authService.getUserProfile(userId)
      if (error) {
        console.error('Error loading user profile:', error)
        setUserProfile(null)
      } else {
        setUserProfile(data)
      }
    } catch (error) {
      console.error('Error loading user profile:', error)
      setUserProfile(null)
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email: string, password: string, name?: string) => {
    try {
      const { user: newUser, error } = await authService.signUp({ email, password, name })
      if (error) {
        return { error: new Error(error.message) }
      }
      if (newUser) {
        setUser(newUser)
        // O trigger handle_new_user criará o perfil automaticamente
        // Aguardar um pouco e carregar o perfil
        setTimeout(() => {
          if (newUser.id) {
            loadUserProfile(newUser.id)
          }
        }, 1000)
      }
      return { error: null }
    } catch (error) {
      return { error: error as Error }
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const { user: signedInUser, error } = await authService.signIn({ email, password })
      if (error) {
        return { error: new Error(error.message) }
      }
      if (signedInUser) {
        setUser(signedInUser)
        await loadUserProfile(signedInUser.id)
      }
      return { error: null }
    } catch (error) {
      return { error: error as Error }
    }
  }

  const signOut = async () => {
    try {
      await authService.signOut()
      setUser(null)
      setUserProfile(null)
      setSession(null)
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const updateProfile = async (updates: { name?: string; avatar_url?: string | null }) => {
    if (!user) {
      return { error: new Error('User not authenticated') }
    }

    try {
      const { data, error } = await authService.updateUserProfile(user.id, updates)
      if (error) {
        return { error }
      }
      if (data) {
        setUserProfile(data)
      }
      return { error: null }
    } catch (error) {
      return { error: error as Error }
    }
  }

  const value: AuthContextType = {
    user,
    userProfile,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
