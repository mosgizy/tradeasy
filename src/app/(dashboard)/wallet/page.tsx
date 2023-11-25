'use client'

import PayoutModal from '@/components/PayoutModal'
import {arrowLeft, arrowRight, profile} from '@/utils/icons'
import Image from 'next/image'
import {useState} from 'react'

const Wallet = () => {
  const [toggleModal, setToggleModal] = useState(false)

  const handleToggleModal = () => {
    setToggleModal(prev => !prev)
  }
  return (
    <div>
      <div className="flex-center justify-between">
        <h2 className="font-semibold text-xl">Overview</h2>
        <button
          onClick={handleToggleModal}
          className="font-bold text-white bg-primary-100 rounded-lg py-[0.875rem] px-16"
        >
          Request Payout
        </button>
      </div>
      <div className="mt-10 grid grid-cols-3 gap-4 font-medium">
        <div className=" flex-column gap-4 py-6 px-8 rounded-lg shadow-100">
          <div>Paid In</div>
          <div className="text-2xl font-medium">N2,480,000</div>
        </div>
        <div className=" flex-column gap-4 py-6 px-8 rounded-lg shadow-100">
          <div>Paid Out</div>
          <div className="text-2xl font-medium">N500,000</div>
        </div>
        <div className=" flex-column gap-4 py-6 px-8 rounded-lg shadow-100">
          <div>Balance</div>
          <div className="text-2xl font-medium">N1,980,000</div>
        </div>
      </div>
      <div className=" mt-16">
        <div className="flex-center justify-between">
          <h2 className="font-medium text-xl">Payment History</h2>
          <ul className="flex-center gap-4 text-xs font-medium [&>li]:cursor-pointer">
            <li>All</li>
            <li>Paid In</li>
            <li>Paid Out</li>
          </ul>
          <label htmlFor="search" className="relative">
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search"
              className=" rounded-lg border border-secondary-100 px-4 py-[0.62rem] text-xs"
            />
            <Image
              src="/icons/search.svg"
              alt=""
              width={20}
              height={20}
              className="absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer"
            />
          </label>
        </div>
        <div className=" mt-4">
          <div className="border border-secondary-600">
            <div className="grid grid-cols-5 gap-9 py-3 px-2 bg-secondary-500 font-medium">
              <div className="flex-center gap-8 col-span-2">
                <input type="checkbox" name="" id="" />
                <span>Payment Type</span>
              </div>
              <div>Date</div>

              <div className="text-right">Amount</div>
              <div className="flex-center justify-end gap-8">
                <span>Total Balance</span>
                <Image src="/icons/more.svg" alt="" width={24} height={24} />
              </div>
            </div>
            <div>
              <div className="cursor-pointer grid grid-cols-5 gap-9 py-3 px-2 font-medium border-b border-secondary-600">
                <div className="flex-center gap-8 col-span-2">
                  <input type="checkbox" name="" id="" />
                  <div className="flex-center gap-2">
                    <div className=" w-8 h-8 rounded-full bg-[#F7C8EF] flex-center justify-center">
                      <span>{profile}</span>
                    </div>
                    <div>
                      <h2>Awojobi Micheal</h2>
                      <span className="text-xs">awojobimicheal089@gmail.com</span>
                    </div>
                  </div>
                </div>
                <div className="flex-center">23 - 12 - 2020</div>

                <div className="text-right flex-center justify-end">N25,000.00</div>
                <div className="flex-center justify-end gap-8">
                  <span className="text-right">N340,000</span>
                  <Image src="/icons/more.svg" alt="" width={24} height={24} />
                </div>
              </div>
            </div>
            <div className="">
              <div className="p-6 flex-center justify-end gap-4">
                <button>{arrowLeft}</button>
                <ul className="flex gap-2 text-xs font-medium [&_button]:px-4 [&_button]:py-[0.6875rem] [&_button]:rounded-[0.25rem] [&_button]:border-[0.5px] [&_button]:border-secondary-100">
                  <li>
                    <button>1</button>
                  </li>
                  <li>
                    <button>2</button>
                  </li>
                  <li>
                    <button>3</button>
                  </li>
                  <li>
                    <button>4</button>
                  </li>
                </ul>
                <button>{arrowRight}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {toggleModal && <PayoutModal closeModal={handleToggleModal} />}
    </div>
  )
}

export default Wallet