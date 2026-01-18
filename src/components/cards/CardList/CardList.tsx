import { useEffect, useState } from 'react'
import { Card } from '../../../types'
import CardItem from '../CardItem/CardItem'

export default function CardList() {
  const [cards, setCards] = useState<Card[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // TODO: Buscar cartões do Supabase
    // Por enquanto, dados mockados
    const mockCards: Card[] = [
      {
        id: '1',
        name: 'Cartão Principal',
        number: '4532123456789012',
        brand: 'Visa',
        limit: 5000.0,
        availableLimit: 3200.0,
        isActive: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        name: 'Cartão Empresarial',
        number: '5555123456789012',
        brand: 'Mastercard',
        limit: 10000.0,
        availableLimit: 7500.0,
        isActive: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: '3',
        name: 'Cartão de Emergência',
        number: '4000123456789012',
        brand: 'Visa',
        limit: 2000.0,
        availableLimit: 2000.0,
        isActive: false,
        createdAt: new Date().toISOString(),
      },
    ]

    setTimeout(() => {
      setCards(mockCards)
      setIsLoading(false)
    }, 500)
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-sm text-gray-500">Carregando cartões...</p>
      </div>
    )
  }

  if (cards.length === 0) {
    return (
      <div className="bg-white p-8 md:p-12 rounded-lg shadow-sm border border-gray-200 text-center">
        <p className="text-4xl mb-4">💳</p>
        <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
          Nenhum cartão cadastrado
        </h3>
        <p className="text-sm md:text-base text-gray-600 mb-6">
          Adicione seu primeiro cartão para começar
        </p>
        <button className="px-4 md:px-6 py-2 md:py-3 bg-lime-600 text-white rounded-lg font-medium hover:bg-lime-700 transition-colors">
          Adicionar Cartão
        </button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {cards.map((card) => (
        <CardItem key={card.id} card={card} />
      ))}
    </div>
  )
}
