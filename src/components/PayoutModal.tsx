'use client'

import {baseUrl} from '@/utils/constants'
import {ChangeEvent, FormEvent, useState} from 'react'
import Cookies from 'js-cookie'
import useToaster from '@/hooks/useToast'
import Image from 'next/image'

const PayoutModal = ({closeModal}: {closeModal: () => void}) => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone: '',
    billingAddress: '',
    clientType: ''
  })
  const handleForm = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = e.target
    setFormData({...formData, [name]: value})
  }

  const [loading, setloading] = useState(false)

  const token = Cookies.get('token')
  const notify = useToaster()

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setloading(true)
    try {
      const res = await fetch(`${baseUrl}/client/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      if (!res.ok) {
        notify('Please provide all credentials')
      }

      if (res.ok) {
        notify(data.message)
        // closeModal()
      }
      setloading(false)
    } catch (error) {
      console.error(error)
      setloading(false)
    }
  }

  return (
    <div className="modal-wrapper" onClick={closeModal}>
      <div
        onClick={e => e.stopPropagation()}
        className="relative bg-secondary-700 rounded-2xl py-6 px-4 max-w-lg min-w-[25rem]"
      >
        <div className="flex-center justify-between">
          <h2 className="font-semibold text-xl">Client Details </h2>
          <span onClick={closeModal}>
            <Image src="/icons/close.svg" alt="" height={24} width={24} />
          </span>
        </div>

        <form onSubmit={submitForm} className="font-semibold mt-9 flex-column gap-3 [&_span]:text-sm">
          <label htmlFor="clientType" className="flex-column gap-1">
            <span>Select Bank</span>
            <select
              name="clientType"
              id="clientType"
              onChange={handleForm}
              className="bg-secondary-700 rounded-lg outline-none focus-within:border-primary-100 border border-secondary-100 px-2 py-[0.437rem] w-full"
            >
              <option></option>
              <option value="INDIVIDUAL">INDIVIDUAL</option>
              <option value="BUSINESS">BUSINESS</option>
            </select>
          </label>
          <label htmlFor="fullname" className="flex-column gap-1">
            <span>Account Number</span>
            <input
              type="number"
              name="fullname"
              id="fullname"
              onChange={handleForm}
              required
              className=" rounded-lg outline-none focus-within:border-primary-100 border border-secondary-100 px-2 py-1 w-full"
            />
          </label>

          <hr className=" my-4" />

          <label htmlFor="amount" className="flex-column gap-1">
            <span>Amount</span>
            <input
              type="number"
              name="amount"
              id="amount"
              onChange={handleForm}
              required
              className=" rounded-lg outline-none focus-within:border-primary-100 border border-secondary-100 px-2 py-1 w-full"
            />
          </label>
          <label htmlFor="password" className="flex-column gap-1">
            <span>Password</span>
            <input
              type="password"
              name="password"
              id="password"
              onChange={handleForm}
              required
              className="rounded-lg outline-none focus-within:border-primary-100 border border-secondary-100 px-2 py-1 w-full"
            />
          </label>
          <button className="rounded-lg bg-primary-100 mt-3 py-3 block w-full font-bold text-white">
            {loading ? <div className="loader"></div> : 'Add New Client'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default PayoutModal
