import { ReactNode } from 'react'
import Sidebar from './Sidebar/Sidebar'
import HeaderMobile from './HeaderMobile/HeaderMobile'
import HeaderDesktop from './HeaderDesktop/HeaderDesktop'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen w-full bg-[var(--color-background-background)]">
      {/* Sidebar - Desktop only (≥1280px) - Fixed */}
      <aside className="hidden lg:block">
        <Sidebar />
      </aside>

      {/* Main Content - Ajustado para compensar sidebar fixa */}
      <main 
        className="flex-1 w-full min-w-0 flex flex-col transition-all duration-300 ease-in-out lg:ml-[var(--sidebar-width,256px)]"
      >
        {/* Header Desktop - Desktop only (≥1280px) */}
        <div className="hidden lg:block">
          <HeaderDesktop />
        </div>

        {/* Header Mobile - Mobile/Tablet only (<1280px) */}
        <div className="lg:hidden">
          <HeaderMobile />
        </div>
        
        {/* Page Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-4 md:px-6 lg:px-8 max-w-[1400px] lg:max-w-[1600px] mx-auto w-full py-4 md:py-6 lg:py-8">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}
