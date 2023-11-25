'use client'

import {registerStore} from '@/store/register'
import {baseUrl} from '@/utils/constants'
import Link from 'next/link'
import {ChangeEvent, FormEvent, useState} from 'react'
import Cookies from 'js-cookie'
import {useRouter} from 'next/navigation'
import useToaster from '@/hooks/useToast'

const Business = () => {
  const {formData, setFormData} = registerStore()

  const router = useRouter()
  const [loading, setloading] = useState(false)

  const handleForm = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target
    setFormData({...formData, [name]: value})
  }

  const notify = useToaster()

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setloading(true)
    try {
      const res = await fetch(`${baseUrl}/auth/sign-up`, {
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
        Cookies.set('token', data.data.token, {secure: true, sameSite: 'strict', expires: Date.now() - oneDay})
        router.push('/verify')
      }
      setloading(false)
    } catch (error) {
      console.error(error)
      setloading(false)
    }
  }

  return (
    <>
      <h2 className="font-semibold text-xl mb-[2.88rem]">What type of business are run?</h2>
      <form onSubmit={submitForm}>
        <ul className="[&_h2]:text-xl [&_h2]:font-medium [&_h2]:mb-[0.94rem] flex-column gap-6 text-left">
          <li>
            <label htmlFor="start" className="flex items-start gap-2">
              <input
                onChange={handleForm}
                type="radio"
                name="businessType"
                value="INDIVIDUAL"
                checked={formData.businessType === 'INDIVIDUAL'}
                id="start"
                className="mt-2"
              />
              <div>
                <h2>I&apos;m just starting </h2>
                <p>I&apos;m getting ready to register my business and testing my concepts with real customers.</p>
              </div>
            </label>
          </li>
          <li>
            <label htmlFor="register" className="flex items-start gap-2">
              <input
                onChange={handleForm}
                type="radio"
                name="businessType"
                value="ORGANIZATION"
                checked={formData.businessType === 'ORGANIZATION'}
                id="register"
                className="mt-2"
              />
              <div>
                <h2>Registered </h2>
                <p>My business is documented, licenced and approved by the law</p>
              </div>
            </label>
          </li>
        </ul>
        <div className="text-xs mt-[2.81rem]">
          By clicking the create account button, you agree to{' '}
          <span className="text-primary-100">Tradeasy term and condition</span>
        </div>
        <button className=" rounded-lg bg-primary-100 py-3 my-6 block w-full font-bold text-white">
          {loading ? <div className="loader"></div> : 'Create Account'}
        </button>
        <div className="font-medium">
          Already Have an account,{' '}
          <Link href="/login" className="text-primary-100">
            Login
          </Link>
        </div>
      </form>
    </>
  )
}

export default Business
