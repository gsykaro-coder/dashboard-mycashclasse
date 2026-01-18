import { supabase } from './supabase'
import { RecurringTransaction, RecurringTransactionInsert, RecurringTransactionUpdate } from '../types'

// ============================================
// 💫 RECURRING TRANSACTIONS - CRUD
// ============================================

/**
 * Lista todas as transações recorrentes do usuário
 */
export async function getRecurringTransactions(userId: string): Promise<{ data: RecurringTransaction[] | null; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from('recurring_transactions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      return { data: null, error: new Error(error.message) }
    }

    return { data, error: null }
  } catch (error) {
    return { data: null, error: error as Error }
  }
}

/**
 * Obtém uma transação recorrente específica
 */
export async function getRecurringTransaction(id: string): Promise<{ data: RecurringTransaction | null; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from('recurring_transactions')
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
 * Lista apenas transações recorrentes ativas
 */
export async function getActiveRecurringTransactions(userId: string): Promise<{ data: RecurringTransaction[] | null; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from('recurring_transactions')
      .select('*')
      .eq('user_id', userId)
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (error) {
      return { data: null, error: new Error(error.message) }
    }

    return { data, error: null }
  } catch (error) {
    return { data: null, error: error as Error }
  }
}

/**
 * Cria uma nova transação recorrente
 */
export async function createRecurringTransaction(
  recurringTransaction: RecurringTransactionInsert
): Promise<{ data: RecurringTransaction | null; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from('recurring_transactions')
      .insert({
        ...recurringTransaction,
        type: recurringTransaction.type || 'EXPENSE',
        is_active: recurringTransaction.is_active !== undefined ? recurringTransaction.is_active : true,
      })
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
 * Atualiza uma transação recorrente
 */
export async function updateRecurringTransaction(
  id: string,
  updates: RecurringTransactionUpdate
): Promise<{ data: RecurringTransaction | null; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from('recurring_transactions')
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
 * Deleta uma transação recorrente
 */
export async function deleteRecurringTransaction(id: string): Promise<{ error: Error | null }> {
  try {
    const { error } = await supabase
      .from('recurring_transactions')
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
 * Ativa/desativa uma transação recorrente
 */
export async function toggleRecurringTransaction(id: string, isActive: boolean): Promise<{ data: RecurringTransaction | null; error: Error | null }> {
  return updateRecurringTransaction(id, { is_active: isActive })
}
