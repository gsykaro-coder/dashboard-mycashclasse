import ProgressCard from './ProgressCard'

export default function ProgressCards() {
  // Dados mockados conforme Figma (ordem: Aluguel, Alimentação, Moradia, Compras)
  const progressData = [
    { label: 'Aluguel', value: 'R$4.000,00', progress: 25 },
    { label: 'Alimentação', value: 'R$8.300,00', progress: 100 },
    { label: 'Moradia', value: 'R$6.500,00', progress: 50 },
    { label: 'Compras', value: 'R$2.900,00', progress: 75 },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
      {progressData.map((item, index) => (
        <ProgressCard
          key={index}
          label={item.label}
          value={item.value}
          progress={item.progress}
        />
      ))}
    </div>
  )
}
