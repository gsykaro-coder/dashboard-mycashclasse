import { ReactNode } from 'react'
import Sidebar from './Sidebar/Sidebar'
import HeaderMobile from './HeaderMobile/HeaderMobile'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar - Desktop only (≥1280px) */}
      <aside className="hidden lg:block">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 w-full min-w-0">
        {/* Header Mobile - Mobile/Tablet only (<1280px) */}
        <HeaderMobile />
        
        {/* Page Content */}
        <div className="px-4 md:px-6 lg:px-8 max-w-[1400px] lg:max-w-[1600px] mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  )
}
