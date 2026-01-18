import { supabase } from './supabase'
import { Transaction, TransactionInsert, TransactionUpdate, TransactionType, TransactionStatus } from '../types'

// ============================================
// 💰 TRANSACTIONS - CRUD
// ============================================

/**
 * Lista todas as transações do usuário
 */
export async function getTransactions(userId: string): Promise<{ data: Transaction[] | null; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false })

    if (error) {
      return { data: null, error: new Error(error.message) }
    }

    return { data, error: null }
  } catch (error) {
    return { data: null, error: error as Error }
  }
}

/**
 * Obtém uma transação específica
 */
export async function getTransaction(id: string): Promise<{ data: Transaction | null; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from('transactions')
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
 * Lista transações por tipo (INCOME ou EXPENSE)
 */
export async function getTransactionsByType(userId: string, type: TransactionType): Promise<{ data: Transaction[] | null; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', userId)
      .eq('type', type)
      .order('date', { ascending: false })

    if (error) {
      return { data: null, error: new Error(error.message) }
    }

    return { data, error: null }
  } catch (error) {
    return { data: null, error: error as Error }
  }
}

/**
 * Lista transações recentes (últimas N transações)
 */
export async function getRecentTransactions(userId: string, limit: number = 10): Promise<{ data: Transaction[] | null; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) {
      return { data: null, error: new Error(error.message) }
    }

    return { data, error: null }
  } catch (error) {
    return { data: null, error: error as Error }
  }
}

/**
 * Lista transações por período (date range)
 */
export async function getTransactionsByDateRange(
  userId: string,
  startDate: string,
  endDate: string
): Promise<{ data: Transaction[] | null; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', userId)
      .gte('date', startDate)
      .lte('date', endDate)
      .order('date', { ascending: false })

    if (error) {
      return { data: null, error: new Error(error.message) }
    }

    return { data, error: null }
  } catch (error) {
    return { data: null, error: error as Error }
  }
}

/**
 * Lista transações por conta/cartão
 */
export async function getTransactionsByAccount(
  userId: string,
  accountId: string
): Promise<{ data: Transaction[] | null; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', userId)
      .eq('account_id', accountId)
      .order('date', { ascending: false })

    if (error) {
      return { data: null, error: new Error(error.message) }
    }

    return { data, error: null }
  } catch (error) {
    return { data: null, error: error as Error }
  }
}

/**
 * Lista transações por categoria
 */
export async function getTransactionsByCategory(
  userId: string,
  categoryId: string
): Promise<{ data: Transaction[] | null; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', userId)
      .eq('category_id', categoryId)
      .order('date', { ascending: false })

    if (error) {
      return { data: null, error: new Error(error.message) }
    }

    return { data, error: null }
  } catch (error) {
    return { data: null, error: error as Error }
  }
}

/**
 * Lista transações por status
 */
export async function getTransactionsByStatus(
  userId: string,
  status: TransactionStatus
): Promise<{ data: Transaction[] | null; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', userId)
      .eq('status', status)
      .order('date', { ascending: false })

    if (error) {
      return { data: null, error: new Error(error.message) }
    }

    return { data, error: null }
  } catch (error) {
    return { data: null, error: error as Error }
  }
}

/**
 * Busca transações por descrição (search)
 */
export async function searchTransactions(
  userId: string,
  searchTerm: string
): Promise<{ data: Transaction[] | null; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', userId)
      .ilike('description', `%${searchTerm}%`)
      .order('date', { ascending: false })

    if (error) {
      return { data: null, error: new Error(error.message) }
    }

    return { data, error: null }
  } catch (error) {
    return { data: null, error: error as Error }
  }
}

/**
 * Cria uma nova transação
 */
export async function createTransaction(transaction: TransactionInsert): Promise<{ data: Transaction | null; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from('transactions')
      .insert({
        ...transaction,
        total_installments: transaction.total_installments || 1,
        is_recurring: transaction.is_recurring || false,
        status: transaction.status || 'COMPLETED',
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
 * Cria transações parceladas (máximo 12 parcelas)
 */
export async function createInstallmentTransactions(
  transaction: TransactionInsert,
  totalInstallments: number
): Promise<{ data: Transaction[] | null; error: Error | null }> {
  if (totalInstallments < 2 || totalInstallments > 12) {
    return { data: null, error: new Error('Total de parcelas deve estar entre 2 e 12') }
  }

  try {
    const transactions: TransactionInsert[] = []
    
    // Criar primeira parcela (parent)
    const firstTransaction = await createTransaction({
      ...transaction,
      total_installments: totalInstallments,
      installment_number: 1,
    })

    if (firstTransaction.error || !firstTransaction.data) {
      return { data: null, error: firstTransaction.error }
    }

    // Criar parcelas filhas
    for (let i = 2; i <= totalInstallments; i++) {
      const installmentDate = new Date(transaction.date)
      installmentDate.setMonth(installmentDate.getMonth() + (i - 1))

      transactions.push({
        ...transaction,
        date: installmentDate.toISOString().split('T')[0],
        total_installments: totalInstallments,
        installment_number: i,
        parent_transaction_id: firstTransaction.data.id,
      })
    }

    const { data, error } = await supabase
      .from('transactions')
      .insert(transactions)
      .select()

    if (error) {
      return { data: null, error: new Error(error.message) }
    }

    // Retornar todas as parcelas (incluindo a primeira)
    const allTransactions = [firstTransaction.data, ...(data || [])]
    return { data: allTransactions, error: null }
  } catch (error) {
    return { data: null, error: error as Error }
  }
}

/**
 * Atualiza uma transação
 */
export async function updateTransaction(id: string, updates: TransactionUpdate): Promise<{ data: Transaction | null; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from('transactions')
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
 * Deleta uma transação
 */
export async function deleteTransaction(id: string): Promise<{ error: Error | null }> {
  try {
    const { error } = await supabase
      .from('transactions')
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
 * Obtém parcelas de uma transação
 */
export async function getTransactionInstallments(parentTransactionId: string): Promise<{ data: Transaction[] | null; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('parent_transaction_id', parentTransactionId)
      .order('installment_number', { ascending: true })

    if (error) {
      return { data: null, error: new Error(error.message) }
    }

    return { data, error: null }
  } catch (error) {
    return { data: null, error: error as Error }
  }
}
