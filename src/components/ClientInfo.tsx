'use client'

import useFetch from '@/hooks/usefetch'
import {clientDetailI} from '@/utils/interface'
import Image from 'next/image'
import {useEffect} from 'react'

interface clientInfoI {
  toggle: boolean
  closeModal: () => void
  id: string
}

const ClientInfo = ({toggle, closeModal, id}: clientInfoI) => {
  const {data, loading, fetchData} = useFetch(`client/${id}`)

  const client = data as clientDetailI

  useEffect(() => {
    fetchData()
  }, [id])

  return (
    <div
      className={`bg-secondary-700 transition-all shadow-300 p-6 w-[26rem] fixed top-0 right-0 min-h-screen ${
        toggle && loading === false ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex-center justify-between">
        <h2 className="font-medium text-xl">Client Details </h2>
        <span onClick={closeModal} className="cursor-pointer">
          <Image src="/icons/close.svg" alt="" height={24} width={24} />
        </span>
      </div>
      <div className="mt-10 mb-12 p-4">
        <span className=" w-[4.5rem] h-[4.5rem] bg-[#C8DAF7] flex-center justify-center rounded-full">
          <Image src="/icons/profile.svg" alt="" height={40} width={40} />
        </span>
        <div className="mt-4">
          <h2 className="font-medium">{client?.data?.fullname!}</h2>
          <span className="text-sm text-primary-200/70">{client?.data?.email}</span>
          <div className="text-sm text-primary-200/70">{client?.data?.phone}</div>
        </div>
        <div className="mt-6">
          <div className="flex-center gap-2 text-xs">
            <Image src="/icons/profile.svg" alt="" height={16} width={16} />
            <span>{client?.data?.clientType}</span>
          </div>
          <p className="text-sm mt-1">{client?.data?.billingAddress}</p>
        </div>
      </div>

      <div className="p-4 mb-12 font-medium border-t border-secondary-600 flex-column gap-8">
        <div>
          <h3 className="text-primary-200/50">Total Item bought</h3>
          <span className="text-2xl mt-2 block">{client?.data?.totalPaidInvoices}</span>
        </div>
        <div>
          <h3 className="text-primary-200/50">Total invoice Issued</h3>
          <div className="flex-center justify-between mt-1">
            <span className="text-2xl">{client?.data?.totalOverdueInvoices}</span>
            <button className="px-5 py-2 rounded-lg bg-primary-200 text-white">View Invoice</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClientInfo
