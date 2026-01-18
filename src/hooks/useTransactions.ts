import { useState, useEffect } from 'react'
import * as transactionsService from '../services/transactions'
import { Transaction, TransactionInsert, TransactionUpdate, TransactionType, TransactionStatus } from '../types'
import { useAuth } from '../context/AuthContext'

interface UseTransactionsOptions {
  type?: TransactionType
  accountId?: string
  categoryId?: string
  status?: TransactionStatus
  startDate?: string
  endDate?: string
  limit?: number
}

export function useTransactions(options: UseTransactionsOptions = {}) {
  const { user } = useAuth()
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (user) {
      loadTransactions()
    } else {
      setTransactions([])
      setLoading(false)
    }
  }, [user, options.type, options.accountId, options.categoryId, options.status, options.startDate, options.endDate])

  const loadTransactions = async () => {
    if (!user) return

    setLoading(true)
    setError(null)

    try {
      let result

      if (options.limit) {
        // Transações recentes
        result = await transactionsService.getRecentTransactions(user.id, options.limit)
      } else if (options.startDate && options.endDate) {
        // Por período
        result = await transactionsService.getTransactionsByDateRange(user.id, options.startDate, options.endDate)
      } else if (options.accountId) {
        // Por conta
        result = await transactionsService.getTransactionsByAccount(user.id, options.accountId)
      } else if (options.categoryId) {
        // Por categoria
        result = await transactionsService.getTransactionsByCategory(user.id, options.categoryId)
      } else if (options.type) {
        // Por tipo
        result = await transactionsService.getTransactionsByType(user.id, options.type)
      } else {
        // Todas as transações
        result = await transactionsService.getTransactions(user.id)
      }

      if (result.error) {
        setError(result.error)
        setTransactions([])
      } else {
        setTransactions(result.data || [])
      }
    } catch (err) {
      setError(err as Error)
      setTransactions([])
    } finally {
      setLoading(false)
    }
  }

  const search = async (searchTerm: string) => {
    if (!user) return

    setLoading(true)
    setError(null)

    try {
      const { data, error: err } = await transactionsService.searchTransactions(user.id, searchTerm)
      if (err) {
        setError(err)
      } else {
        setTransactions(data || [])
      }
    } catch (err) {
      setError(err as Error)
    } finally {
      setLoading(false)
    }
  }

  const createTransaction = async (transaction: TransactionInsert) => {
    if (!user) {
      throw new Error('User not authenticated')
    }

    const { data, error: err } = await transactionsService.createTransaction({
      ...transaction,
      user_id: user.id,
    })

    if (err) {
      throw err
    }

    if (data) {
      setTransactions((prev) => [data, ...prev])
    }

    return data
  }

  const createInstallments = async (transaction: TransactionInsert, totalInstallments: number) => {
    if (!user) {
      throw new Error('User not authenticated')
    }

    const { data, error: err } = await transactionsService.createInstallmentTransactions(
      {
        ...transaction,
        user_id: user.id,
      },
      totalInstallments
    )

    if (err) {
      throw err
    }

    if (data) {
      setTransactions((prev) => [...data, ...prev])
    }

    return data
  }

  const updateTransaction = async (id: string, updates: TransactionUpdate) => {
    const { data, error: err } = await transactionsService.updateTransaction(id, updates)

    if (err) {
      throw err
    }

    if (data) {
      setTransactions((prev) => prev.map((t) => (t.id === id ? data : t)))
    }

    return data
  }

  const deleteTransaction = async (id: string) => {
    const { error: err } = await transactionsService.deleteTransaction(id)

    if (err) {
      throw err
    }

    setTransactions((prev) => prev.filter((t) => t.id !== id))
  }

  // Filtros e cálculos
  const incomeTransactions = transactions.filter((t) => t.type === 'INCOME')
  const expenseTransactions = transactions.filter((t) => t.type === 'EXPENSE')
  const pendingTransactions = transactions.filter((t) => t.status === 'PENDING')
  const completedTransactions = transactions.filter((t) => t.status === 'COMPLETED')

  const totalIncome = incomeTransactions.reduce((sum, t) => sum + Number(t.amount), 0)
  const totalExpenses = expenseTransactions.reduce((sum, t) => sum + Number(t.amount), 0)
  const balance = totalIncome - totalExpenses

  return {
    transactions,
    incomeTransactions,
    expenseTransactions,
    pendingTransactions,
    completedTransactions,
    totalIncome,
    totalExpenses,
    balance,
    loading,
    error,
    createTransaction,
    createInstallments,
    updateTransaction,
    deleteTransaction,
    search,
    refresh: loadTransactions,
  }
}
