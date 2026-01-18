import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import SidebarItem from './SidebarItem'
import SidebarToggle from './SidebarToggle'
import SidebarLogo from './SidebarLogo'
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

  // Atualiza CSS custom property para o layout compensar a largura
  useEffect(() => {
    const updateSidebarWidth = () => {
      // Só atualiza se estiver em desktop (≥1280px)
      if (window.innerWidth >= 1280) {
        const sidebarWidth = isExpanded ? '256px' : '80px' // w-64 = 256px, w-20 = 80px
        document.documentElement.style.setProperty('--sidebar-width', sidebarWidth)
      } else {
        // Em mobile, não há sidebar, então margin é 0
        document.documentElement.style.setProperty('--sidebar-width', '0px')
      }
    }

    // Atualiza inicialmente
    updateSidebarWidth()

    // Adiciona listener para resize
    window.addEventListener('resize', updateSidebarWidth)

    // Limpa listener quando desmonta
    return () => {
      window.removeEventListener('resize', updateSidebarWidth)
    }
  }, [isExpanded])

  return (
    <aside
      className={`
        fixed left-0 top-0 flex flex-col bg-white border-r border-[var(--border-color)]
        transition-all duration-300 ease-in-out z-50
        ${isExpanded ? 'w-64' : 'w-20'}
      `}
      style={{ 
        height: '100dvh', // Dynamic viewport height (suporta 100vh como fallback)
        maxHeight: '100dvh'
      }}
    >
      {/* Logo Section */}
      <div className="flex items-center justify-between px-4 py-4 md:py-5 border-b border-[var(--border-color)]">
        <SidebarLogo isExpanded={isExpanded} />
        <SidebarToggle
          isExpanded={isExpanded}
          onToggle={() => setIsExpanded(!isExpanded)}
        />
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 md:px-4 py-3 md:py-4 space-y-1.5 md:space-y-2 overflow-y-auto">
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
      <div className="px-4 py-3 md:py-4 border-t border-[var(--border-color)]">
        <SidebarProfile isExpanded={isExpanded} />
      </div>
    </aside>
  )
}
