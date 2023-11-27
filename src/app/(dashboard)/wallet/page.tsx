'use client'

import Empty from '@/components/Empty'
import Pagination from '@/components/Pagination'
import PayoutModal from '@/components/PayoutModal'
import {formatDate} from '@/helpers/formatDate'
import useFetch from '@/hooks/usefetch'
import {arrowLeft, arrowRight, profile} from '@/utils/icons'
import {paymentI} from '@/utils/interface'
import Image from 'next/image'
import {useEffect, useState} from 'react'

const Wallet = () => {
  const [toggleModal, setToggleModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const {data, loading, error, fetchData: fetchDataHistory} = useFetch('wallet/history')
  const {data: vendorData, loading: vendorLoading, fetchData} = useFetch('vendor/current')

  const handleToggleModal = () => {
    setToggleModal(prev => !prev)
  }

  const updateStats = () => {
    fetchDataHistory()
    fetchData()
  }

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(() => pageNumber)
  }

  const list = (
    <ul className="flex-center gap-4 text-xs font-medium [&>li]:cursor-pointer">
      <li>All</li>
      <li>Paid In</li>
      <li>Paid Out</li>
    </ul>
  )

  useEffect(() => {
    fetchDataHistory()
  }, [currentPage])

  return (
    <div>
      <div className="flex-center justify-between">
        <h2 className="font-semibold text-xl">Overview</h2>
        <button
          onClick={handleToggleModal}
          className="hidden md:block font-bold text-white bg-primary-100 rounded-lg py-[0.875rem] px-16"
        >
          Request Payout
        </button>
      </div>
      <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-4 font-medium">
        <div className=" flex-column gap-4 py-6 px-8 rounded-lg shadow-100">
          <div>Paid In</div>
          <div className="text-2xl">
            {vendorLoading ? <div className="loader"></div> : <span>N{vendorData?.data.totalCredit}</span>}
          </div>
        </div>
        <div className=" flex-column gap-4 py-6 px-8 rounded-lg shadow-100">
          <div>Paid Out</div>
          <div className="text-2xl">
            {vendorLoading ? <div className="loader"></div> : <span>N{vendorData?.data.totalWithdrawal}</span>}
          </div>
        </div>
        <div className=" col-span-2 md:col-span-1 flex-column gap-4 py-6 px-8 rounded-lg shadow-100">
          <div>Balance</div>
          <div className="text-2xl">
            {' '}
            {vendorLoading ? <div className="loader"></div> : <span>N{vendorData?.data.balance}</span>}
          </div>
        </div>
      </div>
      <div className="md:hidden mt-6 mb-8">
        <button
          onClick={handleToggleModal}
          className="w-full font-bold text-white bg-primary-100 rounded-lg py-[0.875rem] px-16"
        >
          Request Payout
        </button>
      </div>
      <div className=" mt-16">
        <div className="flex-column gap-6 md:flex md:items-center justify-between">
          <h2 className="font-medium text-xl">Payment History</h2>
          <div className="hidden md:block">{list}</div>
          <label htmlFor="search" className="relative">
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search"
              className="w-full md:w-auto rounded-lg border border-secondary-100 px-4 py-[0.62rem] text-xs"
            />
            <Image
              src="/icons/search.svg"
              alt=""
              width={20}
              height={20}
              className="absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer"
            />
          </label>
          <div className="md:hidden">{list}</div>
        </div>
        <div className=" mt-4">
          <div className="md:border border-secondary-600">
            <div className="hidden md:grid grid-cols-5 gap-9 py-3 px-2 bg-secondary-500 font-medium">
              <div className="flex-center gap-8 col-span-2">
                <input type="checkbox" name="" id="" />
                <span>Profile</span>
              </div>
              <div>Date</div>

              <div className="text-right">Amount</div>
              <div className="flex-center justify-end gap-8">
                <span>Type</span>
                <Image src="/icons/more.svg" alt="" width={24} height={24} />
              </div>
            </div>
            <div className="flex-column gap-4 md:gap-0">
              {loading ? (
                <div className="flex-center justify-center">
                  <div className="loader"></div>
                </div>
              ) : error !== undefined ? (
                <Empty />
              ) : (
                data?.data?.result.map((payment: paymentI) => {
                  return (
                    <div key={payment.id} className="w-full p-4 pb-0 md:p-0 shadow-200 md:shadow-none">
                      <div className="flex-center justify-between mb-2 md:hidden">
                        <input type="checkbox" name="" id="" className="" />
                        <Image src="/icons/more.svg" alt="" width={24} height={24} className="cursor-pointer" />
                      </div>
                      <div className="cursor-pointer flex-column gap-3 md:grid grid-cols-5 md:gap-9 py-3 px-2 font-medium md:border-b border-secondary-600">
                        <div className="col-span-2 flex-center gap-6 justify-between">
                          <div className="md:hidden">Profile</div>
                          <div className="flex-center gap-8 col-span-2">
                            <input type="checkbox" name="" id="" className="hidden md:block" />
                            <div className="flex-center gap-2">
                              <div className=" w-8 h-8 rounded-full bg-[#F7C8EF] flex-center justify-center">
                                <span>{profile}</span>
                              </div>
                              <div>
                                <h2>{payment.transacterName}</h2>
                                <span className="text-xs">{payment.transacterEmail}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex-center gap-6 justify-between">
                          <div className="md:hidden">Date</div>
                          <div className="flex-center">{formatDate(payment.createdAt)}</div>
                        </div>
                        <div className="flex-center gap-6 justify-between">
                          <div className="md:hidden">Amount</div>
                          <div className="text-right flex-center justify-end">{payment.amount}</div>
                        </div>
                        <div className="flex-center gap-6 justify-between">
                          <div className="md:hidden">Type</div>
                          <div className="flex-center justify-end gap-8">
                            <span className="text-right">{payment.type}</span>
                            <Image
                              src="/icons/more.svg"
                              alt=""
                              width={24}
                              height={24}
                              className="cursor-pointer hidden md:block"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
            <div className="">
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
          </div>
        </div>
      </div>
      {toggleModal && <PayoutModal closeModal={handleToggleModal} fetchData={updateStats} />}
    </div>
  )
}

export default Wallet
