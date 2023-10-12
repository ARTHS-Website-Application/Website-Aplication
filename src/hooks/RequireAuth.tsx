import { Outlet, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useState } from 'react';
import useAuth from "./useAuth";
import SiderBar from "@/components/SiderBar";
import Header from "@/components/Header";
import useLogout from "./useLogout";

type Props = {
  allowedRoles: string;
}

const RequireAuth = ({ allowedRoles }: Props) => {
  const [show, setShow] = useState<boolean>(false);
  const logout = useLogout();
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { auth }: any = useAuth();
  // const storedAuth = localStorage.getItem('auth');
  //   const initialAuth = storedAuth ? JSON.parse(storedAuth) : {};
  const location = useLocation();
  const handleLogout = () => {
    setShow(!show);
  }
  const signOut = async () => {
    await logout();
    navigate('/login');
  }
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    auth?.roles === allowedRoles
      ? (

        <div className='w-full min-h-screen flex bg-mainB'>
          <div className='bg-white w-[17%]'>
            <SiderBar role={auth?.roles} />
          </div>
          <div className='w-full px-5 '>
            <Header handleLogout={handleLogout} />
            <div className='w-full relative'>
              {show &&
                <div className='absolute right-0 top-0 pr-[49px] pt-2'>
                  <button
                    className="bg-[#E5E5E5] w-[150px] h-[50px] rounded-[10px] hover:text-main"
                    onClick={signOut}>
                    Đăng xuất
                  </button>
                </div>}
              <div className="w-full min-h-full pt-5">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      )
      // : auth?.accessToken
      //   ? <Navigate to="/unauthorized" state={{ from: location }} replace />
      : <Navigate to="/login" state={{ from: location }} replace />
  )
}

export default RequireAuth