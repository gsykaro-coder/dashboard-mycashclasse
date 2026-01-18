import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

interface MobileDrawerProps {
  isOpen: boolean
  onClose: () => void
}

const navigation = [
  { path: '/', label: 'Dashboard', icon: '📊' },
  { path: '/cards', label: 'Cartões', icon: '💳' },
  { path: '/transactions', label: 'Transações', icon: '💰' },
  { path: '/profile', label: 'Perfil', icon: '👤' },
]

export default function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const location = useLocation()

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        onClick={onClose}
      />

      {/* Drawer */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-white z-50 transform transition-transform duration-300 ease-in-out lg:hidden">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h1 className="text-xl font-bold text-gray-900">mycash+</h1>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Fechar menu"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg
                  transition-colors duration-200
                  ${
                    location.pathname === item.path
                      ? 'bg-lime-100 text-lime-700 font-semibold'
                      : 'text-gray-700 hover:bg-gray-100'
                  }
                `}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </aside>
    </>
  )
}
