import { Link } from 'react-router-dom'
import { ComponentType } from 'react'

interface SidebarItemProps {
  path: string
  label: string
  icon: ComponentType<{ className?: string }>
  isActive: boolean
  isExpanded: boolean
}

export default function SidebarItem({
  path,
  label,
  icon: Icon,
  isActive,
  isExpanded,
}: SidebarItemProps) {
  return (
    <Link
      to={path}
      className={`
        flex items-center gap-3 px-4 py-3 rounded-lg
        transition-all duration-200
        min-h-[44px]
        ${
          isActive
            ? 'bg-[var(--color-primary)] text-white font-semibold shadow-sm'
            : 'text-gray-700 hover:bg-gray-100'
        }
      `}
      title={!isExpanded ? label : undefined}
    >
      <Icon
        className={`flex-shrink-0 w-5 h-5 md:w-6 md:h-6 ${
          isActive ? 'text-white' : 'text-gray-700'
        }`}
      />
      {isExpanded && (
        <span className="text-sm md:text-base font-medium capitalize">
          {label}
        </span>
      )}
    </Link>
  )
}
