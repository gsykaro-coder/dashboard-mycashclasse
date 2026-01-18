import { useState, useEffect } from 'react'
import * as categoriesService from '../services/categories'
import { Category, CategoryInsert, CategoryUpdate, TransactionType } from '../types'
import { useAuth } from '../context/AuthContext'

export function useCategories() {
  const { user } = useAuth()
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (user) {
      loadCategories()
    } else {
      setCategories([])
      setLoading(false)
    }
  }, [user])

  const loadCategories = async () => {
    if (!user) return

    setLoading(true)
    setError(null)

    try {
      const { data, error: err } = await categoriesService.getCategories(user.id)
      if (err) {
        setError(err)
        setCategories([])
      } else {
        setCategories(data || [])
      }
    } catch (err) {
      setError(err as Error)
      setCategories([])
    } finally {
      setLoading(false)
    }
  }

  const getByType = (type: TransactionType) => {
    return categories.filter((c) => c.type === type && c.is_active)
  }

  const createCategory = async (category: CategoryInsert) => {
    if (!user) {
      throw new Error('User not authenticated')
    }

    const { data, error: err } = await categoriesService.createCategory({
      ...category,
      user_id: user.id,
    })

    if (err) {
      throw err
    }

    if (data) {
      setCategories((prev) => [...prev, data])
    }

    return data
  }

  const updateCategory = async (id: string, updates: CategoryUpdate) => {
    const { data, error: err } = await categoriesService.updateCategory(id, updates)

    if (err) {
      throw err
    }

    if (data) {
      setCategories((prev) => prev.map((c) => (c.id === id ? data : c)))
    }

    return data
  }

  const deleteCategory = async (id: string) => {
    const { error: err } = await categoriesService.deleteCategory(id)

    if (err) {
      throw err
    }

    setCategories((prev) => prev.filter((c) => c.id !== id))
  }

  const activeCategories = categories.filter((c) => c.is_active)
  const incomeCategories = getByType('INCOME')
  const expenseCategories = getByType('EXPENSE')

  return {
    categories,
    activeCategories,
    incomeCategories,
    expenseCategories,
    loading,
    error,
    createCategory,
    updateCategory,
    deleteCategory,
    refresh: loadCategories,
  }
}
