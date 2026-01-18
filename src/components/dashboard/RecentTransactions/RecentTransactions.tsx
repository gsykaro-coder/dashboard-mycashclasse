import { useTransactions } from '../../../hooks/useTransactions'
import { useCategories } from '../../../hooks/useCategories'
import RecentTransactionItem from './RecentTransactionItem'

export default function RecentTransactions() {
  const { transactions, loading } = useTransactions({ limit: 5 })
  const { categories } = useCategories()

  // Mapear category_id para category name
  const getCategoryName = (categoryId: string | null | undefined) => {
    if (!categoryId) return undefined
    const category = categories.find((c) => c.id === categoryId)
    return category?.name
  }

  if (loading) {
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
            categoryName={getCategoryName(transaction.category_id)}
          />
        ))}
      </div>
    </div>
  )
}
