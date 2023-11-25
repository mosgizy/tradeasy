'use client'

import {hasEmptyString} from '@/helpers/emptyString'
import {registerStore} from '@/store/register'
import Image from 'next/image'
import Link from 'next/link'
import {ChangeEvent, FormEvent, useState} from 'react'

const RegisterStep = ({updateStep}: {updateStep: (num: number) => void}) => {
  const [showPassword, setShowPassword] = useState(false)

  const {formData, setFormData} = registerStore()

  const handleForm = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target
    setFormData({...formData, [name]: value})
  }

  const nextOption = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!hasEmptyString(formData)) {
      updateStep(2)
    }
  }

  const togglePassword = (e: any) => {
    e.stopPropagation()
    setShowPassword(prev => !prev)
  }
  return (
    <>
      <form onSubmit={nextOption}>
        <div className="flex-column gap-3 [&_span]:font-semibold [&_span]:text-primary-200">
          <label htmlFor="business-name" className="flex-column gap-1">
            <span>Business name</span>
            <input
              type="text"
              name="businessName"
              id="business-name"
              value={formData.businessName}
              onChange={handleForm}
              required
              className=" rounded-lg outline-none focus-within:border-primary-100 border border-secondary-100 px-2 py-1 w-full"
            />
          </label>
          <label htmlFor="first-name" className="flex-column gap-1">
            <span>First Name</span>
            <input
              type="text"
              name="firstName"
              id="first-name"
              value={formData.firstName}
              onChange={handleForm}
              required
              className=" rounded-lg outline-none focus-within:border-primary-100 border border-secondary-100 px-2 py-1 w-full"
            />
          </label>
          <label htmlFor="last-name" className="flex-column gap-1">
            <span>Last Name</span>
            <input
              type="text"
              name="lastName"
              id="last-name"
              value={formData.lastName}
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
              value={formData.email}
              onChange={handleForm}
              required
              className=" rounded-lg outline-none focus-within:border-primary-100 border border-secondary-100 px-2 py-1 w-full"
            />
          </label>
          <label htmlFor="phone-number" className="flex-column gap-1">
            <span>Phone Number</span>
            <input
              type="text"
              name="phone"
              id="phone-number"
              value={formData.phone}
              onChange={handleForm}
              required
              className=" rounded-lg outline-none focus-within:border-primary-100 border border-secondary-100 px-2 py-1 w-full"
            />
          </label>
          <label htmlFor="password" className="flex-column gap-1">
            <span>Password</span>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                id="password"
                value={formData.password}
                onChange={handleForm}
                required
                className=" rounded-lg outline-none focus-within:border-primary-100 border border-secondary-100 px-2 py-1 w-full"
              />
              <Image
                src="/icons/eye.svg"
                alt=""
                height={16}
                width={16}
                onClick={togglePassword}
                className="absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer"
              />
            </div>
          </label>
        </div>

        <button className=" rounded-lg bg-primary-100 py-3 my-6 block w-full font-bold text-white">Next</button>
        <div className="font-medium">
          Already Have an account,{' '}
          <Link href="/login" className="text-primary-100">
            Login
          </Link>
        </div>
      </form>
      <div className="text-sm font-medium flex-center gap-1 rounded-full border border-secondary-200 max-w-fit px-1 py-1 mt-24">
        <Image src="/icons/shield.svg" alt="" width={10} height={12} />
        <span>100% Secure</span>
      </div>
    </>
  )
}

export default RegisterStep
