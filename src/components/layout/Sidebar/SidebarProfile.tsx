import { useState, useEffect } from 'react'
import { User } from '../../../types'

interface SidebarProfileProps {
  isExpanded: boolean
}

export default function SidebarProfile({ isExpanded }: SidebarProfileProps) {
  const [user] = useState<User>({
    id: '1',
    name: 'Gabriel Bronx',
    email: 'gabriel.bronx@email.com',
    avatar: '',
    createdAt: new Date().toISOString(),
  })

  useEffect(() => {
    // TODO: Buscar dados do usuário do Supabase
    // setUser será usado quando implementarmos a integração
  }, [])

  if (!isExpanded) {
    return (
      <div className="flex items-center justify-center p-3">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-lg">👤</span>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-lg">👤</span>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">
          {user.name}
        </p>
        <p className="text-xs text-gray-500 truncate">{user.email}</p>
      </div>
    </div>
  )
}
