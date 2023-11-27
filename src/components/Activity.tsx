'use client'

import {calculateTimeInterval} from '@/helpers/timeInterval'
import useFetch from '@/hooks/usefetch'
import Image from 'next/image'
import Empty from './Empty'

interface activityI {
  action: string
  message: string
  createdAt: string
}

const Activity = () => {
  const {data, loading} = useFetch('vendor/activity')

  return (
    <div className="w-full">
      <div className="font-semibold flex-center justify-between">
        <h2 className="text-xl">Activity Summary</h2>
        <div className="text-primary-100 cursor-pointer">View all</div>
      </div>
      <div className="shadow-200 rounded-md py-6 px-8 mt-6 flex-column gap-[.31rem]">
        {loading ? (
          <div className="flex-center justify-center">
            <div className="loader"></div>
          </div>
        ) : data?.data.length < 1 ? (
          <Empty />
        ) : (
          data?.data.map((activity: activityI, index: number) => {
            const {value, unit} = calculateTimeInterval(activity.createdAt)
            return (
              <div key={index} className="flex gap-4">
                <div className="w-4 h-4 rounded-full bg-[#FDCBBF] flex-center justify-center">
                  <div className=" w-2 h-2 rounded-full bg-[#FF6641]"></div>
                </div>
                <div className="">
                  <p>{activity.message}</p>
                  <span className="text-[0.625rem]">{`${value} ${unit} ago`}</span>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default Activity
