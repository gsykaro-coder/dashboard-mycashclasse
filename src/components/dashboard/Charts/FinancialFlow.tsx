interface FinancialFlowProps {
  className?: string
}

interface FlowData {
  category: string
  receita: number
  despesas: number
  total: number
}

export default function FinancialFlow({ className = '' }: FinancialFlowProps) {
  // Dados mockados conforme Figma
  const flowData: FlowData[] = [
    { category: 'R$ 12.500', receita: 5000, despesas: 7500, total: 12500 },
    { category: 'R$ 12.500', receita: 7500, despesas: 5000, total: 12500 },
    { category: 'R$ 12.500', receita: 7500, despesas: 5000, total: 12500 },
  ]

  const maxValue = 12500

  return (
    <div className={`bg-[var(--color-surface)] p-4 md:p-6 rounded-[var(--radius-md)] shadow-[var(--shadow-sm)] border border-[var(--border-color)] ${className}`}>
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
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          Fluxo financeiro
        </h3>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-400" />
          <span className="text-xs md:text-sm text-[var(--color-text-secondary)]">Receita</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-700" />
          <span className="text-xs md:text-sm text-[var(--color-text-secondary)]">Despesas</span>
        </div>
      </div>

      {/* Chart Container */}
      <div className="space-y-4">
        {flowData.map((item, index) => {
          const despesasPercent = (item.despesas / maxValue) * 100
          const receitaPercent = (item.receita / maxValue) * 100

          return (
            <div key={index} className="flex items-center gap-4">
              {/* Y-axis Label */}
              <div className="w-24 md:w-32 flex-shrink-0">
                <span className="text-xs md:text-sm text-[var(--color-text-secondary)] font-medium">
                  {item.category}
                </span>
              </div>

              {/* Bar Container */}
              <div className="flex-1 relative">
                <div className="relative h-8 md:h-10 bg-[var(--color-bg)] rounded-[var(--radius-sm)] overflow-hidden">
                  {/* Despesas Segment (Dark Blue - on left) */}
                  <div
                    className="absolute left-0 top-0 h-full bg-blue-700 rounded-l-[var(--radius-sm)]"
                    style={{
                      width: `${despesasPercent}%`,
                    }}
                  />
                  
                  {/* Receita Segment (Light Blue - after despesas) */}
                  <div
                    className="absolute left-0 top-0 h-full bg-blue-400 rounded-r-[var(--radius-sm)]"
                    style={{
                      width: `${receitaPercent}%`,
                      left: `${despesasPercent}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* X-axis Labels */}
      <div className="flex justify-between mt-4 px-0 md:px-24">
        <span className="text-xs text-[var(--color-text-tertiary)]">R$ 12.500</span>
        <span className="text-xs text-[var(--color-text-tertiary)]">R$ 12.500</span>
      </div>
    </div>
  )
}
