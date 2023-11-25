'use client'

import Business from '@/components/Business'
import RegisterStep from '@/components/RegisterStep'
import Image from 'next/image'
import Link from 'next/link'
import {useState} from 'react'

const Register = () => {
  const [step, setStep] = useState(1)

  const updateStep = (num: number) => {
    setStep(num)
  }

  return (
    <div className="text-center md:text-left flex-[0_1_80%] md:flex-[0_1_45%] text-primary-200">
      <div className="md:hidden flex-center justify-center gap-2 mb-8">
        <Image src="/icons/logo.svg" alt="" width={18} height={19} />
        <span className="text-2xl">Tradeazy.</span>
      </div>
      <h2 className="text-xl md:text-2xl text-primary-200 font-medium mb-8 md:mb-[3.8rem] ">
        Create your Business Account
      </h2>
      <div className="font-bold text-primary-200 mb-10">{step} of 2 Steps</div>
      {step === 1 ? <RegisterStep updateStep={updateStep} /> : <Business />}
    </div>
  )
}

export default Register
