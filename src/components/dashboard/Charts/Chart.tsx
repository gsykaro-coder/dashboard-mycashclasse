interface ChartProps {
  title: string
  type?: 'line' | 'bar' | 'pie'
  data?: unknown
  className?: string
}

export default function Chart({ title, type = 'line', className = '' }: ChartProps) {
  return (
    <div className={`bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-200 ${className}`}>
      <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4">
        {title}
      </h3>
      
      <div className="h-48 md:h-64 flex items-center justify-center bg-gray-50 rounded-lg">
        <div className="text-center text-gray-500">
          <p className="text-sm md:text-base mb-2">📊 Gráfico {type}</p>
          <p className="text-xs md:text-sm">
            Integração com biblioteca de gráficos será implementada aqui
          </p>
          <p className="text-xs text-gray-400 mt-2">
            (Chart.js / Recharts / Victory)
          </p>
        </div>
      </div>
    </div>
  )
}
