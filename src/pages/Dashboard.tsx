import SummaryCards from '../components/dashboard/SummaryCards/SummaryCards'
import Charts from '../components/dashboard/Charts/Charts'
import RecentTransactions from '../components/dashboard/RecentTransactions/RecentTransactions'

export default function Dashboard() {
  return (
    <div className="py-6 md:py-8 w-full">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
        Dashboard
      </h1>
      
      {/* Summary Cards */}
      <SummaryCards />

      {/* Gráficos e Transações Recentes */}
      <div className="mt-6 md:mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <Charts />
        <RecentTransactions />
      </div>
    </div>
  )
}
