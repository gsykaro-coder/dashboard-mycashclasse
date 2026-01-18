import { useAuth } from '../../../context/AuthContext'

interface SidebarProfileProps {
  isExpanded: boolean
}

export default function SidebarProfile({ isExpanded }: SidebarProfileProps) {
  const { userProfile, user } = useAuth()

  // Fallback para dados mockados se não houver usuário autenticado
  const displayName = userProfile?.name || user?.email || 'Usuário'
  const displayEmail = userProfile?.email || user?.email || ''
  const avatarUrl = userProfile?.avatar_url || null

  // Função para tratar erro de carregamento da imagem (fallback para inicial)
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement
    target.style.display = 'none'
    const parent = target.parentElement
    if (parent && !parent.querySelector('.avatar-fallback')) {
      const fallback = document.createElement('div')
      fallback.className = 'w-full h-full bg-[var(--color-primary)] flex items-center justify-center avatar-fallback'
      fallback.innerHTML = `<span class="text-white font-semibold text-sm">${displayName.charAt(0).toUpperCase()}</span>`
      parent.appendChild(fallback)
    }
  }

  if (!isExpanded) {
    return (
      <div className="flex items-center justify-center">
        <div className="w-10 h-10 rounded-full overflow-hidden">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={displayName}
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
          ) : (
            <div className="w-full h-full bg-[var(--color-primary)] flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {displayName.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3 rounded-lg hover:bg-[var(--color-surface-hover)] transition-colors cursor-pointer">
      <div className="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={displayName}
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full bg-[var(--color-primary)] flex items-center justify-center">
            <span className="text-white font-semibold text-sm">
              {displayName.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-[var(--color-text)] truncate leading-tight">
          {displayName}
        </p>
        <p className="text-xs text-[var(--color-text-secondary)] truncate leading-tight mt-0.5">
          {displayEmail}
        </p>
      </div>
    </div>
  )
}
