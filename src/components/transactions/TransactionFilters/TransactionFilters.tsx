import { useState } from 'react'

interface TransactionFiltersProps {
  onFilterChange: (filters: FilterState) => void
}

export interface FilterState {
  type: 'all' | 'income' | 'expense'
  category: string
  period: 'all' | 'today' | 'week' | 'month' | 'year'
}

const categories = [
  'Todas',
  'Trabalho',
  'Alimentação',
  'Moradia',
  'Transporte',
  'Lazer',
  'Saúde',
  'Utilidades',
  'Outros',
]

export default function TransactionFilters({
  onFilterChange,
}: TransactionFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    type: 'all',
    category: 'Todas',
    period: 'all',
  })

  const handleTypeChange = (type: 'all' | 'income' | 'expense') => {
    const newFilters = { ...filters, type }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleCategoryChange = (category: string) => {
    const newFilters = { ...filters, category }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handlePeriodChange = (period: 'all' | 'today' | 'week' | 'month' | 'year') => {
    const newFilters = { ...filters, period }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
      <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-4">
        Filtros
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Type Filter */}
        <div>
          <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
            Tipo
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => handleTypeChange('all')}
              className={`
                flex-1 px-3 py-2 rounded-lg text-xs md:text-sm font-medium
                transition-colors
                ${
                  filters.type === 'all'
                    ? 'bg-lime-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              Todos
            </button>
            <button
              onClick={() => handleTypeChange('income')}
              className={`
                flex-1 px-3 py-2 rounded-lg text-xs md:text-sm font-medium
                transition-colors
                ${
                  filters.type === 'income'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              Receitas
            </button>
            <button
              onClick={() => handleTypeChange('expense')}
              className={`
                flex-1 px-3 py-2 rounded-lg text-xs md:text-sm font-medium
                transition-colors
                ${
                  filters.type === 'expense'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              Despesas
            </button>
          </div>
        </div>

        {/* Category Filter */}
        <div>
          <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
            Categoria
          </label>
          <select
            value={filters.category}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent bg-white"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Period Filter */}
        <div>
          <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
            Período
          </label>
          <select
            value={filters.period}
            onChange={(e) =>
              handlePeriodChange(
                e.target.value as 'all' | 'today' | 'week' | 'month' | 'year'
              )
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent bg-white"
          >
            <option value="all">Todos</option>
            <option value="today">Hoje</option>
            <option value="week">Esta semana</option>
            <option value="month">Este mês</option>
            <option value="year">Este ano</option>
          </select>
        </div>
      </div>
    </div>
  )
}
