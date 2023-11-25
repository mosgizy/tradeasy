'use client'

import Nav from '@/components/Nav'
import SideBar from '@/components/SideBar'

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <section className="flex min-h-screen">
      <SideBar />
      <section className="flex-[1_0_85%]">
        <Nav />
        <section className=" py-12 px-9">{children}</section>
      </section>
    </section>
  )
}
