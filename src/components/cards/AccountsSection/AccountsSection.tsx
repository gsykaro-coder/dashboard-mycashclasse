import { useState } from 'react'
import NewAccountModal from '../../modals/NewAccountModal/NewAccountModal'

interface BankAccount {
  id: string
  name: string
  type: string
  balance: string
  updatedAt: string
  color?: string
}

interface AccountsSectionProps {
  accounts: BankAccount[]
  onAddAccount?: () => void
}

export default function AccountsSection({ accounts }: AccountsSectionProps) {
  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false)

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
    <>
      <div>
        <h2 className="text-lg md:text-xl font-semibold text-[var(--color-text)] mb-4">
          Contas bancárias
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {accounts.map((account) => (
            <div
              key={account.id}
              className="bg-[var(--color-surface)] border border-[var(--border-color)] rounded-[var(--radius-md)] p-4 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg ${getLogoColor(account.name)} flex items-center justify-center text-white font-bold text-sm`}>
                    {getLogoInitials(account.name)}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--color-text)]">
                      {account.name}
                    </h3>
                    <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
                      {account.type}
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
                <p className="text-lg font-bold text-[var(--color-text)] mb-1">
                  {account.balance}
                </p>
                <p className="text-xs text-[var(--color-text-secondary)]">
                  Saldo atualizado {account.updatedAt}
                </p>
              </div>
            </div>
          ))}

          {/* Add New Account Button */}
          <button
            onClick={() => setIsNewAccountModalOpen(true)}
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
              Nova conta
            </span>
          </button>
        </div>
      </div>

      <NewAccountModal
        isOpen={isNewAccountModalOpen}
        onClose={() => setIsNewAccountModalOpen(false)}
      />
    </>
  )
}
