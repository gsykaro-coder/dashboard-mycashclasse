import { toTransactionType } from '../../../utils/typeHelpers'
import TransactionItem from '../TransactionItem/TransactionItem'
import { FilterState } from '../TransactionFilters/TransactionFilters'
import { useTransactions } from '../../../hooks/useTransactions'
import { useCategories } from '../../../hooks/useCategories'

interface TransactionListProps {
  filters: FilterState
}

export default function TransactionList({ filters }: TransactionListProps) {
  const { transactions, loading, error } = useTransactions({
    type: filters.type !== 'all' ? toTransactionType(filters.type as 'income' | 'expense') : undefined,
  })
  const { categories } = useCategories()

  // Mapear category_id para category name
  const getCategoryName = (categoryId: string | null | undefined) => {
    if (!categoryId) return undefined
    const category = categories.find((c) => c.id === categoryId)
    return category?.name
  }

  // Filtrar por categoria se necessário
  const filteredTransactions = filters.category !== 'Todas'
    ? transactions.filter((t) => {
        const categoryName = getCategoryName(t.category_id)
        return categoryName === filters.category
      })
    : transactions

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-sm text-gray-500">Carregando transações...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white p-8 md:p-12 rounded-lg shadow-sm border border-gray-200 text-center">
        <p className="text-red-600 mb-2">Erro ao carregar transações</p>
        <p className="text-sm text-gray-500">{error.message}</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-sm text-gray-500">Carregando transações...</p>
      </div>
    )
  }

  if (filteredTransactions.length === 0) {
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
      {filteredTransactions.map((transaction) => (
        <TransactionItem
          key={transaction.id}
          transaction={transaction}
          categoryName={getCategoryName(transaction.category_id)}
        />
      ))}
    </div>
  )
}
