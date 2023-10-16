import { NavLink, Outlet } from 'react-router-dom';
import {useEffect} from 'react'
const linkRole =[ 
  {
    to:'/manage-order/create-order',
    name:"Tạo đơn hàng"
  },
  {
    to:'/manage-order/list-order',
    name:"Danh sách đơn hàng"
  },
  {
    to:'/manage-order/history-order',
    name:"Lịch sử đơn hàng"
  }

]



const ManageOrder = () => {
  return (
    <div className="w-full min-h-full">
      <div className="flex space-x-4 font-bold">
        {linkRole.map((route,index)=>(
          <NavLink key={index} to={route.to} 
          end={route.to ==='/manage-order/list-order'}
          className={({isActive})=>
            isActive
            ?"bg-main text-white w-[200px] h-[45px] flex items-center justify-center rounded-md"
            :"bg-[#DEDEDE] w-[200px] text-white h-[45px] flex items-center justify-center hover:bg-main hover:text-white rounded-md"
          }>
          {route.name}
        </NavLink>
        ))}
      </div>
      <div className='pt-5 w-full h-full'>
        <Outlet/>
      </div>

    </div>
  )
}

export default ManageOrder