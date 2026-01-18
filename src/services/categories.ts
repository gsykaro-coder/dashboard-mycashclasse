import { supabase } from './supabase'
import { Category, CategoryInsert, CategoryUpdate, TransactionType } from '../types'

// ============================================
// 🏷️ CATEGORIES - CRUD
// ============================================

/**
 * Lista todas as categorias do usuário
 */
export async function getCategories(userId: string): Promise<{ data: Category[] | null; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('user_id', userId)
      .order('name', { ascending: true })

    if (error) {
      return { data: null, error: new Error(error.message) }
    }

    return { data, error: null }
  } catch (error) {
    return { data: null, error: error as Error }
  }
}

/**
 * Obtém uma categoria específica
 */
export async function getCategory(id: string): Promise<{ data: Category | null; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('id', id)
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
 * Lista categorias por tipo (INCOME ou EXPENSE)
 */
export async function getCategoriesByType(userId: string, type: TransactionType): Promise<{ data: Category[] | null; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('user_id', userId)
      .eq('type', type)
      .eq('is_active', true)
      .order('name', { ascending: true })

    if (error) {
      return { data: null, error: new Error(error.message) }
    }

    return { data, error: null }
  } catch (error) {
    return { data: null, error: error as Error }
  }
}

/**
 * Cria uma nova categoria
 */
export async function createCategory(category: CategoryInsert): Promise<{ data: Category | null; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from('categories')
      .insert(category)
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
 * Atualiza uma categoria
 */
export async function updateCategory(id: string, updates: CategoryUpdate): Promise<{ data: Category | null; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from('categories')
      .update(updates)
      .eq('id', id)
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
 * Deleta uma categoria
 */
export async function deleteCategory(id: string): Promise<{ error: Error | null }> {
  try {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id)

    if (error) {
      return { error: new Error(error.message) }
    }

    return { error: null }
  } catch (error) {
    return { error: error as Error }
  }
}

/**
 * Lista apenas categorias ativas
 */
export async function getActiveCategories(userId: string): Promise<{ data: Category[] | null; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('user_id', userId)
      .eq('is_active', true)
      .order('name', { ascending: true })

    if (error) {
      return { data: null, error: new Error(error.message) }
    }

    return { data, error: null }
  } catch (error) {
    return { data: null, error: error as Error }
  }
}
