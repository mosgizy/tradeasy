import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="">
      <nav className="py-6 px-12 border-b border-secondary font-medium flex-center justify-between">
        <div className="flex-center gap-2">
          <Image src="/icons/logo.svg" alt="" width={18} height={19} />
          <span className="text-2xl">Tradeazy.</span>
        </div>
        <ul className="flex-center gap-6">
          <li>
            <Link href="#">Solution</Link>
          </li>
          <li>
            <Link href="#">Features</Link>
          </li>
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link href="#">Resources</Link>
          </li>
        </ul>
        <Link href="/register" className=" px-8 py-2 text-primary-100 border border-primary-100 rounded-lg">
          Sign Up
        </Link>
      </nav>
      <section className="flex justify-center pt-20">
        <div className="text-center">
          <h1 className="font-semibold text-4.5xl">
            <div className="relative">
              <span>Simplifying</span>
              <Image
                src="/images/brand.png"
                alt=""
                height={100}
                width={500}
                className="absolute -top-6 left-1/2 -translate-x-1/2"
              />
            </div>
            <div className="mt-2">your business payment</div>
          </h1>
          <div className="text-2xl mt-2">End to end payment and invoice management in one software</div>
          <div className="flex justify-center mt-12">
            <Link href="login" className="font-bold bg-primary-100 text-white rounded-lg px-14 py-[0.88rem]">
              Manage your business payment
            </Link>
          </div>
        </div>
      </section>
      <div className="relative w-[85%] mx-auto h-96 flex justify-center mt-5">
        <Image src="/images/dashboard.png" alt="" fill />
      </div>
    </main>
  )
}
