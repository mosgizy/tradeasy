'use client'

import {baseUrl} from '@/utils/constants'
import {ChangeEvent, FormEvent, useState} from 'react'
import Cookies from 'js-cookie'
import useToaster from '@/hooks/useToast'
import Image from 'next/image'
import useFetch from '@/hooks/usefetch'

interface modalI {
  closeModal: () => void
  fetchData: () => void
}

const PayoutModal = ({closeModal, fetchData}: modalI) => {
  const [formData, setFormData] = useState({
    bankCode: '',
    accountNumber: '',
    amount: 0,
    password: ''
  })
  const [accountName, setAccountName] = useState('')
  const handleForm = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = e.target
    if (name === 'accountNumber') {
      verifyAccountNumber()
    }
    setFormData({...formData, [name]: value})
  }

  const {data, loading: banksLoader} = useFetch('wallet/banks')

  // console.log(data)

  const [loading, setloading] = useState(false)

  const token = Cookies.get('token')
  const notify = useToaster()

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const {accountNumber, bankCode, password, amount} = formData
    const percent = (2 / Number(amount)) * 100
    setloading(true)
    try {
      const res = await fetch(`${baseUrl}/wallet/withdraw`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          bankCode: '004',
          accountNumber: '0690000032',
          password,
          amount: Number(amount) - percent
        })
      })

      const data = await res.json()

      if (!res.ok) {
        notify(data.message)
      }

      if (res.ok) {
        notify(data.message)
        fetchData()
        closeModal()
      }
      setloading(false)
    } catch (error) {
      console.error(error)
      setloading(false)
    }
  }

  const verifyAccountNumber = async () => {
    const {accountNumber, bankCode} = formData

    try {
      const res = await fetch(`${baseUrl}/wallet/verify-account`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          authorization: `Bearer ${token}`
        },
        body: JSON.stringify({bankCode: '004', accountNumber: '0690000032'})
      })

      const data = await res.json()

      if (res.ok) {
        setAccountName(data.data.account_name)
      }
    } catch (error) {
      console.error(error)
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
          <label htmlFor="bankCode" className="flex-column gap-1">
            <span>Select Bank</span>
            <select
              name="bankCode"
              id="bankCode"
              value={formData.bankCode}
              onChange={handleForm}
              className="bg-secondary-700 rounded-lg outline-none focus-within:border-primary-100 border border-secondary-100 px-2 py-[0.437rem] w-full"
            >
              <option></option>
              {banksLoader ? (
                <div className="flex-center justify-center">
                  <div className="loader"></div>
                </div>
              ) : (
                data?.data.map((bank: any) => {
                  return (
                    <option key={bank.id} value={bank.code}>
                      {bank.name}
                    </option>
                  )
                })
              )}
            </select>
          </label>
          <label htmlFor="accountNumber" className="flex-column gap-1">
            <span>Account Number</span>
            <input
              type="number"
              name="accountNumber"
              id="accountNumber"
              value={formData.accountNumber}
              onChange={handleForm}
              required
              className=" rounded-lg outline-none focus-within:border-primary-100 border border-secondary-100 px-2 py-1 w-full"
            />
          </label>
          {accountName && <div>{accountName}</div>}

          <hr className=" my-4" />

          <label htmlFor="amount" className="flex-column gap-1">
            <span>Amount</span>
            <input
              type="number"
              name="amount"
              id="amount"
              value={formData.amount}
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
              value={formData.password}
              onChange={handleForm}
              required
              className="rounded-lg outline-none focus-within:border-primary-100 border border-secondary-100 px-2 py-1 w-full"
            />
          </label>
          <button className="rounded-lg bg-primary-100 mt-3 py-3 block w-full font-bold text-white">
            {loading ? <div className="loader"></div> : 'Pay Out'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default PayoutModal
