interface ChartProps {
  title: string
  type?: 'line' | 'bar' | 'pie'
  data?: unknown
  className?: string
}

export default function Chart({ title, type = 'line', className = '' }: ChartProps) {
  return (
    <div className={`bg-[var(--color-surface)] p-4 md:p-6 rounded-[var(--radius-md)] shadow-[var(--shadow-sm)] border border-[var(--border-color)] ${className}`}>
      <h3 className="text-base md:text-lg font-semibold text-[var(--color-text)] mb-4">
        {title}
      </h3>
      
      <div className="h-48 md:h-64 flex items-center justify-center bg-[var(--color-bg)] rounded-[var(--radius-md)]">
        <div className="text-center text-[var(--color-text-secondary)]">
          <p className="text-sm md:text-base mb-2">📊 Gráfico {type}</p>
          <p className="text-xs md:text-sm">
            Integração com biblioteca de gráficos será implementada aqui
          </p>
          <p className="text-xs text-[var(--color-text-tertiary)] mt-2">
            (Chart.js / Recharts / Victory)
          </p>
        </div>
      </div>
    </div>
  )
}
