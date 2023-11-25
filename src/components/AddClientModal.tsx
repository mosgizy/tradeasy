'use client'

import {baseUrl} from '@/utils/constants'
import Image from 'next/image'
import React, {ChangeEvent, FormEvent, useState} from 'react'
import Cookies from 'js-cookie'
import useToaster from '@/hooks/useToast'

const AddClientModal = ({closeModal}: {closeModal: () => void}) => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone: '',
    billingAddress: '',
    clientType: ''
  })

  const token = Cookies.get('token')
  const notify = useToaster()

  const [loading, setloading] = useState(false)

  const handleForm = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = e.target
    setFormData({...formData, [name]: value})
  }

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
        closeModal()
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
          <label htmlFor="fullname" className="flex-column gap-1">
            <span>Client Name</span>
            <input
              type="text"
              name="fullname"
              id="fullname"
              onChange={handleForm}
              required
              className=" rounded-lg outline-none focus-within:border-primary-100 border border-secondary-100 px-2 py-1 w-full"
            />
          </label>
          <label htmlFor="email" className="flex-column gap-1">
            <span>Email Address</span>
            <input
              type="email"
              name="email"
              id="email"
              onChange={handleForm}
              required
              className=" rounded-lg outline-none focus-within:border-primary-100 border border-secondary-100 px-2 py-1 w-full"
            />
          </label>
          <label htmlFor="clientType" className="flex-column gap-1">
            <span>Client Type</span>
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
          <label htmlFor="phone" className="flex-column gap-1">
            <span>Phone Number</span>
            <input
              type="text"
              name="phone"
              id="phone"
              onChange={handleForm}
              required
              className=" rounded-lg outline-none focus-within:border-primary-100 border border-secondary-100 px-2 py-1 w-full"
            />
          </label>
          <label htmlFor="billingAddress" className="flex-column gap-1">
            <span>Billing Address</span>
            <input
              type="text"
              name="billingAddress"
              id="billingAddress"
              onChange={handleForm}
              required
              className=" h-16 rounded-lg outline-none focus-within:border-primary-100 border border-secondary-100 px-2 py-1 w-full"
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

export default AddClientModal
