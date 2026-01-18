import { useState, useEffect } from 'react'
import { User } from '../../../types'

export default function ProfileForm() {
  const [user, setUser] = useState<User>({
    id: '1',
    name: 'Usuário',
    email: 'usuario@email.com',
    avatar: '',
    createdAt: new Date().toISOString(),
  })

  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    // TODO: Buscar dados do usuário do Supabase
    // Por enquanto, dados mockados
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    // TODO: Salvar dados no Supabase
    setTimeout(() => {
      setIsSaving(false)
      setIsEditing(false)
    }, 1000)
  }

  const handleCancel = () => {
    setIsEditing(false)
    // TODO: Reset form
  }

  if (!isEditing) {
    return (
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm border border-gray-200">
        {/* Avatar Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8 pb-8 border-b border-gray-200">
          <div className="relative">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-4xl md:text-5xl">👤</span>
              )}
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
              {user.name}
            </h2>
            <p className="text-sm md:text-base text-gray-600 mb-4">
              {user.email}
            </p>
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-lime-600 text-white rounded-lg font-medium hover:bg-lime-700 transition-colors text-sm md:text-base"
            >
              Editar Perfil
            </button>
          </div>
        </div>

        {/* Info Display */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
              Nome
            </label>
            <p className="text-sm md:text-base text-gray-900">{user.name}</p>
          </div>

          <div>
            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <p className="text-sm md:text-base text-gray-900">{user.email}</p>
          </div>

          <div>
            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
              Membro desde
            </label>
            <p className="text-sm md:text-base text-gray-900">
              {new Intl.DateTimeFormat('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              }).format(new Date(user.createdAt))}
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-lg shadow-sm border border-gray-200">
      {/* Avatar Section */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8 pb-8 border-b border-gray-200">
        <div className="relative">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-4xl md:text-5xl">👤</span>
            )}
          </div>
          <button
            type="button"
            className="absolute bottom-0 right-0 p-2 bg-lime-600 text-white rounded-full hover:bg-lime-700 transition-colors text-xs"
          >
            📷
          </button>
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-4 md:space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-xs md:text-sm font-medium text-gray-700 mb-2"
          >
            Nome
          </label>
          <input
            type="text"
            id="name"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent bg-white min-h-[48px]"
            required
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-xs md:text-sm font-medium text-gray-700 mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent bg-white min-h-[48px]"
            required
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            type="submit"
            disabled={isSaving}
            className="flex-1 px-4 md:px-6 py-2 md:py-3 bg-lime-600 text-white rounded-lg font-medium hover:bg-lime-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base min-h-[48px]"
          >
            {isSaving ? 'Salvando...' : 'Salvar Alterações'}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            disabled={isSaving}
            className="flex-1 px-4 md:px-6 py-2 md:py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base min-h-[48px]"
          >
            Cancelar
          </button>
        </div>
      </div>
    </form>
  )
}
