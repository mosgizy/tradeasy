'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, {ChangeEvent, FormEvent, useState} from 'react'
import Cookies from 'js-cookie'
import {useRouter} from 'next/navigation'
import {baseUrl} from '@/utils/constants'
import useToaster from '@/hooks/useToast'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const notify = useToaster()

  const router = useRouter()
  const [loading, setloading] = useState(false)

  const handleForm = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target
    setFormData({...formData, [name]: value})
  }

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setloading(true)
    try {
      const res = await fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      if (!res.ok) {
        notify(data.message)
      }

      if (res.ok) {
        const oneDay = 24 * 60 * 60 * 1000
        Cookies.set('token', data.data.token, {secure: true,  expires: Date.now() - oneDay})
        router.push('/dashboard')
      }
      setloading(false)
    } catch (error) {
      console.error(error)
      setloading(false)
    }
  }

  const togglePassword = () => {
    setShowPassword(prev => !prev)
  }

  return (
    <div className="flex-[0_1_80%] md:flex-[0_1_45%]">
      <Link href="/" className="md:hidden flex-center justify-center gap-2 mb-8">
        <>
          <Image src="/icons/logo.svg" alt="" width={18} height={19} />
          <span className="text-2xl">Tradeazy.</span>
        </>
      </Link>

      <h2 className="text-2xl text-center md:text-left text-primary-200 font-medium mb-[4.5rem] ">Login</h2>

      <form onSubmit={submitForm}>
        <div className="flex-column gap-3 [&_span]:font-semibold [&_span]:text-primary-200">
          <label htmlFor="email" className="flex-column gap-1">
            <span>Email</span>
            <input
              type="email"
              name="email"
              id="email"
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
        <Link href="#" className="text-sm font-medium text-primary-200/50">
          Forget Password?
        </Link>
        <button className=" rounded-lg bg-primary-100 py-3 my-6 block w-full font-bold text-white">
          {loading ? <div className="loader"></div> : 'Next'}
        </button>
        <div className="font-medium text-center md:text-left">
          Don&apos;t Have an account,{' '}
          <Link href="/register" className="text-primary-100">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Login
