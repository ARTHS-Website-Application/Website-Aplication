import {NavLink } from "react-router-dom"
import {roleAdmin,roleOwner,roleTeller} from '../constants/linkRole';

type Props = {
  role: string
}

const SiderBar = ({ role }: Props) => {
  const chooseRole = role === "Admin" ? roleAdmin : role === "Teller" ? roleTeller : role === "Owner" ? roleOwner:[];
  return (
    <div className="w-full h-full py-5 flex flex-col items-center">
      <h1 className="text-main text-[27px] font-semibold">Thanh Huy Store</h1>
      <div className="pt-3 w-full">
        <div className={`w-full  py-2`}>
          {chooseRole.map((route, index) => (
            <div key={index} className="w-full flex justify-center py-3 px-3  font-bold">
              <NavLink  to={route.to}
              className={({ isActive }) =>
                isActive
                  ? "w-full text-start pl-5 py-3 text-white bg-main rounded-md"
                  : "w-full text-start pl-5 py-3 hover:text-main text-[#757575]"
              }>
              {route.name}
            </NavLink>
            </div>
            
          ))}
        </div>

      </div>

    </div>
  )
}

export default SiderBar