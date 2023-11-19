import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import userAxiosPrivate from "./useAxiosPrivate";

const useLogout = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { setAuth }: any = useAuth();
    const axiosPrivate = userAxiosPrivate();
    const navigate = useNavigate();
    const logout = async () => {
        try {
            navigate('/');
            const response = await axiosPrivate('/auth/logout', {
                withCredentials: true
            });
            if (response) {
                setAuth({});
                localStorage.removeItem('auth');
                
            }

        } catch (error) {
            console.error(error);
        }

    }
    return logout;
}

export default useLogout;