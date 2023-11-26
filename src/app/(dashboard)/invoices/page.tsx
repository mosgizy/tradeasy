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
  const {data: statsData, loading: statsLoading} = useFetch('invoice/statistics')

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
      console.log(data)

      if (!res.ok) {
        notify('Please provide all credentials')
      }

      if (res.ok) {
        handleToggleModal()
        fetchData()
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
          className="font-bold text-white bg-primary-100 rounded-lg py-[0.875rem] px-8"
        >
          Create New Invoice
        </button>
      </div>
      <div className="mt-10 grid grid-cols-3 gap-4 font-medium">
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
        <div className=" flex-column gap-4 py-6 px-8 rounded-lg shadow-100">
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
      <div className=" mt-16 h-full">
        <div className="flex-center justify-between">
          <h2 className="font-medium text-xl">Invoice History</h2>
          <div className="flex-center gap-4">
            <label htmlFor="search" className="relative">
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Search Invoice"
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
            <div className="flex-center gap-4">
              <button className="flex-center gap-[0.94rem] text-xs text-white px-4 py-[0.6875rem] rounded-lg border border-primary-200 bg-primary-200">
                <div className="flex-center gap-1">
                  <Image src="/icons/filter.svg" alt="" width={16} height={16} />
                  <span>Filter</span>
                </div>
                <span>{down}</span>
              </button>
            </div>
          </div>
        </div>
        <div className=" mt-4 h-full">
          <div className="border border-secondary-600 h-full">
            <div className="grid grid-cols-6 gap-9 py-3 px-2 bg-secondary-500 font-medium">
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
            <div>
              {loading ? (
                <div className="flex-center justify-center">
                  <div className="loader"></div>
                </div>
              ) : error !== undefined ? (
                <Empty />
              ) : (
                data?.data?.result.map((invoice: invoiceI) => {
                  return (
                    <div
                      key={invoice.id}
                      onClick={() => handleToggleDetails(invoice.id)}
                      className="cursor-pointer grid grid-cols-6 gap-9 py-3 px-2 font-medium border-b border-secondary-600"
                    >
                      <div className="flex-center gap-8 col-span-2">
                        <input type="checkbox" name="" id="" />
                        <span>{invoice.invoiceNo}</span>
                      </div>
                      <div className="col-span-2">{invoice.issuedTo}</div>
                      <div>{formatDate(invoice.issuedAt)}</div>
                      <div className="flex-center justify-end gap-16">
                        <span
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
                        </span>
                        <Image src="/icons/more.svg" alt="" width={24} height={24} />
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
