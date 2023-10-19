import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BellIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import { ShowProfile } from '@/actions/userInfor';
import { itemProfile, selectorProfile } from '@/types/actions/profile';

type props = {
  handleLogout: () => void;
  handleNotification:()=> void;
}
const Header = ({ handleLogout ,handleNotification}: props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ShowProfile());
  }, [])
  const profile: itemProfile<string> = useSelector((state: selectorProfile<string>) => state.userReducer.infor);
  let roleText = "";
  if (profile.role === "Teller") {
    roleText = "Nhân viên thanh toán";
  } else if (profile.role === "Owner") {
    roleText = "Chủ cửa hàng";
  }else if (profile.role === "Admin") {
    roleText = "Admin";
  }else {
    roleText="";
  }

  return (
    <div className='w-full pt-3 flex items-center justify-between'>
      <div>
        <h2 className='text-[24px]'>Xin chào, {profile.fullName}</h2>
        <p className='text-[#757575] text-sm'>Chúc một ngày tốt lành</p>
      </div>
      <div className="flex items-center">
        <button className='px-5'
        onClick={handleNotification}
        >
          <BellIcon className='h-6 w-6' />
        </button>
        <div className='flex  border-l-2 border-[#C2C2C2] px-5 py-2 '>
          {profile.avatar
            ? <div className='bg-gray-20 bg-center h-[45px] w-[45px] rounded-full'
              style={{ backgroundImage: `url(${profile.avatar})` }}>
            </div>
            : <div className='bg-gray-20 bg-center h-[45px] w-[45px] rounded-full'
              style={{ backgroundImage: "url('https://mdbcdn.b-cdn.net/img/Photos/Vertical/mountain3.webp')" }}>
            </div>
          }

          <div className='px-3'>
            <h2 className='text-[20px]'>{profile.fullName}</h2>
            <p className='text-xs text-gray-500'>{roleText}</p>
          </div>
          <button onClick={handleLogout}>
            <ChevronDownIcon className='h-8 w-8' />
          </button>
        </div>

      </div>
    </div>

  )
}

export default Header