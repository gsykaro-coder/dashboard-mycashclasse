import SummaryCard from './SummaryCard'

export default function SummaryCards() {

  // Ícones SVG conforme Figma
  const DollarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-full h-full">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )

  const BriefcaseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-full h-full">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  )

  const ArrowDownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-full h-full">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
    </svg>
  )

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
      {/* Saldo total - Ícone dollar verde */}
      <SummaryCard
        title="Saldo total"
        value="R$4.000,00"
        icon={<DollarIcon />}
        variant="success"
        iconColor="green"
      />
      
      {/* Saldo total - Ícone briefcase azul */}
      <SummaryCard
        title="Saldo total"
        value="R$4.000,00"
        icon={<BriefcaseIcon />}
        variant="default"
        iconColor="blue"
      />
      
      {/* Despesas - Ícone arrow down laranja */}
      <SummaryCard
        title="Despesas"
        value="R$4.000,00"
        icon={<ArrowDownIcon />}
        variant="error"
        iconColor="orange"
      />
    </div>
  )
}
