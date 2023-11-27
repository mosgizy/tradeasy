import useFetch from '@/hooks/usefetch'
import {itemsI} from '@/utils/interface'
import Image from 'next/image'
import {useEffect} from 'react'

interface invoiceInfoI {
  toggle: boolean
  closeModal: () => void
  id: string
}

const InvoiceDetails = ({toggle, closeModal, id}: invoiceInfoI) => {
  const {data, loading, fetchData} = useFetch(`invoice/${id}`)

  const formatDate = (dateString: string) => {
    const dateObject = new Date(dateString)

    const formattedDate = dateObject.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })

    return formattedDate
  }

  useEffect(() => {
    fetchData()
  }, [id])

  return (
    <div
      className={`bg-secondary-700 transition-all shadow-300 p-6 w-[30rem] fixed top-0 right-0 min-h-screen ${
        toggle && loading === false ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex-center justify-between">
        <h2 className="font-medium text-xl">Client Details </h2>
        <span onClick={closeModal} className="cursor-pointer">
          <Image src="/icons/close.svg" alt="" height={24} width={24} />
        </span>
      </div>
      <div className="mt-8 flex-column gap-12">
        <div className="p-4 flex justify-between items-start gap-4">
          <div className="flex-column gap-6">
            <div>
              <h3 className="font-medium">{data?.data.issuedTo.fullname}</h3>
              <span className="text-sm text-primary-200/70">{data?.data.issuedTo.email}</span>
            </div>
            <div>
              <div className="text-xs">Invoice No: {data?.data.invoiceNo}</div>
              <div className="text-sm">{data?.data.issuedTo.billingAddress}</div>
            </div>
          </div>
          <div
            className={`rounded-full p-[0.32rem] font-medium ${
              data?.data?.status === 'PAID'
                ? 'text-[#308B05] bg-[#EAFFE0]'
                : data?.data?.status === 'DRAFT'
                ? 'bg-[#E1EAFF] text-primary-200'
                : data?.data?.status === 'UNPAID'
                ? 'text-[#FF9B0F] bg-[#FFF4E5]'
                : 'text-[#FF1D1D] bg-[#FFE8E8]'
            }`}
          >
            {data?.data.status}
          </div>
        </div>
        <div className="p-4 border-t border-secondary-100">
          <h2 className="font-medium text-xl">N{data?.data.totalAmount}</h2>
          <div className="mt-4 text-primary-200/50 text-sm">
            <h3 className="font-medium text-primary-200 text-base">Due on {formatDate(data?.data.dueDate)}</h3>
            <div className="mt-2">Issued on {formatDate(data?.data.issuedAt)}</div>
            <div>{data?.data.issuedTo.email}</div>
          </div>
        </div>
        <div className="p-4 border-t border-secondary-100">
          <div className="text-sm font-medium grid grid-cols-4 gap-4">
            <div>Invoice Item</div>
            <div className="text-right">Quantity</div>
            <div className="text-right">Unit Cost</div>
            <div className="text-right">Total Cost</div>
          </div>
          <div className="mt-4 flex-column gap-2 text-sm">
            {data?.data.invoiceItems.map((item: itemsI, index: number) => {
              return (
                <div key={index} className="text-sm font-medium grid grid-cols-4 gap-4">
                  <div>{item.item}</div>
                  <div className="text-right">{item.quantity}</div>
                  <div className="text-right">N{item.unitPrice}</div>
                  <div className="text-right">N{item.quantity * item.unitPrice}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default InvoiceDetails
