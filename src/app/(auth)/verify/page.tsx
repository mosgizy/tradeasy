'use client'

import {baseUrl} from '@/utils/constants'
import Image from 'next/image'
import Link from 'next/link'
import React, {useState, useEffect, ChangeEvent, FormEvent} from 'react'
import {useRouter} from 'next/navigation'
import {registerStore} from '@/store/register'
import Cookies from 'js-cookie'

const Verify = () => {
  const [seconds, setSeconds] = useState(30)
  const [formData, setFormData] = useState({
    num1: '',
    num2: '',
    num3: '',
    num4: '',
    num5: ''
  })

  const {formData: vendor} = registerStore()

  const token = Cookies.get('token')

  const [loading, setloading] = useState(false)

  const router = useRouter()

  const handleForm = (e: ChangeEvent<HTMLInputElement>) => {
    const {name} = e.target
    const value = e.target.value.slice(0, 1)
    setFormData({...formData, [name]: value.slice(0, 1)})
  }

  // console.log(vendor)

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    const OTP = `${formData.num1}${formData.num2}${formData.num3}${formData.num4}${formData.num5}`
    e.preventDefault()
    setloading(true)
    try {
      const res = await fetch(`${baseUrl}/auth/verify-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({email: vendor.email, OTP})
      })

      const data = await res.json()
      console.log(data)

      if (res.ok) {
        router.push('/dasboard')
      }
    } catch (error) {
      console.error(error)
    }
  }

  const resendOTP = async () => {
    try {
      const res = await fetch(`${baseUrl}/auth/resend-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          authorization: `Bearer ${token}`
        },
        body: JSON.stringify({email: vendor.email})
      })

      const data = await res.json()

      if (res.ok) {
        setSeconds(30)
      }

      console.log(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (seconds <= 0) {
      return
    }

    const intervalId = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds - 1)
    }, 1000)

    return () => clearInterval(intervalId)
  }, [seconds])

  return (
    <div className="flex-[0_1_80%] md:flex-[0_1_45%]">
      <Link href="/" className="md:hidden flex-center justify-center gap-2 mb-8">
        <>
          <Image src="/icons/logo.svg" alt="" width={18} height={19} />
          <span className="text-2xl">Tradeazy.</span>
        </>
      </Link>
      <h1 className=" text-xl font-medium text-center md:text-left mb-1">Verify your Account</h1>
      <form onSubmit={submitForm}>
        <h2 className="font-medium my-[3.75rem] text-center md:text-left">
          we sent a code to your email, enter it below to verify your account{' '}
        </h2>
        <div className="flex-center justify-center gap-4 [&>input]:font-bold [&>input]:text-center [&>input]:text-3xl [&>input]:border [&>input]:border-secondary-300 [&>input]:rounded-lg [&>input:focus-within]:border-primary-100 [&>input]:outline-none [&>input]:w-[3.5rem] md:[&>input]:w-[4.5rem] [&>input]:h-[4.1rem] md:[&>input]:h-[5.1875rem] ">
          <input type="text" name="num1" id="" value={formData.num1} onChange={handleForm} maxLength={1} />
          <input type="text" name="num2" id="" value={formData.num2} onChange={handleForm} maxLength={1} />
          <input type="text" name="num3" id="" value={formData.num3} onChange={handleForm} maxLength={1} />
          <input type="text" name="num4" id="" value={formData.num4} onChange={handleForm} maxLength={1} />
          <input type="text" name="num5" id="" value={formData.num5} onChange={handleForm} maxLength={1} />
        </div>
        <button className=" rounded-lg bg-primary-100 py-3 mt-12 block w-full font-bold text-white">
          {loading ? <div className="loader"></div> : 'Verify Account'}
        </button>
        <div className="my-8 text-center md:text-left">
          I haven’t received the code,{' '}
          <span onClick={resendOTP} className="text-primary-100 cursor-pointer">
            Resend Code
          </span>
        </div>
        <div className="text-center md:text-left">
          Code will expire in <span className="text-primary-100">{seconds}Sec</span>
        </div>
      </form>
    </div>
  )
}

export default Verify
