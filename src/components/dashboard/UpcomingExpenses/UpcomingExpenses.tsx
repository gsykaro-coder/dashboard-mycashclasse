interface UpcomingExpense {
  id: string
  description: string
  amount: string
  installment: string
  dueDate: string
}

export default function UpcomingExpenses() {
  // Dados mockados conforme Figma
  const expenses: UpcomingExpense[] = [
    {
      id: '1',
      description: 'Conta de luz',
      amount: 'R$5.500,00',
      installment: 'R$154,00',
      dueDate: 'Vence dia 30',
    },
    {
      id: '2',
      description: 'Conta de luz',
      amount: 'R$5.500,00',
      installment: 'R$154,00',
      dueDate: 'Vence dia 30',
    },
    {
      id: '3',
      description: 'Conta de luz',
      amount: 'R$5.500,00',
      installment: 'R$154,00',
      dueDate: 'Vence dia 30',
    },
  ]

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
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          Próximas despesas
        </h3>
        <button
          className="w-8 h-8 rounded-full border-2 border-[var(--color-orange-500)] flex items-center justify-center hover:bg-[var(--color-primary-light)] transition-colors"
          aria-label="Adicionar despesa"
          title="Adicionar despesa"
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
      </div>

      {/* Expenses List */}
      <div className="space-y-3">
        {expenses.map((expense) => (
          <div
            key={expense.id}
            className="flex items-center justify-between p-3 rounded-[var(--radius-sm)] hover:bg-[var(--color-surface-hover)] transition-colors"
          >
            <div className="flex items-center gap-3 flex-1">
              {/* Checkmark Icon */}
              <div className="w-6 h-6 rounded-full bg-[var(--color-success)] flex items-center justify-center flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              {/* Expense Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[var(--color-text)] truncate">
                  {expense.description}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-xs text-[var(--color-text-secondary)]">
                    {expense.amount}
                  </p>
                  <span className="text-xs text-[var(--color-text-tertiary)]">•</span>
                  <p className="text-xs text-[var(--color-text-secondary)]">
                    {expense.installment}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-shrink-0 ml-3">
              <p className="text-xs text-[var(--color-text-secondary)] text-right">
                {expense.dueDate}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
