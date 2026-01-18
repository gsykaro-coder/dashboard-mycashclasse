import ProgressCards from '../components/dashboard/ProgressCards/ProgressCards'
import SummaryCards from '../components/dashboard/SummaryCards/SummaryCards'
import Charts from '../components/dashboard/Charts/Charts'
import CardsAccounts from '../components/dashboard/CardsAccounts/CardsAccounts'
import UpcomingExpenses from '../components/dashboard/UpcomingExpenses/UpcomingExpenses'
import DetailedStatement from '../components/dashboard/DetailedStatement/DetailedStatement'

export default function Dashboard() {
  return (
    <div className="py-6 md:py-8 w-full">
      <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-text)] mb-6">
        Dashboard
      </h1>
      
      {/* Top Section: Progress Cards (4 cards circulares) - Largura total */}
      <div className="mb-6 md:mb-8">
        <ProgressCards />
      </div>

      {/* Second Row: Summary Cards (3 cards horizontais) */}
      <div className="mb-6 md:mb-8">
        <SummaryCards />
      </div>

      {/* Middle Section - Cartões/contas e Próximas despesas lado a lado */}
      <div className="mb-6 md:mb-8 grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Left: Cartões/contas */}
        <CardsAccounts />

        {/* Right: Próximas despesas */}
        <UpcomingExpenses />
      </div>

      {/* Bottom Section - Fluxo financeiro e Extrato detalhado empilhados verticalmente */}
      <div className="space-y-4 md:space-y-6">
        {/* Financial Flow Chart */}
        <Charts />

        {/* Detailed Statement Table */}
        <DetailedStatement />
      </div>
    </div>
  )
}
