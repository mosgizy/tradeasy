'use client'

import {hamburger} from '@/utils/icons'
import Image from 'next/image'
import Link from 'next/link'
import {useState} from 'react'

export default function Home() {
  const [toggle, setToggle] = useState(false)

  const toggleNav = () => setToggle(prev => !prev)

  return (
    <main className="">
      <nav className="p-4 md:py-6 d:px-12 md:border-b border-secondary font-medium flex-center justify-between">
        <div className="flex-center gap-2">
          <Image src="/icons/logo.svg" alt="" width={18} height={19} />
          <span className="text-2xl hidden md:block">Tradeazy.</span>
        </div>
        <ul
          className={`absolute md:relative inset-0 transition-all z-50 px-6 py-4 md:px-0 md:py-0 bg-secondary-400 md:bg-transparent flex-column md:flex-row md:flex-center gap-6 ${
            toggle ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <li className="md:hidden flex-center justify-between">
            <Image src="/icons/logo.svg" alt="" width={18} height={19} />
            <Image
              onClick={toggleNav}
              src="/icons/close.svg"
              alt=""
              height={24}
              width={24}
              className="cursor-pointer"
            />
          </li>
          <li className="mt-16 md:mt-0">
            <Link href="#">Solution</Link>
          </li>
          <li>
            <Link href="#">Features</Link>
          </li>
          <li>
            <Link href="#">Resources</Link>
          </li>
        </ul>
        <Link href="/register" className=" px-8 py-2 text-primary-100 border border-primary-100 rounded-lg">
          Sign Up
        </Link>
        <div onClick={toggleNav} className="md:hidden cursor-pointer">
          {hamburger}
        </div>
      </nav>
      <section className="flex justify-center pt-20">
        <div className="text-center px-4">
          <div>
            <h1 className="font-semibold text-[1.7523rem] md:text-4.5xl">
              <div className="relative">
                <span className="">Simplifying</span>
                <Image
                  src="/images/brand.png"
                  alt=""
                  height={100}
                  width={500}
                  className="absolute -top-4 md:-top-6 left-1/2 -translate-x-1/2 w-[18rem] md:w-[30rem]"
                />
              </div>
              <div className="mt-2">your business payment</div>
            </h1>
            <div className="md:text-2xl mt-2">End to end payment and invoice management in one software</div>
          </div>
          <div className="flex justify-center mt-12">
            <Link
              href="login"
              className="font-bold bg-primary-100 text-sm md:text-base text-white rounded-lg px-14 py-[0.88rem]"
            >
              Manage your business payment
            </Link>
          </div>
        </div>
      </section>
      <div className="relative w-[85%] mx-auto h-96 flex justify-center mt-8 md:mt-5">
        <Image src="/images/dashboard.png" alt="" fill className="hidden md:block" />
        <Image src="/images/auth.png" alt="" fill className="w-full md:hidden" />
      </div>
    </main>
  )
}
