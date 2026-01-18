import { Transaction, TransactionType } from '../../../types'
import { normalizeTransactionType } from '../../../utils/typeHelpers'

interface TransactionItemProps {
  transaction: Transaction
  categoryName?: string
}

export default function TransactionItem({
  transaction,
  categoryName,
}: TransactionItemProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(date)
  }

  const formatTime = () => {
    const date = new Date(transaction.created_at)
    return new Intl.DateTimeFormat('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  }

  const normalizedType = normalizeTransactionType(transaction.type)

  const getTypeStyles = (type: TransactionType) => {
    const normalized = normalizeTransactionType(type)
    return normalized === 'income'
      ? 'text-green-600 bg-green-50 border-green-200'
      : 'text-red-600 bg-red-50 border-red-200'
  }

  const getTypeSign = (type: TransactionType) => {
    const normalized = normalizeTransactionType(type)
    return normalized === 'income' ? '+' : '-'
  }

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-4">
        {/* Left Section - Icon and Info */}
        <div className="flex items-start gap-3 md:gap-4 flex-1 min-w-0">
          {/* Category Icon */}
          <div
            className={`
              w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center
              flex-shrink-0 border-2
              ${getTypeStyles(transaction.type)}
            `}
          >
            <span className="text-lg md:text-xl">
              {normalizedType === 'income' ? '📈' : '📉'}
            </span>
          </div>

          {/* Transaction Details */}
          <div className="flex-1 min-w-0">
            <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1">
              {transaction.description}
            </h3>
            {categoryName && (
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span
                  className={`
                    px-2 py-1 rounded-md text-xs font-medium
                    ${getTypeStyles(transaction.type)}
                  `}
                >
                  {categoryName}
                </span>
              </div>
            )}
            <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500">
              <span>{formatDate(transaction.date)}</span>
              <span className="text-gray-300">•</span>
              <span>{formatTime()}</span>
            </div>
          </div>
        </div>

        {/* Right Section - Amount */}
        <div className="flex-shrink-0 text-right">
          <p
            className={`
              text-lg md:text-xl font-bold mb-1
              ${normalizedType === 'income' ? 'text-green-600' : 'text-red-600'}
            `}
          >
            {getTypeSign(transaction.type)}
            {formatCurrency(Math.abs(Number(transaction.amount)))}
          </p>
        </div>
      </div>
    </div>
  )
}
