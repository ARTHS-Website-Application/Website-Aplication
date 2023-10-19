import React from 'react'

type Props = {}

const Notification = (props: Props) => {
  return (
    <div className="absolute z-10 right-0 top-0 pr-[250px]">
      <div className="bg-[#E5E5E5] w-[350px] h-[500px] rounded-[10px] space-y-3 p-1">
        <div className="flex justify-between bg-white hover:bg-mainB items-center rounded-md px-3">
        <div>
          <p>Tên Order</p>
          <p>Title</p>
          <p>Thoi gian</p>
        </div>
        <div className="bg-blue-600 rounded-full w-3 h-3"></div>
        </div>
        <div className="flex justify-between bg-white hover:bg-mainB items-center rounded-md px-3">
        <div>
          <p>Tên Order</p>
          <p>Title</p>
          <p>Thoi gian</p>
        </div>
        <div className="bg-blue-600 rounded-full w-3 h-3"></div>
        </div>~
      </div>

    </div>
  )
}

export default Notification;