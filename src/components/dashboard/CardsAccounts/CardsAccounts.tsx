interface CardAccount {
  id: string
  name: string
  logo: string
  logoColor: string
  balance: string
  dueDate: string
  cardNumber: string
}

export default function CardsAccounts() {
  // Dados mockados conforme Figma
  const cards: CardAccount[] = [
    {
      id: '1',
      name: 'Nubank',
      logo: 'nu',
      logoColor: 'purple',
      balance: 'R$5.500,00',
      dueDate: 'Vence dia 30',
      cardNumber: '**** 5897',
    },
    {
      id: '2',
      name: 'Inter',
      logo: 'inter',
      logoColor: 'orange',
      balance: 'R$10.500,00',
      dueDate: 'Vence dia 30',
      cardNumber: '**** 8475',
    },
    {
      id: '3',
      name: 'XP',
      logo: 'xp',
      logoColor: 'black',
      balance: 'R$15.300,00',
      dueDate: 'Vence dia 30',
      cardNumber: '**** 3215',
    },
  ]

  const getLogoStyle = (color: string) => {
    const colors: Record<string, string> = {
      purple: 'bg-purple-500',
      orange: 'bg-[var(--color-orange-500)]',
      black: 'bg-gray-900',
    }
    return colors[color] || 'bg-gray-500'
  }

  const getLogoText = (logo: string) => {
    if (logo === 'nu') return 'nu'
    if (logo === 'xp') return 'XP'
    return logo.substring(0, 2).toUpperCase()
  }

  return (
    <div className="bg-[var(--color-surface)] p-4 md:p-6 rounded-[var(--radius-md)] shadow-[var(--shadow-sm)] border border-[var(--border-color)] w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base md:text-lg font-semibold text-[var(--color-text)] flex items-center gap-2">
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
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            />
          </svg>
          Cartões/contas
        </h3>
        <div className="flex items-center gap-2">
          <button
            className="w-8 h-8 rounded-full border-2 border-[var(--color-orange-500)] flex items-center justify-center hover:bg-[var(--color-primary-light)] transition-colors"
            aria-label="Adicionar cartão"
            title="Adicionar cartão"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-[var(--color-orange-500)]"
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
          </button>
          <button
            className="w-8 h-8 rounded-full border-2 border-[var(--color-orange-500)] flex items-center justify-center hover:bg-[var(--color-primary-light)] transition-colors"
            aria-label="Ver mais"
            title="Ver mais"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-[var(--color-orange-500)]"
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

      {/* Cards List */}
      <div className="space-y-3">
        {cards.map((card) => (
          <div
            key={card.id}
            className="flex items-center justify-between p-3 rounded-[var(--radius-sm)] hover:bg-[var(--color-surface-hover)] transition-colors"
          >
            <div className="flex items-center gap-3">
              {/* Logo */}
              <div
                className={`w-10 h-10 rounded-lg ${getLogoStyle(card.logoColor)} flex items-center justify-center text-white font-bold text-sm`}
              >
                {getLogoText(card.logo)}
              </div>

              {/* Card Info */}
              <div>
                <p className="text-sm font-semibold text-[var(--color-text)]">
                  {card.name}
                </p>
                <p className="text-xs text-[var(--color-text-secondary)]">
                  {card.balance}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <p className="text-xs text-[var(--color-text-secondary)]">
                {card.dueDate}
              </p>
              <p className="text-xs text-[var(--color-text-tertiary)] font-mono">
                {card.cardNumber}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
