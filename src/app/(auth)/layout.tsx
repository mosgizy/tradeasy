import Image from 'next/image'
import Link from 'next/link'

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <section className="flex min-h-screen">
      <div className="hidden md:flex-column items-center justify-between flex-[1_1_40%] pb-24 pt-16 bg-secondary-400">
        <Link href="/" className="flex-center gap-2">
          <>
            <Image src="/icons/logo.svg" alt="" width={18} height={19} />
            <span className="text-2xl">Tradeazy.</span>
          </>
        </Link>
        <div className="relative w-[30rem] h-[30rem] flex justify-center">
          <Image src="/images/auth.png" alt="" fill />
        </div>
        <h1 className="font-semibold text-2xl text-center">
          <div className="relative">
            <span>Simplifying</span>
            <Image src="/images/brand.png" alt="" fill />
          </div>
          <div>your business payment</div>
        </h1>
      </div>
      <section className="flex-[1_0_60%] px-5 py-8 md:flex-center justify-center">{children}</section>
    </section>
  )
}
