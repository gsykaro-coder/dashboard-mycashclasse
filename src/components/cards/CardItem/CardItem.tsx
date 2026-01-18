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

  const getBrandIcon = (brand: string) => {
    const brandLower = brand.toLowerCase()
    if (brandLower.includes('visa')) return '💳'
    if (brandLower.includes('master')) return '💳'
    if (brandLower.includes('elo')) return '💳'
    return '💳'
  }

  const maskCardNumber = (number: string) => {
    const lastFour = number.slice(-4)
    return `**** **** **** ${lastFour}`
  }

  return (
    <div
      className={`
        bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-200
        transition-all duration-200 hover:shadow-md
        ${card.isActive ? '' : 'opacity-60'}
      `}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl md:text-3xl">{getBrandIcon(card.brand)}</span>
          <div>
            <h3 className="text-base md:text-lg font-semibold text-gray-900">
              {card.name}
            </h3>
            <p className="text-xs md:text-sm text-gray-500">{card.brand}</p>
          </div>
        </div>
        
        <div
          className={`
            px-2 md:px-3 py-1 rounded-full text-xs font-medium
            ${card.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}
          `}
        >
          {card.isActive ? 'Ativo' : 'Inativo'}
        </div>
      </div>

      <div className="mb-4">
        <p className="text-xs text-gray-500 mb-1">Número do cartão</p>
        <p className="text-sm md:text-base font-mono text-gray-900">
          {maskCardNumber(card.number)}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
        <div>
          <p className="text-xs text-gray-500 mb-1">Limite</p>
          <p className="text-sm md:text-base font-semibold text-gray-900">
            {formatCurrency(card.limit)}
          </p>
        </div>
        
        <div>
          <p className="text-xs text-gray-500 mb-1">Disponível</p>
          <p className="text-sm md:text-base font-semibold text-lime-600">
            {formatCurrency(card.availableLimit)}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-4">
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-lime-500 transition-all duration-300"
            style={{
              width: `${(card.availableLimit / card.limit) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  )
}
