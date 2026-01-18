import { Link } from 'react-router-dom'

interface SidebarItemProps {
  path: string
  label: string
  icon: string
  isActive: boolean
  isExpanded: boolean
}

export default function SidebarItem({
  path,
  label,
  icon,
  isActive,
  isExpanded,
}: SidebarItemProps) {
  return (
    <Link
      to={path}
      className={`
        flex items-center gap-3 px-4 py-3 rounded-lg
        transition-colors duration-200
        ${
          isActive
            ? 'bg-lime-100 text-lime-700 font-semibold'
            : 'text-gray-700 hover:bg-gray-100'
        }
      `}
      title={!isExpanded ? label : undefined}
    >
      <span className="text-xl flex-shrink-0">{icon}</span>
      {isExpanded && (
        <span className="text-sm font-medium">{label}</span>
      )}
    </Link>
  )
}
