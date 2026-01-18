import { useEffect, useState } from 'react'
import SummaryCard from './SummaryCard'

interface SummaryData {
  balance: number
  income: number
  expense: number
  total: number
}

export default function SummaryCards() {
  const [data, setData] = useState<SummaryData>({
    balance: 0,
    income: 0,
    expense: 0,
    total: 0,
  })

  useEffect(() => {
    // TODO: Buscar dados do Supabase
    // Por enquanto, dados mockados
    setData({
      balance: 12500.50,
      income: 15000.00,
      expense: 2499.50,
      total: 15000.00,
    })
  }, [])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 w-full">
      <SummaryCard
        title="Saldo Total"
        value={formatCurrency(data.balance)}
        icon="💰"
        trend={{ value: '12% vs mês anterior', isPositive: true }}
        variant="primary"
      />
      
      <SummaryCard
        title="Receitas"
        value={formatCurrency(data.income)}
        icon="📈"
        trend={{ value: '8% vs mês anterior', isPositive: true }}
        variant="success"
      />
      
      <SummaryCard
        title="Despesas"
        value={formatCurrency(data.expense)}
        icon="📉"
        trend={{ value: '5% vs mês anterior', isPositive: false }}
        variant="error"
      />
      
      <SummaryCard
        title="Total"
        value={formatCurrency(data.total)}
        icon="💳"
        variant="default"
      />
    </div>
  )
}
