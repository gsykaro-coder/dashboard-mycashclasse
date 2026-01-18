import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import SidebarItem from './SidebarItem'
import SidebarToggle from './SidebarToggle'
import SidebarLogo from './SidebarLogo'
import SidebarSearch from './SidebarSearch'
import SidebarProfile from './SidebarProfile'
import IconHome from '../../icons/IconHome'
import IconCard from '../../icons/IconCard'

const navigation = [
  { path: '/', label: 'Home', icon: IconHome },
  { path: '/cards', label: 'cartões', icon: IconCard },
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
      {/* Logo Section */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <SidebarLogo isExpanded={isExpanded} />
        <SidebarToggle
          isExpanded={isExpanded}
          onToggle={() => setIsExpanded(!isExpanded)}
        />
      </div>

      {/* Search */}
      <div className="p-4 border-b border-gray-200">
        <SidebarSearch isExpanded={isExpanded} />
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
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

      {/* Profile Section */}
      <div className="p-4 border-t border-gray-200">
        <SidebarProfile isExpanded={isExpanded} />
      </div>
    </aside>
  )
}
