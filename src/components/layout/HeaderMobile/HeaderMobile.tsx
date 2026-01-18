import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import MobileDrawer from './MobileDrawer'

const pageTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/cards': 'Cartões',
  '/transactions': 'Transações',
  '/profile': 'Perfil',
}

export default function HeaderMobile() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const location = useLocation()
  const currentTitle = pageTitles[location.pathname] || 'mycash+'

  return (
    <>
      <header className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200">
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Abrir menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <h1 className="text-lg font-semibold text-gray-900">{currentTitle}</h1>

        <div className="w-10" /> {/* Spacer for centering */}
      </header>

      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </>
  )
}
