import { useState } from 'react'
import TransactionFilters, {
  FilterState,
} from '../components/transactions/TransactionFilters/TransactionFilters'
import TransactionList from '../components/transactions/TransactionList/TransactionList'

export default function Transactions() {
  const [filters, setFilters] = useState<FilterState>({
    type: 'all',
    category: 'Todas',
    period: 'all',
  })

  return (
    <div className="py-6 md:py-8 w-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Transações
        </h1>
        <button className="px-4 md:px-6 py-2 md:py-3 bg-lime-600 text-white rounded-lg font-medium hover:bg-lime-700 transition-colors text-sm md:text-base">
          + Nova Transação
        </button>
      </div>

      {/* Filters */}
      <TransactionFilters onFilterChange={setFilters} />

      {/* Transaction List */}
      <TransactionList filters={filters} />
    </div>
  )
}
