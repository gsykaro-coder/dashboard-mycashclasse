import { useState } from 'react'

interface NewMemberModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function NewMemberModal({ isOpen, onClose }: NewMemberModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    role: 'Membro',
    income: 'R$ 0,00',
  })

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] w-full max-w-md shadow-[var(--shadow-lg)]">
        {/* Header */}
        <div className="border-b border-[var(--border-color)] px-6 py-4 flex items-center justify-between">
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
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[var(--color-text)]">
                Novo familiar
              </h2>
              <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                Adicione alguém para participar do controle financeiro.
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
          {/* Nome */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
              Nome
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Nome do familiar"
              className="w-full px-4 py-3 border-2 border-[var(--border-color)] rounded-[var(--radius-md)] text-[var(--color-text)] placeholder-[var(--color-text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
            />
          </div>

          {/* Função / Parentesco */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
              Função / Parentesco
            </label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-4 py-3 border-2 border-[var(--border-color)] rounded-[var(--radius-md)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent appearance-none bg-[var(--color-surface)]"
            >
              <option value="Membro">Membro</option>
              <option value="Cônjuge">Cônjuge</option>
              <option value="Filho(a)">Filho(a)</option>
            </select>
          </div>

          {/* Renda */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
              Renda
            </label>
            <input
              type="text"
              value={formData.income}
              onChange={(e) => setFormData({ ...formData, income: e.target.value })}
              className="w-full px-4 py-3 border-2 border-[var(--border-color)] rounded-[var(--radius-md)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
            />
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
                // TODO: Salvar familiar
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
