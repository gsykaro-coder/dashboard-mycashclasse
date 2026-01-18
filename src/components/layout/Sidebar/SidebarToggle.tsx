interface SidebarToggleProps {
  isExpanded: boolean
  onToggle: () => void
}

export default function SidebarToggle({
  isExpanded,
  onToggle,
}: SidebarToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
      aria-label={isExpanded ? 'Colapsar sidebar' : 'Expandir sidebar'}
      title={isExpanded ? 'Colapsar' : 'Expandir'}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-gray-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        {isExpanded ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 5l7 7-7 7M5 5l7 7-7 7"
          />
        )}
      </svg>
    </button>
  )
}
