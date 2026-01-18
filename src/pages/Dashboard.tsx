import SummaryCards from '../components/dashboard/SummaryCards/SummaryCards'
import Charts from '../components/dashboard/Charts/Charts'

export default function Dashboard() {
  return (
    <div className="py-6 md:py-8 w-full">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
        Dashboard
      </h1>
      
      {/* Summary Cards */}
      <SummaryCards />

      {/* Gráficos */}
      <div className="mt-6 md:mt-8 w-full">
        <Charts />
      </div>
    </div>
  )
}
