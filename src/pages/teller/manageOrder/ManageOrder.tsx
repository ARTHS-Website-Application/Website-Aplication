import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {useEffect } from 'react'
const linkRole = [
  {
    to: '/manage-order/create-order',
    name: "Tạo đơn hàng"
  },
  {
    to: '/manage-order/order-service',
    name: "Tạo đơn dịch vụ"
  },
  {
    to: '/manage-order/list-order',
    name: "Danh sách đơn hàng"
  },
  {
    to: '/manage-order/history-order',
    name: "Lịch sử đơn hàng"
  }

]



const ManageOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/manage-order') {
      navigate('/manage-order/create-order');
    }
  }, [location.pathname, navigate]);
  return (
    <div className="w-full min-h-full">
      <div className="flex space-x-4 font-bold">
        {linkRole.map((route, index) => (
          <NavLink key={index} to={route.to}
            className={({ isActive }) =>
              isActive
                ? "bg-main text-white w-[200px] h-[45px] flex items-center justify-center rounded-md"
                : "bg-[#DEDEDE] w-[200px] text-white h-[45px] flex items-center justify-center hover:bg-main hover:text-white rounded-md"
            }>
            {route.name}
          </NavLink>
        ))}
      </div>
      <div className='pt-5 w-full h-full'>
        <Outlet />
      </div>

    </div>
  )
}

export default ManageOrder