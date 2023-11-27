'use client'

import Nav from '@/components/Nav'
import SideBar from '@/components/SideBar'
import {useState} from 'react'

export default function RootLayout({children}: {children: React.ReactNode}) {
  const [toggleSideBar, setToggleSideBar] = useState(false)

  const handleSideBar = () => {
    setToggleSideBar(prev => !prev)
  }
  return (
    <section className="flex min-h-screen">
      <SideBar toggle={toggleSideBar} handleToggle={handleSideBar} />
      <section className=" md:ml-64 w-full">
        <Nav handleToggle={handleSideBar} />
        <section className="min-h-[90%] p-4 pb-8 md:py-12 md:px-9">{children}</section>
      </section>
    </section>
  )
}
