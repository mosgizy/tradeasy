const Activity = () => {
  return (
    <div>
      <div className="font-semibold flex-center justify-between">
        <h2 className="text-xl">Activity Summary</h2>
        <div className="text-primary-100 cursor-pointer">View all</div>
      </div>
      <div className="shadow-200 rounded-md py-6 px-8 mt-6 flex-column gap-[.31rem]">
        <div className="flex gap-4">
          <div className="w-4 h-4 rounded-full bg-[#FDCBBF] flex-center justify-center">
            <div className=" w-2 h-2 rounded-full bg-[#FF6641]"></div>
          </div>
          <div className="">
            <p>Invoice sent to silvergage boutique</p>
            <span className="text-[0.625rem]">2 mins ago</span>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-4 h-4 rounded-full bg-[#FDCBBF] flex-center justify-center">
            <div className=" w-2 h-2 rounded-full bg-[#FF6641]"></div>
          </div>
          <div className="">
            <p>Invoice sent to silvergage boutique</p>
            <span className="text-[0.625rem]">2 mins ago</span>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-4 h-4 rounded-full bg-[#FDCBBF] flex-center justify-center">
            <div className=" w-2 h-2 rounded-full bg-[#FF6641]"></div>
          </div>
          <div className="">
            <p>Invoice sent to silvergage boutique</p>
            <span className="text-[0.625rem]">2 mins ago</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Activity
