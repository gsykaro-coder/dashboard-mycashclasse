import { useState } from 'react'
import NewTransactionModal from '../../modals/NewTransactionModal/NewTransactionModal'

export default function HeaderDesktop() {
  const [searchQuery, setSearchQuery] = useState('')
  const [dateRange] = useState('01 Jan - 31  Jan  2026')
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false)

  return (
    <header 
      className="w-full h-full bg-[var(--color-background-background)] justify-between items-center inline-flex"
      style={{
        padding: 32,
        background: 'var(--color-background-background)',
      }}
    >
      <div className="justify-start items-center gap-8 flex" style={{ gap: 32 }}>
        {/* Search Bar */}
        <div 
          className="w-[208px] h-12 pl-4 pr-4 pt-3 pb-3 rounded-full outline outline-1 outline-[var(--color-orange-500)] -outline-offset-1 justify-start items-center gap-2 flex"
          style={{
            borderRadius: 100,
            outline: '1px var(--color-orange-500) solid',
            outlineOffset: '-1px',
          }}
        >
          <div className="w-6 h-6 relative overflow-hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-[var(--color-orange-500)]"
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
            className="flex-1 bg-transparent border-none outline-none text-[var(--color-neutral-500)] text-lg font-semibold placeholder-[var(--color-neutral-500)]"
            style={{
              color: 'var(--color-neutral-500)',
              fontSize: 18,
              fontFamily: 'Inter',
              fontWeight: 600,
              lineHeight: 24,
              letterSpacing: 0.30,
            }}
          />
        </div>

        {/* Filter Icon */}
        <button
          className="p-2.5 rounded-full outline outline-1 outline-[var(--color-orange-500)] -outline-offset-1 justify-start items-center gap-2.5 flex w-12 h-12"
          style={{
            padding: 10,
            borderRadius: 100,
            outline: '1px var(--color-orange-500) solid',
            outlineOffset: '-1px',
          }}
          aria-label="Filtrar"
          title="Filtrar"
        >
          <div className="w-6 h-6 relative overflow-hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-[var(--color-orange-500)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {/* Three horizontal lines with circles on ends */}
              <circle cx="4" cy="8" r="1.5" fill="currentColor" />
              <line x1="4" y1="8" x2="20" y2="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <circle cx="20" cy="8" r="1.5" fill="currentColor" />
              
              <circle cx="4" cy="12" r="1.5" fill="currentColor" />
              <line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <circle cx="20" cy="12" r="1.5" fill="currentColor" />
              
              <circle cx="4" cy="16" r="1.5" fill="currentColor" />
              <line x1="4" y1="16" x2="20" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <circle cx="20" cy="16" r="1.5" fill="currentColor" />
            </svg>
          </div>
        </button>

        {/* Date Range Selector */}
        <div 
          className="h-12 pl-4 pr-4 pt-3 pb-3 rounded-full outline outline-1 outline-[var(--color-orange-500)] -outline-offset-1 justify-start items-center gap-2 flex"
          style={{
            borderRadius: 100,
            outline: '1px var(--color-orange-500) solid',
            outlineOffset: '-1px',
          }}
        >
          <div className="w-6 h-6 relative overflow-hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-[var(--color-orange-500)]"
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
            value={dateRange}
            readOnly
            className="bg-transparent border-none outline-none text-[var(--color-neutral-500)] text-lg font-semibold cursor-pointer"
            style={{
              color: 'var(--color-neutral-500)',
              fontSize: 18,
              fontFamily: 'Inter',
              fontWeight: 600,
              lineHeight: 24,
              letterSpacing: 0.30,
            }}
            onClick={() => {
              // TODO: Abrir seletor de data
            }}
          />
        </div>

        {/* User Avatars */}
        <div className="justify-start items-center flex gap-0">
          {/* Avatar 1 */}
          <div 
            className="w-12 h-12 relative bg-[var(--color-neutral-100)] rounded-full border-2 border-[var(--color-neutral-100)] overflow-hidden"
            style={{
              width: 48,
              height: 48,
              borderRadius: 100,
              border: '2px var(--color-neutral-100) solid',
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces&auto=format&q=80"
              alt="Usuário 1"
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
              }}
            />
          </div>

          {/* Avatar 2 */}
          <div 
            className="w-12 h-12 relative bg-[var(--color-neutral-100)] rounded-full border-2 border-[var(--color-neutral-100)] overflow-hidden"
            style={{
              width: 48,
              height: 48,
              borderRadius: 100,
              border: '2px var(--color-neutral-100) solid',
              marginLeft: -8,
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces&auto=format&q=80"
              alt="Usuário 2"
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
              }}
            />
          </div>

          {/* Avatar 3 */}
          <div 
            className="w-12 h-12 relative bg-[var(--color-neutral-100)] rounded-full border-2 border-[var(--color-neutral-100)] overflow-hidden"
            style={{
              width: 48,
              height: 48,
              borderRadius: 100,
              border: '2px var(--color-neutral-100) solid',
              marginLeft: -8,
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces&auto=format&q=80"
              alt="Usuário 3"
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
              }}
            />
          </div>

          {/* Add User Button */}
          <button
            className="w-12 h-12 relative bg-[var(--color-background-background)] overflow-hidden rounded-full outline outline-2 outline-[var(--color-neutral-100)] -outline-offset-2 flex items-center justify-center"
            style={{
              width: 48,
              height: 48,
              borderRadius: 100,
              outline: '2px var(--color-neutral-100) solid',
              outlineOffset: '-2px',
              marginLeft: -8,
            }}
            aria-label="Adicionar usuário"
            title="Adicionar usuário"
          >
            <div className="w-6 h-6 relative overflow-hidden" style={{ left: 12, top: 12, position: 'absolute' }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-[var(--color-orange-500)]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
          </button>
        </div>
      </div>

      {/* Nova transação Button */}
      <button
        onClick={() => setIsNewTransactionModalOpen(true)}
        className="h-12 pl-6 pr-6 pt-3 pb-3 bg-[var(--color-orange-500)] rounded-full justify-start items-center gap-2 flex"
        style={{
          height: 48,
          paddingLeft: 24,
          paddingRight: 24,
          paddingTop: 12,
          paddingBottom: 12,
          borderRadius: 100,
          gap: 8,
        }}
        aria-label="Nova transação"
      >
        <div className="w-6 h-6 relative overflow-hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-[var(--color-neutral-100)]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </div>
        <span 
          className="text-[var(--color-neutral-100)] text-lg font-semibold"
          style={{
            color: 'var(--color-neutral-100)',
            fontSize: 18,
            fontFamily: 'Inter',
            fontWeight: 600,
            lineHeight: 24,
            letterSpacing: 0.30,
          }}
        >
          Nova transação
        </span>
      </button>

      {/* New Transaction Modal */}
      <NewTransactionModal
        isOpen={isNewTransactionModalOpen}
        onClose={() => setIsNewTransactionModalOpen(false)}
      />
    </header>
  )
}
