import { useState } from 'react'
import CardItem from '../CardItem/CardItem'
import NewCardModal from '../../modals/NewCardModal/NewCardModal'
import { Card } from '../../../types'

interface CardsSectionProps {
  cards: Card[]
  onAddCard?: () => void
}

export default function CardsSection({ cards }: CardsSectionProps) {
  const [isNewCardModalOpen, setIsNewCardModalOpen] = useState(false)

  return (
    <>
      <div className="mb-6">
        <h2 className="text-lg md:text-xl font-semibold text-[var(--color-text)] mb-4">
          Cartões
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((card) => (
            <CardItem key={card.id} card={card} />
          ))}
          
          {/* Add New Card Button */}
          <button
            onClick={() => setIsNewCardModalOpen(true)}
            className="bg-[var(--color-surface)] border-2 border-dashed border-[var(--border-color)] rounded-[var(--radius-md)] p-6 flex flex-col items-center justify-center gap-3 hover:border-[var(--color-primary)] hover:bg-[var(--color-surface-hover)] transition-all min-h-[160px]"
          >
            <div className="w-12 h-12 rounded-full bg-[var(--color-primary)] flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
            <span className="text-sm font-semibold text-[var(--color-text)]">
              Novo cartão
            </span>
          </button>
        </div>
      </div>

      <NewCardModal
        isOpen={isNewCardModalOpen}
        onClose={() => setIsNewCardModalOpen(false)}
      />
    </>
  )
}
