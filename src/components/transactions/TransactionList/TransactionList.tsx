import { useEffect, useState } from 'react'
import { Transaction } from '../../../types'
import TransactionItem from '../TransactionItem/TransactionItem'
import { FilterState } from '../TransactionFilters/TransactionFilters'

interface TransactionListProps {
  filters: FilterState
}

export default function TransactionList({ filters }: TransactionListProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // TODO: Buscar transações do Supabase com filtros
    // Por enquanto, dados mockados
    const mockTransactions: Transaction[] = [
      {
        id: '1',
        description: 'Salário',
        amount: 5000.0,
        type: 'income',
        category: 'Trabalho',
        date: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        description: 'Aluguel',
        amount: 1200.0,
        type: 'expense',
        category: 'Moradia',
        date: new Date(Date.now() - 86400000).toISOString(),
        createdAt: new Date(Date.now() - 86400000).toISOString(),
      },
      {
        id: '3',
        description: 'Supermercado',
        amount: 350.5,
        type: 'expense',
        category: 'Alimentação',
        date: new Date(Date.now() - 172800000).toISOString(),
        createdAt: new Date(Date.now() - 172800000).toISOString(),
      },
      {
        id: '4',
        description: 'Freelance',
        amount: 800.0,
        type: 'income',
        category: 'Trabalho',
        date: new Date(Date.now() - 259200000).toISOString(),
        createdAt: new Date(Date.now() - 259200000).toISOString(),
      },
      {
        id: '5',
        description: 'Conta de luz',
        amount: 150.0,
        type: 'expense',
        category: 'Utilidades',
        date: new Date(Date.now() - 345600000).toISOString(),
        createdAt: new Date(Date.now() - 345600000).toISOString(),
      },
      {
        id: '6',
        description: 'Uber',
        amount: 25.0,
        type: 'expense',
        category: 'Transporte',
        date: new Date(Date.now() - 432000000).toISOString(),
        createdAt: new Date(Date.now() - 432000000).toISOString(),
      },
    ]

    // Aplicar filtros
    let filtered = mockTransactions

    if (filters.type !== 'all') {
      filtered = filtered.filter((t) => t.type === filters.type)
    }

    if (filters.category !== 'Todas') {
      filtered = filtered.filter((t) => t.category === filters.category)
    }

    // TODO: Aplicar filtro de período

    setTimeout(() => {
      setTransactions(filtered)
      setIsLoading(false)
    }, 300)
  }, [filters])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-sm text-gray-500">Carregando transações...</p>
      </div>
    )
  }

  if (transactions.length === 0) {
    return (
      <div className="bg-white p-8 md:p-12 rounded-lg shadow-sm border border-gray-200 text-center">
        <p className="text-4xl mb-4">📋</p>
        <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
          Nenhuma transação encontrada
        </h3>
        <p className="text-sm md:text-base text-gray-600">
          Tente ajustar os filtros ou adicionar uma nova transação
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3 md:space-y-4">
      {transactions.map((transaction) => (
        <TransactionItem key={transaction.id} transaction={transaction} />
      ))}
    </div>
  )
}
