import { useEffect, useState } from 'react'
import { Transaction } from '../../../types'
import RecentTransactionItem from './RecentTransactionItem'

export default function RecentTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // TODO: Buscar transações recentes do Supabase
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
    ]

    setTimeout(() => {
      setTransactions(mockTransactions)
      setIsLoading(false)
    }, 500)
  }, [])

  if (isLoading) {
    return (
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-4">
          Transações Recentes
        </h2>
        <div className="flex items-center justify-center py-8">
          <p className="text-sm text-gray-500">Carregando...</p>
        </div>
      </div>
    )
  }

  if (transactions.length === 0) {
    return (
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-4">
          Transações Recentes
        </h2>
        <div className="flex items-center justify-center py-8">
          <p className="text-sm text-gray-500">Nenhuma transação recente</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base md:text-lg font-semibold text-gray-900">
          Transações Recentes
        </h2>
        <a
          href="/transactions"
          className="text-xs md:text-sm text-lime-600 hover:text-lime-700 font-medium"
        >
          Ver todas
        </a>
      </div>

      <div className="divide-y divide-gray-100">
        {transactions.slice(0, 5).map((transaction) => (
          <RecentTransactionItem
            key={transaction.id}
            transaction={transaction}
          />
        ))}
      </div>
    </div>
  )
}
