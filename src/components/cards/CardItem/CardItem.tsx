import { Card } from '../../../types'

interface CardItemProps {
  card: Card
}

export default function CardItem({ card }: CardItemProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  const getLogoInitials = (name: string) => {
    if (name.toLowerCase().includes('nubank')) return 'nu'
    if (name.toLowerCase().includes('xp')) return 'XP'
    if (name.toLowerCase().includes('inter')) return 'IN'
    return name.substring(0, 2).toUpperCase()
  }

  const getLogoColor = (name: string) => {
    if (name.toLowerCase().includes('nubank')) return 'bg-purple-500'
    if (name.toLowerCase().includes('xp')) return 'bg-gray-900'
    if (name.toLowerCase().includes('inter')) return 'bg-[var(--color-orange-500)]'
    return 'bg-gray-500'
  }

  return (
    <div
      className={`
        bg-[var(--color-surface)] p-4 border border-[var(--border-color)] rounded-[var(--radius-md)] shadow-[var(--shadow-sm)]
        transition-all duration-200 hover:shadow-[var(--shadow-md)]
        ${card.isActive ? '' : 'opacity-60'}
      `}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg ${getLogoColor(card.name)} flex items-center justify-center text-white font-bold text-sm`}>
            {getLogoInitials(card.name)}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[var(--color-text)]">
              {card.name} **** {card.number}
            </h3>
            <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
              {formatCurrency(card.availableLimit)}
            </p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <button
            className="w-8 h-8 flex items-center justify-center rounded-[var(--radius-sm)] hover:bg-[var(--color-surface-hover)] transition-colors"
            aria-label="Mais opções"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-[var(--color-text-secondary)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-[var(--border-color)]">
        <p className="text-xs text-[var(--color-text-secondary)]">
          Vence dia {card.dueDate || '--'}
        </p>
      </div>
    </div>
  )
}
