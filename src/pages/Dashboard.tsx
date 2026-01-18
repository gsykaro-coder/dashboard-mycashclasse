export default function Dashboard() {
  return (
    <div className="py-6 md:py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
        Dashboard
      </h1>
      
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Summary Cards */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Saldo Total</p>
          <p className="text-2xl font-bold text-gray-900">R$ 0,00</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Receitas</p>
          <p className="text-2xl font-bold text-green-600">R$ 0,00</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Despesas</p>
          <p className="text-2xl font-bold text-red-600">R$ 0,00</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Total</p>
          <p className="text-2xl font-bold text-gray-900">R$ 0,00</p>
        </div>
      </div>

      {/* Gráficos e Lista de Transações Recentes */}
      <div className="mt-6 md:mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Gráficos</h2>
          <p className="text-gray-600">Gráficos serão implementados aqui</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Transações Recentes
          </h2>
          <p className="text-gray-600">Lista de transações será implementada aqui</p>
        </div>
      </div>
    </div>
  )
}
