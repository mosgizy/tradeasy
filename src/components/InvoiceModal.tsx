'use client'

import {nextWeekDate} from '@/helpers/nextWeekDate'
import {clientI, itemsI} from '@/utils/interface'
import Image from 'next/image'
import {ChangeEvent, useState} from 'react'
import useFetch from '@/hooks/usefetch'

interface modalI {
  closeModal: () => void
  submitForm: (data: any, loader: any) => void
}

const InvoiceModal = ({closeModal, submitForm}: modalI) => {
  const [edit, setEdit] = useState(false)
  const [items, setItems] = useState<itemsI[]>([])
  const [total, setTotal] = useState(0)
  const [formData, setFormData] = useState({
    item: '',
    quantity: 0,
    unitPrice: 0,
    tax: 0,
    clientEmail: '',
    totalAmount: 0
  })

  const {data: clients} = useFetch(`client/all`)

  const {data} = useFetch('vendor/current')

  const handleForm = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = e.target
    setFormData({...formData, [name]: value})
  }

  const calcPercentage = () => {
    const {quantity, unitPrice, tax} = formData
    const totalPrice = total + Number(unitPrice) * Number(quantity)
    const taxPrice = (Number(tax) / 100) * totalPrice

    return taxPrice
  }

  const addItems = () => {
    const {item, quantity, unitPrice} = formData
    if (item !== '' && quantity !== 0 && unitPrice !== 0) {
      setItems([...items, {item, quantity: Number(quantity), unitPrice: Number(unitPrice)}])
      setTotal(total + Number(quantity) * Number(unitPrice))
      setFormData({...formData, item: '', quantity: 0, unitPrice: 0})
    }
  }

  const [loading, setLoading] = useState(false)

  const preview = () => {
    addItems()
    setEdit(true)
  }

  const submitInvoice = () => {
    const invoiceData = {
      clientEmail: formData.clientEmail,
      totalAmount: total + calcPercentage(),
      invoiceItems: items
    }
    submitForm(invoiceData, setLoading)
  }

  return (
    <div onClick={closeModal} className="modal-wrapper">
      <div onClick={e => e.stopPropagation()} className="modal md:min-w-[40rem]">
        {edit ? (
          <div className="flex md:justify-between mb-[4.25rem]">
            <div className="text-primary-200/50">
              <div className=" text-lg font-medium">
                Billed to: <span className="text-primary-200">{formData.clientEmail}</span>
              </div>
            </div>
            <div className="font-medium text-right">
              <div className="text-primary-200/50 text-sm">
                Due Date: <span className="text-primary-200">{nextWeekDate()}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-center justify-end py-4">
            <span onClick={closeModal} className="cursor-pointer">
              <Image src="/icons/close.svg" alt="" height={24} width={24} />
            </span>
          </div>
        )}
        {edit ? (
          <div className="font-medium text-center mb-4">
            <div className="text-primary-200/50 text-sm">PLEASE MAKE PAYABLE TO</div>
            <div className=" text-xl">{data?.data.businessName}</div>
          </div>
        ) : (
          <div className=" mt-5 mb-4 flex-column gap-4">
            <div className="grid grid-cols-3 gap-4">
              <label htmlFor="clientEmail" className="flex-column gap-1 col-span-2">
                <span className="text-sm font-medium">Recipient Email</span>
                <select
                  name="clientEmail"
                  id="clientEmail"
                  onChange={handleForm}
                  value={formData.clientEmail}
                  className="bg-secondary-700 rounded-lg outline-none focus-within:border-primary-100 border border-secondary-100 px-2 py-[0.437rem] w-full"
                >
                  <option></option>
                  {clients?.data?.result?.map((client: clientI) => {
                    return (
                      <option key={client.id} value={client.email}>
                        {client.email}
                      </option>
                    )
                  })}
                </select>
              </label>
              <label htmlFor="tax" className="flex-column gap-1">
                <span className="text-sm font-medium">Tax (%)</span>
                <input
                  type="text"
                  name="tax"
                  id="tax"
                  value={formData.tax}
                  onChange={handleForm}
                  required
                  className=" rounded-lg outline-none focus-within:border-primary-100 border border-secondary-100 px-2 py-1 w-full"
                />
              </label>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <label htmlFor="item" className="flex-column gap-1 col-span-2">
                <span className="text-sm font-medium">Invoice Item</span>
                <input
                  type="text"
                  name="item"
                  id="item"
                  value={formData.item}
                  onChange={handleForm}
                  required
                  className=" rounded-lg outline-none focus-within:border-primary-100 border border-secondary-100 px-2 py-1 w-full"
                />
              </label>
              <label htmlFor="quantity" className="flex-column gap-1">
                <span className="text-sm font-medium">Quantity</span>
                <input
                  type="number"
                  name="quantity"
                  id="quantity"
                  value={formData.quantity}
                  onChange={handleForm}
                  required
                  className=" rounded-lg outline-none focus-within:border-primary-100 border border-secondary-100 px-2 py-1 w-full"
                />
              </label>
              <label htmlFor="unitPrice" className="flex-column gap-1">
                <span className="text-sm font-medium">Unit Cost (NGN)</span>
                <input
                  type="number"
                  name="unitPrice"
                  id="unitPrice"
                  value={formData.unitPrice}
                  onChange={handleForm}
                  required
                  className=" rounded-lg outline-none focus-within:border-primary-100 border border-secondary-100 px-2 py-1 w-full"
                />
              </label>
            </div>
          </div>
        )}
        {!edit && (
          <div onClick={addItems} className="cursor-pointer text-primary-100 text-sm flex-center gap-2 mb-[1.69rem]">
            <Image src="/icons/plus.svg" alt="" height={16} width={16} />
            <span>Add Another Item</span>
          </div>
        )}
        <div className="bg-[#F1F4F9] rounded-md min-h-[7rem] py-3 px-4 text-primary-200/50">
          <div className="grid grid-cols-3">
            <div>Invoice Item</div>
            <div className="text-right">Quantity</div>
            <div className="text-right">Unit Cost</div>
          </div>
          <div className="text-primary-200 mt-4 flex-column gap-3">
            {items.map((item, index) => {
              return (
                <div key={index} className="grid grid-cols-3">
                  <div>{item.item}</div>
                  <div className="text-right">{item.quantity}</div>
                  <div className="text-right">N{item.unitPrice}</div>
                </div>
              )
            })}
          </div>
        </div>
        <div className="flex justify-between font-medium mt-8 pb-[2.62rem] border-b border-secondary-100">
          <div className="">
            <h3>Subtotal</h3>
            <span className="mt-4 block text-primary-200/50">(+) Tax</span>
          </div>
          <div>
            <h3>N{total + Number(formData.quantity) * Number(formData.unitPrice)}</h3>
            <span className="mt-4 block text-primary-200/50 text-right">{formData.tax}%</span>
          </div>
        </div>
        <div className="flex-center justify-between py-[2.62rem] border-b border-secondary-100">
          <h3>Total</h3>
          <h3>N{total + Number(formData.quantity) * Number(formData.unitPrice) + calcPercentage()}</h3>
        </div>
        <div className=" mt-6 flex justify-end">
          {edit ? (
            <div className="flex-center gap-6">
              <button
                onClick={() => setEdit(false)}
                className="font-medium rounded-lg border border-primary-100 text-primary-100 px-10 py-[0.875rem]"
              >
                Edit
              </button>
              <button
                onClick={submitInvoice}
                className="font-medium text-white rounded-lg bg-primary-100 px-10 py-[0.875rem]"
              >
                {loading ? <div className="loader"></div> : 'Send Invoice'}
              </button>
            </div>
          ) : (
            <button onClick={preview} className="font-medium text-white rounded-lg bg-primary-100 px-10 py-[0.875rem]">
              Preview
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default InvoiceModal
