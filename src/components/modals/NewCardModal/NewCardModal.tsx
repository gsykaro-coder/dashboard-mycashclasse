import { useState } from 'react'

interface NewCardModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function NewCardModal({ isOpen, onClose }: NewCardModalProps) {
  const [accountType, setAccountType] = useState<'bank' | 'card'>('card')
  const [formData, setFormData] = useState({
    nickname: '',
    bank: 'XP',
    totalLimit: 'R$ 0,00',
    closingDay: 'Dia',
    lastDigits: '**** 5843',
    responsible: 'Familiar',
    dueDay: 'Dia',
    color: '#000000',
  })

  const colors = ['#000000', '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-[var(--shadow-lg)]">
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
                Novo cartão
              </h2>
              <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                Adicione um novo cartão de crédito
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

          {/* Form Fields - Two Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                  Apelido do cartão
                </label>
                <input
                  type="text"
                  value={formData.nickname}
                  onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                  placeholder="Ex: XP black"
                  className="w-full px-4 py-3 border-2 border-[var(--border-color)] rounded-[var(--radius-md)] text-[var(--color-text)] placeholder-[var(--color-text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                  Banco
                </label>
                <input
                  type="text"
                  value={formData.bank}
                  onChange={(e) => setFormData({ ...formData, bank: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-[var(--border-color)] rounded-[var(--radius-md)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                  Limite total
                </label>
                <input
                  type="text"
                  value={formData.totalLimit}
                  onChange={(e) => setFormData({ ...formData, totalLimit: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-[var(--border-color)] rounded-[var(--radius-md)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                  Fechamento
                </label>
                <select
                  value={formData.closingDay}
                  onChange={(e) => setFormData({ ...formData, closingDay: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-[var(--border-color)] rounded-[var(--radius-md)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent appearance-none bg-[var(--color-surface)]"
                >
                  <option value="Dia">Dia</option>
                </select>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                  Número final
                </label>
                <input
                  type="text"
                  value={formData.lastDigits}
                  onChange={(e) => setFormData({ ...formData, lastDigits: e.target.value })}
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

              <div>
                <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                  Vencimento
                </label>
                <select
                  value={formData.dueDay}
                  onChange={(e) => setFormData({ ...formData, dueDay: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-[var(--border-color)] rounded-[var(--radius-md)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent appearance-none bg-[var(--color-surface)]"
                >
                  <option value="Dia">Dia</option>
                </select>
              </div>
            </div>
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
                // TODO: Salvar cartão
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
