import userAxiosPrivate from "@/hooks/useAxiosPrivate";
import { itemCreateOrder } from "@/types/actions/createOrder";


export class Private {
    createOrder = async (data:itemCreateOrder<string,number>)=>{
        const axiosPrivate = userAxiosPrivate();
        return await axiosPrivate.post("/store-orders",data)
    }
}

export const orderService = new Private();