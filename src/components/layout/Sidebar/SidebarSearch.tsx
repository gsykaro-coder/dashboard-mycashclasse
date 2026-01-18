import { useState } from 'react'

interface SidebarSearchProps {
  isExpanded: boolean
}

export default function SidebarSearch({ isExpanded }: SidebarSearchProps) {
  const [searchQuery, setSearchQuery] = useState('')

  if (!isExpanded) {
    return (
      <button
        className="w-full p-2.5 md:p-3 rounded-lg hover:bg-[var(--color-surface-hover)] transition-colors flex items-center justify-center min-h-[44px]"
        aria-label="Pesquisar"
        title="Pesquisar"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-[var(--color-text-secondary)]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    )
  }

  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-[var(--color-text-tertiary)]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Pesquisar"
        className="w-full pl-10 pr-4 py-2.5 md:py-3 bg-[var(--color-bg)] border border-[var(--border-color)] rounded-lg text-sm md:text-base text-[var(--color-text)] placeholder-[var(--color-text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent min-h-[44px] transition-all"
      />
    </div>
  )
}
