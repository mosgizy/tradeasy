import {call, category, invoices, logout, product, settings, user, wallet} from '@/utils/icons'
import Image from 'next/image'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import Cookies from 'js-cookie'

const SideBar = () => {
  const pathname = usePathname()
  const logOut = () => {
    Cookies.remove('token')
    window.location.reload()
  }

  return (
    <div className="flex-[1_1_15%] bg-secondary-400 py-7">
      <Link href="/" className="flex-center justify-center gap-2 mb-16">
        <>
          <Image src="/icons/logo.svg" alt="" width={18} height={19} />
          <span className="text-xl">Tradeazy.</span>
        </>
      </Link>
      <div className="flex-column items-center justify-between h-4/5 px-5">
        <ul className="flex-column gap-6 [&_a]:flex-center [&_a]:gap-4">
          <li>
            <Link
              href="/dashboard"
              className={` hover:text-primary-100 ${pathname === '/dashboard' && 'text-primary-100'}`}
            >
              <>
                <span>{category}</span>
                <span>Dashboard</span>
              </>
            </Link>
          </li>
          <li>
            <Link
              href="/clients"
              className={` hover:text-primary-100 ${pathname === '/clients' && 'text-primary-100'}`}
            >
              <>
                {user}
                <span>Clients</span>
              </>
            </Link>
          </li>
          <li>
            <Link
              href="/invoices"
              className={` hover:text-primary-100 ${pathname === '/invoices' && 'text-primary-100'}`}
            >
              <>
                {invoices}
                <span>Invoices</span>
              </>
            </Link>
          </li>
          {/* <li>
            <Link
              href="/product"
              className={` hover:text-primary-100 ${pathname === '/product' && 'text-primary-100'}`}
            >
              <>
                {product}
                <span>Product</span>
              </>
            </Link>
          </li> */}
          <li>
            <Link href="/wallet" className={` hover:text-primary-100 ${pathname === '/wallet' && 'text-primary-100'}`}>
              <>
                {wallet}
                <span>Wallet</span>
              </>
            </Link>
          </li>
        </ul>
        <div className="flex justify-center border-t border-secondary-100 w-full pt-16">
          <ul className="flex-column gap-6 [&_a]:flex-center [&_a]:gap-4 -pl-4">
            <li>
              <Link
                href="/dashboard"
                className={` hover:text-primary-100 ${pathname === '/settings' && 'text-primary-100'}`}
              >
                <>
                  {settings}
                  <span>Settings</span>
                </>
              </Link>
            </li>
            <li>
              <Link
                href="dashboard"
                className={` hover:text-primary-100 ${pathname === '/support' && 'text-primary-100'}`}
              >
                <>
                  {call}
                  <span>Support</span>
                </>
              </Link>
            </li>
            <li>
              <div
                onClick={logOut}
                className={`flex-center gap-4 hover:text-primary-100 cursor-pointer ${
                  pathname === '/logout' && 'text-primary-100'
                }`}
              >
                {logout}
                <span>Logout</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SideBar
