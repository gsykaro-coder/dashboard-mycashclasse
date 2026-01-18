import Chart from './Chart'

export default function Charts() {
  return (
    <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2 w-full">
      <Chart
        title="Receitas vs Despesas"
        type="line"
      />
      
      <Chart
        title="Despesas por Categoria"
        type="pie"
      />
    </div>
  )
}
