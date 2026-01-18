import { useState, useEffect } from 'react'
import * as accountsService from '../services/accounts'
import { Account, AccountInsert, AccountUpdate, AccountType } from '../types'
import { useAuth } from '../context/AuthContext'

export function useAccounts() {
  const { user } = useAuth()
  const [accounts, setAccounts] = useState<Account[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (user) {
      loadAccounts()
    } else {
      setAccounts([])
      setLoading(false)
    }
  }, [user])

  const loadAccounts = async () => {
    if (!user) return

    setLoading(true)
    setError(null)

    try {
      const { data, error: err } = await accountsService.getAccounts(user.id)
      if (err) {
        setError(err)
        setAccounts([])
      } else {
        setAccounts(data || [])
      }
    } catch (err) {
      setError(err as Error)
      setAccounts([])
    } finally {
      setLoading(false)
    }
  }

  const getByType = (type: AccountType) => {
    return accounts.filter((a) => a.type === type && a.is_active)
  }

  const getCreditCards = () => {
    return getByType('CREDIT_CARD')
  }

  const getBankAccounts = () => {
    return accounts.filter((a) => (a.type === 'CHECKING' || a.type === 'SAVINGS') && a.is_active)
  }

  const createAccount = async (account: AccountInsert) => {
    if (!user) {
      throw new Error('User not authenticated')
    }

    const { data, error: err } = await accountsService.createAccount({
      ...account,
      user_id: user.id,
    })

    if (err) {
      throw err
    }

    if (data) {
      setAccounts((prev) => [data, ...prev])
    }

    return data
  }

  const updateAccount = async (id: string, updates: AccountUpdate) => {
    const { data, error: err } = await accountsService.updateAccount(id, updates)

    if (err) {
      throw err
    }

    if (data) {
      setAccounts((prev) => prev.map((a) => (a.id === id ? data : a)))
    }

    return data
  }

  const deleteAccount = async (id: string) => {
    const { error: err } = await accountsService.deleteAccount(id)

    if (err) {
      throw err
    }

    setAccounts((prev) => prev.filter((a) => a.id !== id))
  }

  const activeAccounts = accounts.filter((a) => a.is_active)
  const creditCards = getCreditCards()
  const bankAccounts = getBankAccounts()

  // Calcular totais
  const totalBalance = bankAccounts.reduce((sum, acc) => sum + Number(acc.balance), 0)
  const totalCreditLimit = creditCards.reduce((sum, acc) => sum + (Number(acc.credit_limit) || 0), 0)
  const totalCurrentBill = creditCards.reduce((sum, acc) => sum + Number(acc.current_bill), 0)
  const totalAvailableCredit = totalCreditLimit - totalCurrentBill

  return {
    accounts,
    activeAccounts,
    creditCards,
    bankAccounts,
    totalBalance,
    totalCreditLimit,
    totalCurrentBill,
    totalAvailableCredit,
    loading,
    error,
    createAccount,
    updateAccount,
    deleteAccount,
    refresh: loadAccounts,
  }
}
