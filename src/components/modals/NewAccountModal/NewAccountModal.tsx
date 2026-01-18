import { useState } from 'react'

interface NewAccountModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function NewAccountModal({ isOpen, onClose }: NewAccountModalProps) {
  const [accountType, setAccountType] = useState<'bank' | 'card'>('bank')
  const [formData, setFormData] = useState({
    name: '',
    type: 'Conta corrente',
    initialBalance: 'R$ 0,00',
    responsible: 'Familiar',
    color: '#000000',
  })

  const colors = ['#000000', '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899']

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-[var(--shadow-lg)]">
        {/* Header */}
        <div className="sticky top-0 bg-[var(--color-surface)] border-b border-[var(--border-color)] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
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
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[var(--color-text)]">
                Nova conta
              </h2>
              <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                Adicione uma nova conta bancária
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-[var(--radius-sm)] hover:bg-[var(--color-surface-hover)] transition-colors"
            aria-label="Fechar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-[var(--color-text)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Account Type Selector */}
          <div className="flex gap-4">
            <button
              onClick={() => setAccountType('bank')}
              className={`
                flex-1 py-3 px-4 rounded-[var(--radius-md)] font-semibold transition-colors
                ${
                  accountType === 'bank'
                    ? 'bg-[var(--color-text)] text-white'
                    : 'bg-[var(--color-surface)] border-2 border-[var(--border-color)] text-[var(--color-text)]'
                }
              `}
            >
              Conta bancária
            </button>
            <button
              onClick={() => setAccountType('card')}
              className={`
                flex-1 py-3 px-4 rounded-[var(--radius-md)] font-semibold transition-colors
                ${
                  accountType === 'card'
                    ? 'bg-[var(--color-text)] text-white'
                    : 'bg-[var(--color-surface)] border-2 border-[var(--border-color)] text-[var(--color-text)]'
                }
              `}
            >
              Cartão de crédito
            </button>
          </div>

          {/* Form Fields */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
              Nome da conta
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ex: Conta corrente Nubank"
              className="w-full px-4 py-3 border-2 border-[var(--border-color)] rounded-[var(--radius-md)] text-[var(--color-text)] placeholder-[var(--color-text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
              Tipo
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-4 py-3 border-2 border-[var(--border-color)] rounded-[var(--radius-md)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent appearance-none bg-[var(--color-surface)]"
            >
              <option value="Conta corrente">Conta corrente</option>
              <option value="Conta poupança">Conta poupança</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
              Saldo inicial
            </label>
            <input
              type="text"
              value={formData.initialBalance}
              onChange={(e) => setFormData({ ...formData, initialBalance: e.target.value })}
              className="w-full px-4 py-3 border-2 border-[var(--border-color)] rounded-[var(--radius-md)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-text)] mb-2 flex items-center justify-between">
              <span>Responsável</span>
              <button className="text-xs text-[var(--color-primary)] hover:underline">
                + Novo membro
              </button>
            </label>
            <select
              value={formData.responsible}
              onChange={(e) => setFormData({ ...formData, responsible: e.target.value })}
              className="w-full px-4 py-3 border-2 border-[var(--border-color)] rounded-[var(--radius-md)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent appearance-none bg-[var(--color-surface)]"
            >
              <option value="Familiar">Familiar</option>
            </select>
          </div>

          {/* Cor de identificação */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-text)] mb-3">
              Cor de identificação
            </label>
            <div className="flex gap-3">
              {colors.map((color, index) => (
                <button
                  key={index}
                  onClick={() => setFormData({ ...formData, color })}
                  className={`
                    w-10 h-10 rounded-full border-2 transition-all
                    ${
                      formData.color === color
                        ? 'border-[var(--color-text)] scale-110'
                        : 'border-[var(--border-color)]'
                    }
                  `}
                  style={{ backgroundColor: color }}
                  aria-label={`Cor ${index + 1}`}
                >
                  {formData.color === color && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-white m-auto"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-end pt-4 border-t border-[var(--border-color)]">
            <button
              onClick={onClose}
              className="px-6 py-3 border-2 border-[var(--border-color)] rounded-[var(--radius-md)] font-semibold text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                // TODO: Salvar conta
                onClose()
              }}
              className="px-6 py-3 bg-[var(--color-text)] text-white rounded-[var(--radius-md)] font-semibold hover:opacity-90 transition-opacity"
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
