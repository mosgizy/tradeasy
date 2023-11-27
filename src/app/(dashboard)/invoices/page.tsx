'use client'

import InvoiceDetails from '@/components/InvoiceDetails'
import InvoiceModal from '@/components/InvoiceModal'
import {formatDate} from '@/helpers/formatDate'
import useFetch from '@/hooks/usefetch'
import {baseUrl} from '@/utils/constants'
import {down} from '@/utils/icons'
import {invoiceI} from '@/utils/interface'
import Image from 'next/image'
import React, {useEffect, useState} from 'react'
import Cookies from 'js-cookie'
import useToaster from '@/hooks/useToast'
import Pagination from '@/components/Pagination'
import Empty from '@/components/Empty'

const Invoice = () => {
  const [toggleModal, setToggleModal] = useState(false)
  const [toggleDetails, setToggleDetails] = useState(false)
  const [invoiceId, setInvoiceId] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const {data, loading, fetchData, error} = useFetch(`invoice/all?pageNumber=${currentPage}&pageSize=10`)
  const {data: statsData, loading: statsLoading, fetchData: fetchDataStats} = useFetch('invoice/statistics')

  const handleToggleDetails = (id?: string) => {
    setToggleDetails(prev => !prev)
    id && setInvoiceId(id)
  }

  const handleToggleModal = () => {
    setToggleModal(prev => !prev)
  }

  const token = Cookies.get('token')
  const notify = useToaster()

  const submitForm = async (invoiceData: any, setLoading: any) => {
    setLoading(true)
    try {
      const res = await fetch(`${baseUrl}/invoice/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          authorization: `Bearer ${token}`
        },
        body: JSON.stringify(invoiceData)
      })

      const data = await res.json()

      if (!res.ok) {
        notify('Please provide all credentials')
      }

      if (res.ok) {
        handleToggleModal()
        fetchData()
        fetchDataStats()
        notify(data.message)
      }
      setLoading(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(() => pageNumber)
  }

  useEffect(() => {
    fetchData()
  }, [currentPage])

  useEffect(() => {
    data && setTotalPages(data?.data.totalPage)
  }, [data])

  return (
    <div className="h-full">
      <div className="flex-center justify-between">
        <h2 className="font-semibold text-xl">Overview</h2>
        <button
          onClick={handleToggleModal}
          className="hidden md:block font-bold text-white bg-primary-100 rounded-lg py-[0.875rem] px-8"
        >
          Create New Invoice
        </button>
      </div>
      <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-4 font-medium">
        <div className=" flex-column gap-4 py-6 px-8 rounded-lg shadow-100">
          <div>Awaiting Payment</div>
          <div className="text-2xl text-[#FFA629]">
            {statsLoading ? (
              <div className="flex-center">
                <div className="loader"></div>
              </div>
            ) : (
              statsData?.data.pendingInvoices
            )}
          </div>
        </div>
        <div className=" flex-column gap-4 py-6 px-8 rounded-lg shadow-100">
          <div>Invoice Overdue</div>
          <div className="text-2xl text-[#FFA629]">
            {statsLoading ? (
              <div className="flex-center">
                <div className="loader"></div>
              </div>
            ) : (
              statsData?.data.overDueInvoices
            )}
          </div>
        </div>
        <div className=" col-span-2 md:col-span-1 flex-column gap-4 py-6 px-8 rounded-lg shadow-100">
          <div>Invoice Draft</div>
          <div className="text-2xl">
            {statsLoading ? (
              <div className="flex-center">
                <div className="loader"></div>
              </div>
            ) : (
              statsData?.data.draftInvoices
            )}
          </div>
        </div>
      </div>
      <div className="md:hidden mt-6 mb-8">
        <button
          onClick={handleToggleModal}
          className="w-full font-bold text-white bg-primary-100 rounded-lg py-[0.875rem] px-8"
        >
          Create New Invoice
        </button>
      </div>
      <div className=" md:mt-16 h-full">
        <div className="flex-column md:flex-row md:flex-center md:justify-between">
          <h2 className="font-medium text-xl">Invoice History</h2>
          <div className="grid grid-cols-3 md:flex-center gap-4 mt-6 md:mt-0">
            <label htmlFor="search" className="relative col-span-2 md:col-span-1">
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Search Invoice"
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
            <div className="flex-center gap-4 w-full">
              <button className="w-full md:w-auto flex-center justify-between gap-[0.94rem] text-xs text-white px-4 py-[0.6875rem] rounded-lg border border-primary-200 bg-primary-200">
                <div className="flex-center gap-1">
                  <Image src="/icons/filter.svg" alt="" width={16} height={16} />
                  <span className="hidden md:block">Filter</span>
                </div>
                <span>{down}</span>
              </button>
            </div>
          </div>
        </div>
        <div className=" mt-4 h-full">
          <div className="md:border border-secondary-600 h-full">
            <div className="hidden md:grid grid-cols-6 gap-9 py-3 px-2 bg-secondary-500 font-medium">
              <div className="flex-center gap-8 col-span-2">
                <input type="checkbox" name="" id="" />
                <span>Invoice Number</span>
              </div>
              <div className="col-span-2">Client’s Name</div>
              <div>Date Issued</div>
              <div className="flex-center justify-end gap-16">
                <span>Status</span>
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
                data?.data?.result.map((invoice: invoiceI) => {
                  return (
                    <div key={invoice.id} className="p-4 md:p-0 shadow-200">
                      <div className="flex-center justify-between mb-2 md:hidden">
                        <input type="checkbox" name="" id="" className="" />
                        <Image src="/icons/more.svg" alt="" width={24} height={24} className="cursor-pointer" />
                      </div>
                      <div
                        onClick={() => handleToggleDetails(invoice.id)}
                        className="cursor-pointer flex-column md:grid md:grid-cols-6 gap-3 md:gap-9 py-3 px-2 font-medium md:border-b border-secondary-600"
                      >
                        <div className="col-span-2 flex-center justify-between">
                          <div className="md:hidden">Invoice Number</div>
                          <div className="flex-center gap-8">
                            <input type="checkbox" name="" id="" className="hidden md:block" />
                            <span>{invoice.invoiceNo}</span>
                          </div>
                        </div>
                        <div className="col-span-2 flex-center justify-between">
                          <div className="md:hidden">Client’s Name</div>
                          <div className="">{invoice.issuedTo}</div>
                        </div>
                        <div className="flex-center justify-between">
                          <div className="md:hidden">Date Issued</div>
                          <div>{formatDate(invoice.issuedAt)}</div>
                        </div>
                        <div className="flex-center justify-between">
                          <div className="md:hidden">Status</div>
                          <div className="flex-center justify-end gap-16">
                            <div
                              className={`text-xs font-medium rounded-lg p-1 ${
                                invoice.status === 'PAID'
                                  ? 'text-[#308B05] bg-[#EAFFE0]'
                                  : invoice.status === 'DRAFT'
                                  ? 'bg-[#E1EAFF] text-primary-200'
                                  : invoice.status === 'UNPAID'
                                  ? 'text-[#FF9B0F] bg-[#FFF4E5]'
                                  : 'text-[#FF1D1D] bg-[#FFE8E8]'
                              }`}
                            >
                              {invoice.status}
                            </div>
                            <Image src="/icons/more.svg" alt="" width={24} height={24} className="hidden md:block" />
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
      <InvoiceDetails toggle={toggleDetails} closeModal={handleToggleDetails} id={invoiceId} />
      {toggleModal && <InvoiceModal closeModal={handleToggleModal} submitForm={submitForm} />}
    </div>
  )
}

export default Invoice
