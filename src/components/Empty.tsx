import Image from 'next/image'

const Empty = () => {
  return (
    <div className="h-full flex-center justify-center mt-5">
      <div className="">
        <div>
          <span className="bg-[#EFF0F5] h-24 w-24 mx-auto rounded-full flex-center justify-center">
            <Image src="/images/activity.svg" alt="" height={56} width={56} />
          </span>
        </div>
        <div className="text-center mt-6">
          <div className="font-medium text-xl">Empty</div>
          <div className="text-sm">You have no recent activity</div>
        </div>
      </div>
    </div>
  )
}

export default Empty
