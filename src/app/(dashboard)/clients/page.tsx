'use client'

import AddClientModal from '@/components/AddClientModal'
import ClientInfo from '@/components/ClientInfo'
import Empty from '@/components/Empty'
import Pagination from '@/components/Pagination'
import useFetch from '@/hooks/usefetch'
import {profile} from '@/utils/icons'
import {clientDataI} from '@/utils/interface'
// import {Pagination} from '@mui/material'
import Image from 'next/image'
import React, {useEffect, useState} from 'react'

const Clients = () => {
  const [toggleModal, setToggleModal] = useState(false)
  const [clientId, setClientId] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const {data, loading, fetchData, error} = useFetch(`client/all?pageNumber=${currentPage}&pageSize=10`)

  const allClients = data as clientDataI

  const handleToggleModal = () => {
    setToggleModal(prev => !prev)
    fetchData()
  }

  const [toggleDetail, setToggleDetail] = useState(false)

  const handleToggleDetail = (id?: string) => {
    setToggleDetail(prev => !prev)
    id && setClientId(id)
  }

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(() => pageNumber)
  }

  useEffect(() => {
    fetchData()
  }, [currentPage])

  useEffect(() => {
    setTotalPages(data?.data.totalPage)
  }, [data])

  return (
    <div className="h-full">
      <div className="md:flex-center md:flex-row flex-column gap-6 md:justify-between">
        <h2 className="font-medium text-xl">Client History</h2>
        <div className="md:flex-center md:flex-row flex flex-col-reverse gap-8 md:gap-4">
          <label htmlFor="search" className="relative">
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search Invoice"
              className="w-full rounded-lg border border-secondary-100 px-4 py-[0.88rem] text-xs"
            />
            <Image
              src="/icons/search.svg"
              alt=""
              width={20}
              height={20}
              className="absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer"
            />
          </label>
          <button
            onClick={handleToggleModal}
            className="font-bold text-white bg-primary-100 rounded-lg py-[0.88rem] px-8"
          >
            Add New Client
          </button>
        </div>
      </div>
      <div className=" mt-8 h-full">
        <div className="md:border border-secondary-600 h-full">
          <div className="hidden md:grid grid-cols-6 gap-9 py-3 px-2 bg-secondary-500 font-medium">
            <div className="flex-center gap-8 col-span-2">
              <input type="checkbox" name="" id="" />
              <span>Client</span>
            </div>
            <div>Type</div>

            <div className="col-span-2">Address</div>
            <div className="flex-center justify-end gap-8">
              <span>Total item bought</span>
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
              allClients?.data?.result?.map(client => {
                return (
                  <div key={client.id} className="w-full p-4 pb-0 md:p-0 shadow-200 md:shadow-none">
                    <div className="flex-center justify-between mb-2 md:hidden">
                      <input type="checkbox" name="" id="" className="" />
                      <Image src="/icons/more.svg" alt="" width={24} height={24} className="cursor-pointer" />
                    </div>
                    <div
                      onClick={() => handleToggleDetail(client.id)}
                      className="w-full cursor-pointer flex-column md:grid md:grid-cols-6 gap-4 md:gap-9 py-3 px-2 font-medium md:border-b border-secondary-600"
                    >
                      <div className="flex-center gap-6 justify-between md:col-span-2 w-full">
                        <div className="md:hidden">Client</div>
                        <div className="flex-center gap-8 row-span-2 md:row-span-1">
                          <input type="checkbox" name="" id="" className="hidden md:block" />
                          <div className="flex-center gap-2">
                            <div className=" w-8 h-8 rounded-full bg-[#F7C8EF] flex-center justify-center">
                              <span>{profile}</span>
                            </div>
                            <div>
                              <h2>{client.fullname}</h2>
                              <span className="text-xs">{client.email}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex-center gap-6 justify-between">
                        <div className="md:hidden">Type</div>
                        <div className="md:flex-center">{client.clientType.toLowerCase()}</div>
                      </div>
                      <div className="flex-center gap-6 justify-between col-span-2">
                        <div className="md:hidden">Address</div>
                        <div className="md:flex-center truncate">{client.billingAddress}</div>
                      </div>
                      <div className="flex-center gap-6 justify-between md:justify-end">
                        <div className="md:hidden">Total item bought</div>
                        <div className="md:flex-center md:justify-end gap-8">
                          <span className="text-right">{client.totalPurchasedItems}</span>
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
      <ClientInfo toggle={toggleDetail} closeModal={handleToggleDetail} id={clientId} />
      {toggleModal && <AddClientModal closeModal={handleToggleModal} />}
    </div>
  )
}

export default Clients
