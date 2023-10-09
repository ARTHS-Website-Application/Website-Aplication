import axios from "../api/axios";
import useAuth from "./useAuth";

const useLogout = ()=>{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const {setAuth}:any = useAuth();
    const logout = async()=>{
        setAuth({});
        localStorage.removeItem('auth');
    }
    return logout;
}

export default useLogout;