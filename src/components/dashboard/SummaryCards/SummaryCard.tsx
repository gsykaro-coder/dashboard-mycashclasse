interface SummaryCardProps {
  title: string
  value: string
  icon?: string | React.ReactNode
  trend?: {
    value: string
    isPositive: boolean
  }
  variant?: 'default' | 'primary' | 'success' | 'error'
  iconColor?: 'green' | 'blue' | 'orange'
}

export default function SummaryCard({
  title,
  value,
  icon,
  trend,
  variant = 'default',
  iconColor = 'green',
}: SummaryCardProps) {
  const variantStyles = {
    default: 'text-[var(--color-text)]',
    primary: 'text-[var(--color-primary)]',
    success: 'text-[var(--color-success)]',
    error: 'text-[var(--color-error)]',
  }

  const iconColorStyles = {
    green: 'text-[var(--color-success)]',
    blue: 'text-blue-600',
    orange: 'text-[var(--color-primary)]',
  }

  return (
    <div className="bg-[var(--color-surface)] p-4 md:p-6 rounded-[var(--radius-md)] shadow-[var(--shadow-sm)] border border-[var(--border-color)] w-full flex flex-col items-center">
      {/* Icon */}
      {icon && (
        <div className={`mb-3 ${typeof icon === 'string' ? 'text-3xl md:text-4xl' : 'w-12 h-12 md:w-14 md:h-14'}`}>
          {typeof icon === 'string' ? (
            <span className={iconColorStyles[iconColor]}>{icon}</span>
          ) : (
            <div className={iconColorStyles[iconColor]}>{icon}</div>
          )}
        </div>
      )}
      
      {/* Title */}
      <p className="text-xs md:text-sm text-[var(--color-text-secondary)] font-medium mb-2 text-center">
        {title}
      </p>
      
      {/* Value */}
      <p className={`text-lg md:text-xl font-bold mb-1 ${variantStyles[variant]} text-center`}>
        {value}
      </p>
      
      {trend && (
        <div
          className={`
            flex items-center gap-1 text-xs md:text-sm mt-1
            ${trend.isPositive ? 'text-[var(--color-success)]' : 'text-[var(--color-error)]'}
          `}
        >
          <span>{trend.isPositive ? '↑' : '↓'}</span>
          <span>{trend.value}</span>
        </div>
      )}
    </div>
  )
}
