import { useState } from 'react'

interface NewTransactionModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function NewTransactionModal({ isOpen, onClose }: NewTransactionModalProps) {
  const [transactionType, setTransactionType] = useState<'income' | 'expense'>('expense')
  const [formData, setFormData] = useState({
    value: '',
    date: '17/01/2026',
    description: '',
    category: '',
    responsible: 'Familiar',
    account: 'Cartão Nubank',
    installments: 'À vista (1x)',
    isRecurring: false,
  })

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-[var(--shadow-lg)]">
        {/* Header */}
        <div className="sticky top-0 bg-[var(--color-surface)] border-b border-[var(--border-color)] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-[var(--radius-sm)] hover:bg-[var(--color-surface-hover)] transition-colors"
              aria-label="Voltar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-[var(--color-text)]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[var(--color-text)]">
                Nova transação
              </h2>
              <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                Registre entradas e saídas para manter seu controle.
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
          {/* Transaction Type Selector */}
          <div className="flex gap-4">
            <button
              onClick={() => setTransactionType('income')}
              className={`
                flex-1 py-3 px-4 rounded-[var(--radius-md)] font-semibold transition-colors
                ${
                  transactionType === 'income'
                    ? 'bg-[var(--color-text)] text-white'
                    : 'bg-[var(--color-surface)] border-2 border-[var(--border-color)] text-[var(--color-text)]'
                }
              `}
            >
              Receita
            </button>
            <button
              onClick={() => setTransactionType('expense')}
              className={`
                flex-1 py-3 px-4 rounded-[var(--radius-md)] font-semibold transition-colors
                ${
                  transactionType === 'expense'
                    ? 'bg-[var(--color-text)] text-white'
                    : 'bg-[var(--color-surface)] border-2 border-[var(--border-color)] text-[var(--color-text)]'
                }
              `}
            >
              Despesas
            </button>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Valor da transação */}
            <div>
              <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                Valor da transação
              </label>
              <input
                type="text"
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                placeholder="R$ 0,00"
                className="w-full px-4 py-3 border-2 border-[var(--border-color)] rounded-[var(--radius-md)] text-[var(--color-text)] placeholder-[var(--color-text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
              />
            </div>

            {/* Data */}
            <div>
              <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                Data
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.date}
                  readOnly
                  className="w-full px-4 py-3 pr-10 border-2 border-[var(--border-color)] rounded-[var(--radius-md)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
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
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Descrição */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
              Descrição
            </label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="EX: Supermercado Semanal"
              className="w-full px-4 py-3 border-2 border-[var(--border-color)] rounded-[var(--radius-md)] text-[var(--color-text)] placeholder-[var(--color-text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
            />
          </div>

          {/* Categoria */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
              Categoria
            </label>
            <div className="flex gap-2">
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="flex-1 px-4 py-3 border-2 border-[var(--border-color)] rounded-[var(--radius-md)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent appearance-none bg-[var(--color-surface)]"
              >
                <option value="">Selecione a categoria</option>
              </select>
              <button
                className="px-4 py-3 bg-[var(--color-text)] text-white rounded-[var(--radius-md)] font-semibold hover:opacity-90 transition-opacity"
                aria-label="Nova categoria"
              >
                + Nova categoria
              </button>
            </div>
          </div>

          {/* Responsável e Conta/Cartão */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Responsável */}
            <div>
              <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                Responsável
              </label>
              <select
                value={formData.responsible}
                onChange={(e) => setFormData({ ...formData, responsible: e.target.value })}
                className="w-full px-4 py-3 border-2 border-[var(--border-color)] rounded-[var(--radius-md)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent appearance-none bg-[var(--color-surface)]"
              >
                <option value="Familiar">Familiar</option>
              </select>
            </div>

            {/* Conta/Cartão */}
            <div>
              <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                Conta / cartão
              </label>
              <select
                value={formData.account}
                onChange={(e) => setFormData({ ...formData, account: e.target.value })}
                className="w-full px-4 py-3 border-2 border-[var(--border-color)] rounded-[var(--radius-md)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent appearance-none bg-[var(--color-surface)]"
              >
                <option value="Cartão Nubank">Cartão Nubank</option>
                <option value="Conta corrente">Conta corrente</option>
              </select>
            </div>
          </div>

          {/* Parcelas */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
              Parcelas
            </label>
            <select
              value={formData.installments}
              onChange={(e) => setFormData({ ...formData, installments: e.target.value })}
              className="w-full px-4 py-3 border-2 border-[var(--border-color)] rounded-[var(--radius-md)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent appearance-none bg-[var(--color-surface)]"
            >
              <option value="À vista (1x)">À vista (1x)</option>
            </select>
          </div>

          {/* Despesa recorrente */}
          {transactionType === 'expense' && (
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="recurring"
                checked={formData.isRecurring}
                onChange={(e) => setFormData({ ...formData, isRecurring: e.target.checked })}
                className="mt-1 w-5 h-5 border-2 border-[var(--border-color)] rounded-[var(--radius-sm)] text-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]"
              />
              <div>
                <label htmlFor="recurring" className="block text-sm font-medium text-[var(--color-text)] cursor-pointer">
                  Despesa recorrente
                </label>
                <p className="text-xs text-[var(--color-text-secondary)] mt-1">
                  Contas que se repetem todo mês (Netflix, Spotify, Academia, etc).
                </p>
              </div>
            </div>
          )}

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
                // TODO: Salvar transação
                onClose()
              }}
              className="px-6 py-3 bg-[var(--color-text)] text-white rounded-[var(--radius-md)] font-semibold hover:opacity-90 transition-opacity"
            >
              Salvar transação
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
