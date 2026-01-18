import { useState } from 'react'
import CardsSection from '../components/cards/CardsSection/CardsSection'
import AccountsSection from '../components/cards/AccountsSection/AccountsSection'
import { Card } from '../types'

export default function Cards() {
  // Dados mockados conforme Figma
  const [cards] = useState<Card[]>([
    {
      id: '1',
      name: 'Nubank',
      number: '5897',
      brand: 'Mastercard',
      limit: 10000,
      availableLimit: 4755,
      isActive: true,
      dueDate: '21',
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Inter',
      number: '5897',
      brand: 'Visa',
      limit: 5000,
      availableLimit: 3500,
      isActive: true,
      dueDate: '12',
      createdAt: new Date().toISOString(),
    },
    {
      id: '3',
      name: 'XP',
      number: '5897',
      brand: 'Mastercard',
      limit: 8000,
      availableLimit: 7261.03,
      isActive: true,
      dueDate: '17',
      createdAt: new Date().toISOString(),
    },
  ])

  const [accounts] = useState([
    {
      id: '1',
      name: 'Nubank conta',
      type: 'Conta corrente',
      balance: 'R$ 2.598,25',
      updatedAt: '10/01/2026',
    },
    {
      id: '2',
      name: 'XP - CDB investido',
      type: 'Investimento',
      balance: 'R$ 27.598,37',
      updatedAt: '10/01/2026',
    },
  ])

  return (
    <div className="py-6 md:py-8 w-full">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <div className="flex items-center gap-3 mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-[var(--color-orange-500)]"
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
          <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-text)]">
            Cartões
          </h1>
        </div>
        <p className="text-sm md:text-base text-[var(--color-text-secondary)]">
          Gerencie seus cartões e contas bancárias
        </p>
      </div>
      
      {/* Cards Section */}
      <CardsSection cards={cards} />

      {/* Accounts Section */}
      <AccountsSection accounts={accounts} />
    </div>
  )
}
