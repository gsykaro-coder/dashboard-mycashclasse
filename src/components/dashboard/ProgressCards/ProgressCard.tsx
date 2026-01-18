interface ProgressCardProps {
  label: string
  value: string
  progress: number // 0-100
  className?: string
}

export default function ProgressCard({
  label,
  value,
  progress,
  className = '',
}: ProgressCardProps) {
  const radius = 40
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (progress / 100) * circumference

  const formatCurrency = (value: string) => {
    // Se já estiver formatado, retorna como está
    if (value.includes('R$')) return value
    // Caso contrário, formata
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(parseFloat(value))
  }

  return (
    <div
      className={`bg-[var(--color-surface)] p-4 md:p-6 rounded-[var(--radius-md)] shadow-[var(--shadow-sm)] border border-[var(--border-color)] flex flex-col items-center justify-center ${className}`}
    >
      {/* Circular Progress */}
      <div className="relative w-24 h-24 md:w-28 md:h-28 mb-4">
        <svg
          className="transform -rotate-90 w-full h-full"
          viewBox="0 0 100 100"
        >
          {/* Background Circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="var(--color-bg)"
            strokeWidth="8"
          />
          {/* Progress Circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="var(--lime-500)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-300 ease-in-out"
          />
        </svg>
        {/* Progress Text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg md:text-xl font-bold text-[var(--color-text)]">
            {progress}%
          </span>
        </div>
      </div>

      {/* Label */}
      <p className="text-xs md:text-sm text-[var(--color-text-secondary)] font-medium mb-1">
        {label}
      </p>

      {/* Value */}
      <p className="text-base md:text-lg font-bold text-[var(--color-text)]">
        {formatCurrency(value)}
      </p>
    </div>
  )
}
