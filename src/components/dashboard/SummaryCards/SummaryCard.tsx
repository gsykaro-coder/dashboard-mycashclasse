interface SummaryCardProps {
  title: string
  value: string
  icon?: string
  trend?: {
    value: string
    isPositive: boolean
  }
  variant?: 'default' | 'primary' | 'success' | 'error'
}

export default function SummaryCard({
  title,
  value,
  icon,
  trend,
  variant = 'default',
}: SummaryCardProps) {
  const variantStyles = {
    default: 'text-gray-900',
    primary: 'text-lime-600',
    success: 'text-green-600',
    error: 'text-red-600',
  }

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-200 w-full">
      <div className="flex items-start justify-between mb-2">
        <p className="text-xs md:text-sm text-gray-600 font-medium">{title}</p>
        {icon && <span className="text-xl md:text-2xl">{icon}</span>}
      </div>
      
      <p className={`text-xl md:text-2xl font-bold mb-1 ${variantStyles[variant]}`}>
        {value}
      </p>
      
      {trend && (
        <div
          className={`
            flex items-center gap-1 text-xs md:text-sm
            ${trend.isPositive ? 'text-green-600' : 'text-red-600'}
          `}
        >
          <span>{trend.isPositive ? '↑' : '↓'}</span>
          <span>{trend.value}</span>
        </div>
      )}
    </div>
  )
}
