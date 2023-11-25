'use client'

import {down, notification, profile} from '@/utils/icons'
import {usePathname} from 'next/navigation'

const Nav = () => {
  const pathname = usePathname()

  return (
    <nav className="flex-center justify-between border-b border-secondary-100 py-6 px-10 pr-16">
      <div className="font-semibold text-2xl capitalize">{pathname.slice(1)}</div>
      <div className="flex-center gap-5">
        <span className="cursor-pointer">{notification}</span>
        <div className="flex-center gap-2 rounded-full py-1 px-2 bg-[#FFEEFC] border border-secondary-300 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-[#F7C8EF] flex-center justify-center">
            <span>{profile}</span>
          </div>
          <span>{down}</span>
        </div>
      </div>
    </nav>
  )
}

export default Nav
