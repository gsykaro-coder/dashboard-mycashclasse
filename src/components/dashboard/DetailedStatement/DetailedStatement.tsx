import { useState } from 'react'

interface Transaction {
  id: string
  member: string
  memberAvatar: string
  date: string
  description: string
  category: string
  accountCard: string
  installments: string
  value: string
}

export default function DetailedStatement() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState('Todos')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const totalItems = 22

  // Dados mockados conforme Figma
  const transactions: Transaction[] = [
    {
      id: '1',
      member: 'Gabriel Bronx',
      memberAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces&auto=format&q=80',
      date: '17/01/2026',
      description: '↑ Conta de água',
      category: 'Manutenção',
      accountCard: 'Conta corrente',
      installments: '-',
      value: 'R$ 100,00',
    },
    {
      id: '2',
      member: 'Gabriel Bronx',
      memberAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces&auto=format&q=80',
      date: '17/01/2026',
      description: '↑ Conta de água',
      category: 'Manutenção',
      accountCard: 'Conta corrente',
      installments: '-',
      value: 'R$ 100,00',
    },
    {
      id: '3',
      member: 'Gabriel Bronx',
      memberAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces&auto=format&q=80',
      date: '17/01/2026',
      description: '↑ Conta de água',
      category: 'Manutenção',
      accountCard: 'Conta corrente',
      installments: '-',
      value: 'R$ 100,00',
    },
    {
      id: '4',
      member: 'Gabriel Bronx',
      memberAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces&auto=format&q=80',
      date: '17/01/2026',
      description: '↑ Conta de água',
      category: 'Manutenção',
      accountCard: 'Conta corrente',
      installments: '-',
      value: 'R$ 100,00',
    },
    {
      id: '5',
      member: 'Gabriel Bronx',
      memberAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces&auto=format&q=80',
      date: '17/01/2026',
      description: '↑ Conta de água',
      category: 'Manutenção',
      accountCard: 'Conta corrente',
      installments: '-',
      value: 'R$ 100,00',
    },
  ]

  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement
    target.style.display = 'none'
  }

  return (
    <div className="bg-[var(--color-surface)] p-4 md:p-6 rounded-[var(--radius-md)] shadow-[var(--shadow-sm)] border border-[var(--border-color)] w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
        {/* Title */}
        <h3 className="text-base md:text-lg font-semibold text-[var(--color-text)] flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-[var(--color-orange-500)]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            />
          </svg>
          Extrato detalhado
        </h3>

        {/* Search and Filter */}
        <div className="flex items-center gap-3">
          {/* Search Bar */}
          <div className="relative flex-1 min-w-[200px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-[var(--color-orange-500)]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pesquisar"
              className="w-full pl-10 pr-4 py-2.5 border-2 border-[var(--color-orange-500)] rounded-[var(--radius-md)] text-sm text-[var(--color-text)] placeholder-[var(--color-text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-orange-500)] focus:ring-offset-0 bg-[var(--color-surface)]"
            />
          </div>

          {/* Filter Dropdown */}
          <div className="relative">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="appearance-none pl-4 pr-10 py-2.5 border-2 border-[var(--color-orange-500)] rounded-[var(--radius-md)] text-sm text-[var(--color-text)] bg-[var(--color-surface)] focus:outline-none focus:ring-2 focus:ring-[var(--color-orange-500)] focus:ring-offset-0 cursor-pointer min-w-[120px]"
            >
              <option value="Todos">Todos</option>
              <option value="Receitas">Receitas</option>
              <option value="Despesas">Despesas</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-[var(--color-orange-500)]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          {/* Table Header */}
          <thead>
            <tr className="border-b border-[var(--border-color)]">
              <th className="text-left py-3 px-4 text-xs md:text-sm font-semibold text-[var(--color-text-secondary)]">
                Membro
              </th>
              <th className="text-left py-3 px-4 text-xs md:text-sm font-semibold text-[var(--color-text-secondary)]">
                Data
              </th>
              <th className="text-left py-3 px-4 text-xs md:text-sm font-semibold text-[var(--color-text-secondary)]">
                Descrição
              </th>
              <th className="text-left py-3 px-4 text-xs md:text-sm font-semibold text-[var(--color-text-secondary)]">
                Categoria
              </th>
              <th className="text-left py-3 px-4 text-xs md:text-sm font-semibold text-[var(--color-text-secondary)]">
                Conta/Cartão
              </th>
              <th className="text-left py-3 px-4 text-xs md:text-sm font-semibold text-[var(--color-text-secondary)]">
                Parcelas
              </th>
              <th className="text-right py-3 px-4 text-xs md:text-sm font-semibold text-[var(--color-text-secondary)]">
                Valor
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {transactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="border-b border-[var(--border-color)] hover:bg-[var(--color-surface-hover)] transition-colors"
              >
                {/* Membro */}
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                      <img
                        src={transaction.memberAvatar}
                        alt={transaction.member}
                        className="w-full h-full object-cover"
                        onError={handleImageError}
                      />
                    </div>
                  </div>
                </td>

                {/* Data */}
                <td className="py-3 px-4 text-sm text-[var(--color-text)]">
                  {transaction.date}
                </td>

                {/* Descrição */}
                <td className="py-3 px-4 text-sm font-medium text-[var(--color-text)]">
                  {transaction.description}
                </td>

                {/* Categoria */}
                <td className="py-3 px-4 text-sm text-[var(--color-text-secondary)]">
                  {transaction.category}
                </td>

                {/* Conta/Cartão */}
                <td className="py-3 px-4 text-sm text-[var(--color-text-secondary)]">
                  {transaction.accountCard}
                </td>

                {/* Parcelas */}
                <td className="py-3 px-4 text-sm text-[var(--color-text-secondary)]">
                  {transaction.installments}
                </td>

                {/* Valor */}
                <td className="py-3 px-4 text-sm font-semibold text-[var(--color-text)] text-right">
                  {transaction.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-4 pt-4 border-t border-[var(--border-color)] gap-4">
        {/* Pagination Info */}
        <div className="text-xs md:text-sm text-[var(--color-text-secondary)]">
          Mostrando {startItem} a {endItem} de {totalItems}
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center gap-2">
          {/* Previous Button */}
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="w-8 h-8 flex items-center justify-center rounded-[var(--radius-sm)] border border-[var(--border-color)] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--color-surface-hover)] transition-colors"
            aria-label="Página anterior"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-[var(--color-text)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Page Numbers */}
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum: number
            if (totalPages <= 5) {
              pageNum = i + 1
            } else if (currentPage <= 3) {
              pageNum = i + 1
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i
            } else {
              pageNum = currentPage - 2 + i
            }

            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-8 h-8 flex items-center justify-center rounded-[var(--radius-sm)] text-sm font-medium transition-colors ${
                  currentPage === pageNum
                    ? 'bg-[var(--color-orange-500)] text-white'
                    : 'text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]'
                }`}
                aria-label={`Página ${pageNum}`}
              >
                {pageNum}
              </button>
            )
          })}

          {/* Next Button */}
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="w-8 h-8 flex items-center justify-center rounded-[var(--radius-sm)] border border-[var(--border-color)] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--color-surface-hover)] transition-colors"
            aria-label="Próxima página"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-[var(--color-text)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
