import { useEffect } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
const linkRole = [
  {
    to: '/manage-orders-owner/history-order',
    name: "Lịch sử đơn hàng"
  },

  {
    to: '/manage-orders-owner/cancel-order',
    name: "Đơn hàng đã hủy"
  }

]

const ManageOrderOwner = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/manage-orders-owner') {
      navigate('/manage-orders-owner/history-order');
    }
  }, [location.pathname, navigate]);
  return (
    <div className="w-full min-h-full">
      <div className="flex space-x-4 font-bold">
        {linkRole.map((route, index) => (
          <NavLink key={index} to={route.to}
            className={({ isActive }) =>
              `flex items-center justify-center px-3 h-[45px] rounded-md text-white
              ${isActive
                ? "bg-main"
                : "bg-[#DEDEDE] hover:bg-main"}`
            
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

export default ManageOrderOwner