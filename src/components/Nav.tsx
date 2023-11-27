'use client'

import {down, hamburger, notification, profile} from '@/utils/icons'
import Image from 'next/image'
import {usePathname} from 'next/navigation'

const Nav = ({handleToggle}: {handleToggle: () => void}) => {
  const pathname = usePathname()

  return (
    <nav className="flex-center justify-between border-b border-secondary-100 p-4 md:py-6 md:px-10 md:pr-16">
      <div className="md:hidden">
        <Image src="/icons/logo.svg" alt="" width={18} height={19} />
      </div>
      <div className="font-semibold text-xl md:text-2xl capitalize">{pathname.slice(1)}</div>
      <div className="flex-center gap-5">
        <span className="cursor-pointer">{notification}</span>
        <div onClick={handleToggle} className="md:hidden cursor-pointer">
          {hamburger}
        </div>
        <div className="hidden md:flex-center gap-2 rounded-full py-1 px-2 bg-[#FFEEFC] border border-secondary-300 cursor-pointer">
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
