import axios from "@/api/axios";
interface loginData{
    phone: string,
    password: string
}
export class publicAxios {
    login = async (data: loginData) => {
        return await axios.post('auth', data);
    };

    }

export const publicService = new publicAxios();

