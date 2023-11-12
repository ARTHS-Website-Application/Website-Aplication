import useAuth from "./useAuth";
import userAxiosPrivate from "./useAxiosPrivate";

const useLogout = ()=>{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const {setAuth}:any = useAuth();
    const axiosPrivate = userAxiosPrivate();
    const logout = async()=>{
        try {
            const response = await axiosPrivate('/auth/logout', {
                withCredentials: true
            });
            response;
            setAuth({});
        localStorage.removeItem('auth');
        } catch (error) {
            console.error(error);
        }
        
    }
    return logout;
}

export default useLogout;