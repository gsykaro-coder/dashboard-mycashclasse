import { Transaction, TransactionType } from '../../../types'
import { normalizeTransactionType } from '../../../utils/typeHelpers'

interface RecentTransactionItemProps {
  transaction: Transaction
  categoryName?: string
}

export default function RecentTransactionItem({
  transaction,
  categoryName,
}: RecentTransactionItemProps) {
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
    }).format(date)
  }

  const normalizedType = normalizeTransactionType(transaction.type)

  const getTypeStyles = (type: TransactionType) => {
    const normalized = normalizeTransactionType(type)
    return normalized === 'income'
      ? 'text-green-600 bg-green-50'
      : 'text-red-600 bg-red-50'
  }

  const getTypeSign = (type: TransactionType) => {
    const normalized = normalizeTransactionType(type)
    return normalized === 'income' ? '+' : '-'
  }

  return (
    <div className="flex items-center justify-between p-3 md:p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
        {/* Category Icon/Indicator */}
        <div
          className={`
            w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center
            flex-shrink-0
            ${getTypeStyles(transaction.type)}
          `}
        >
          <span className="text-lg md:text-xl">
            {normalizedType === 'income' ? '📈' : '📉'}
          </span>
        </div>

        {/* Transaction Info */}
        <div className="flex-1 min-w-0">
          <p className="text-sm md:text-base font-medium text-gray-900 truncate">
            {transaction.description}
          </p>
          <div className="flex items-center gap-2 mt-1">
            {categoryName && (
              <>
                <span className="text-xs md:text-sm text-gray-500">
                  {categoryName}
                </span>
                <span className="text-gray-300">•</span>
              </>
            )}
            <span className="text-xs md:text-sm text-gray-500">
              {formatDate(transaction.date)}
            </span>
          </div>
        </div>
      </div>

      {/* Amount */}
      <div className="ml-2 flex-shrink-0">
        <p
          className={`
            text-sm md:text-base font-semibold
            ${normalizedType === 'income' ? 'text-green-600' : 'text-red-600'}
          `}
        >
          {getTypeSign(transaction.type)}
          {formatCurrency(Math.abs(Number(transaction.amount)))}
        </p>
      </div>
    </div>
  )
}
