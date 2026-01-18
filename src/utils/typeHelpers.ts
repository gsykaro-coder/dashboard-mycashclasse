// ============================================
// 🔧 HELPERS - Conversão entre formatos
// ============================================
// Funções para converter entre formatos antigos (compatibilidade) e novos (schema)

import { Transaction, TransactionType, Account } from '../types'

/**
 * Converte TransactionType do banco (INCOME/EXPENSE) para formato antigo (income/expense)
 */
export function normalizeTransactionType(type: TransactionType): 'income' | 'expense' {
  return type === 'INCOME' ? 'income' : 'expense'
}

/**
 * Converte tipo antigo (income/expense) para TransactionType do banco (INCOME/EXPENSE)
 */
export function toTransactionType(type: 'income' | 'expense'): TransactionType {
  return type === 'income' ? 'INCOME' : 'EXPENSE'
}

/**
 * Converte Account para formato Card (compatibilidade)
 */
export function accountToCard(account: Account): {
  id: string
  name: string
  number?: string
  brand?: string
  limit: number
  availableLimit: number
  isActive: boolean
  dueDate?: string
  createdAt: string
} {
  const availableLimit = account.type === 'CREDIT_CARD' && account.credit_limit
    ? Number(account.credit_limit) - Number(account.current_bill)
    : Number(account.balance)

  return {
    id: account.id,
    name: account.name,
    number: account.last_digits || undefined,
    brand: undefined, // Pode ser derivado do banco se necessário
    limit: account.type === 'CREDIT_CARD' ? Number(account.credit_limit || 0) : Number(account.balance),
    availableLimit,
    isActive: account.is_active,
    dueDate: account.due_day?.toString(),
    createdAt: account.created_at,
  }
}

/**
 * Converte Transaction para formato antigo (compatibilidade)
 */
export function transactionToLegacy(transaction: Transaction, categoryName?: string): {
  id: string
  description: string
  amount: number
  type: 'income' | 'expense'
  category: string
  date: string
  createdAt: string
} {
  return {
    id: transaction.id,
    description: transaction.description,
    amount: Number(transaction.amount),
    type: normalizeTransactionType(transaction.type),
    category: categoryName || transaction.category_id || '',
    date: transaction.date,
    createdAt: transaction.created_at,
  }
}
