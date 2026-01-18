import { supabase } from './supabase'
import { Account, AccountInsert, AccountUpdate, AccountType } from '../types'

// ============================================
// 💳 ACCOUNTS - CRUD
// ============================================

/**
 * Lista todas as contas/cartões do usuário
 */
export async function getAccounts(userId: string): Promise<{ data: Account[] | null; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from('accounts')
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
 * Obtém uma conta específica
 */
export async function getAccount(id: string): Promise<{ data: Account | null; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from('accounts')
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
 * Lista contas por tipo (CHECKING, SAVINGS, CREDIT_CARD)
 */
export async function getAccountsByType(userId: string, type: AccountType): Promise<{ data: Account[] | null; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from('accounts')
      .select('*')
      .eq('user_id', userId)
      .eq('type', type)
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
 * Lista apenas cartões de crédito (CREDIT_CARD)
 */
export async function getCreditCards(userId: string): Promise<{ data: Account[] | null; error: Error | null }> {
  return getAccountsByType(userId, 'CREDIT_CARD')
}

/**
 * Lista apenas contas bancárias (CHECKING, SAVINGS)
 */
export async function getBankAccounts(userId: string): Promise<{ data: Account[] | null; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from('accounts')
      .select('*')
      .eq('user_id', userId)
      .in('type', ['CHECKING', 'SAVINGS'])
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
 * Calcula o limite disponível de um cartão de crédito
 */
export function getAvailableCreditLimit(account: Account): number {
  if (account.type !== 'CREDIT_CARD' || !account.credit_limit) {
    return 0
  }
  return account.credit_limit - account.current_bill
}

/**
 * Cria uma nova conta/cartão
 */
export async function createAccount(account: AccountInsert): Promise<{ data: Account | null; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from('accounts')
      .insert(account)
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
 * Atualiza uma conta/cartão
 */
export async function updateAccount(id: string, updates: AccountUpdate): Promise<{ data: Account | null; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from('accounts')
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
 * Deleta uma conta/cartão
 */
export async function deleteAccount(id: string): Promise<{ error: Error | null }> {
  try {
    const { error } = await supabase
      .from('accounts')
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
 * Lista apenas contas ativas
 */
export async function getActiveAccounts(userId: string): Promise<{ data: Account[] | null; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from('accounts')
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
