import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import SidebarItem from './SidebarItem'
import SidebarToggle from './SidebarToggle'

const navigation = [
  { path: '/', label: 'Dashboard', icon: '📊' },
  { path: '/cards', label: 'Cartões', icon: '💳' },
  { path: '/transactions', label: 'Transações', icon: '💰' },
  { path: '/profile', label: 'Perfil', icon: '👤' },
]

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true)
  const location = useLocation()

  return (
    <aside
      className={`
        flex flex-col h-screen bg-white border-r border-gray-200
        transition-all duration-300 ease-in-out
        ${isExpanded ? 'w-64' : 'w-20'}
      `}
    >
      {/* Logo */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {isExpanded && (
          <h1 className="text-xl font-bold text-gray-900">mycash+</h1>
        )}
        <SidebarToggle
          isExpanded={isExpanded}
          onToggle={() => setIsExpanded(!isExpanded)}
        />
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => (
          <SidebarItem
            key={item.path}
            path={item.path}
            label={item.label}
            icon={item.icon}
            isActive={location.pathname === item.path}
            isExpanded={isExpanded}
          />
        ))}
      </nav>
    </aside>
  )
}
