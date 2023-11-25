'use client'

import Activity from '@/components/Activity'
import Chart from '@/components/Chart'
import useFetch from '@/hooks/usefetch'
import {registerStore} from '@/store/register'
import {arrowLeft, arrowRight, down} from '@/utils/icons'
import {useEffect} from 'react'

const Dashboard = () => {
  const {data, loading} = useFetch('vendor/current')
  const {setVendorData} = registerStore()

  // console.log(data)

  useEffect(() => {
    setVendorData({...data?.data})
  }, [data])

  return (
    <div>
      <h2 className="font-semibold text-xl">Overview</h2>
      <div className="mt-6 grid grid-cols-3 gap-4 font-medium">
        <div className=" flex-column gap-4 py-6 px-8 rounded-lg shadow-100">
          <div>Total Payment Received</div>
          <div className="text-2xl">
            {loading ? <div className="loader"></div> : <span>N{data?.data.totalCredit}</span>}
          </div>
        </div>
        <div className=" flex-column gap-4 py-6 px-8 rounded-lg shadow-100">
          <div>Total Withdrawn</div>
          <div className="text-2xl">
            {loading ? <div className="loader"></div> : <span>N{data?.data.totalWithdrawal}</span>}
          </div>
        </div>
        <div className=" flex-column gap-4 py-6 px-8 rounded-lg shadow-100">
          <div>Balance</div>
          <div className="text-2xl">
            {' '}
            {loading ? <div className="loader"></div> : <span>N{data?.data.balance}</span>}
          </div>
        </div>
      </div>
      <div className="py-14 grid grid-cols-3 gap-4">
        <div className=" col-span-2">
          <h2 className="font-semibold text-xl">Invoices</h2>
          <div className="shadow-200 rounded-md py-6 mt-6">
            <div className="flex items-start justify-between font-medium px-8 pb-7 border-b border-secondary-100">
              <div>
                <h3>Total invoice drafted for the week</h3>
                <div className=" text-[2.5rem]">350</div>
              </div>
              <div className="flex gap-8 max-h-fit">
                <div className="flex-center gap-3">
                  {arrowLeft}
                  {arrowRight}
                </div>
                <div className="flex-center gap-2 border border-secondary-300 font-medium rounded-[0.25rem] px-1 py-[0.1875rem]">
                  <span>Week</span>
                  {down}
                </div>
              </div>
            </div>
            <div>
              <Chart />
            </div>
          </div>
        </div>
        <Activity />
      </div>
    </div>
  )
}

export default Dashboard
