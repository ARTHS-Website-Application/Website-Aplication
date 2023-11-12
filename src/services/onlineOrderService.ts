import userAxiosPrivate from "@/hooks/useAxiosPrivate"
import { callFilterOrder } from "@/types/actions/listOrder";

export class Private{
    getOnlineOrder = async(data:callFilterOrder<string,number>) => {
        const axiosPrivate = userAxiosPrivate();
        const encodeOrderStatus = encodeURIComponent(data?.orderStatus);
        const encodeUserName = encodeURIComponent(data.customerName);
        const queryParams = new URLSearchParams({customerPhone:data.customerPhone, pageNumber: data.number.toString()});
        return await axiosPrivate.get(`/orders?orderType=Online&${queryParams}&orderStatus=${encodeOrderStatus}&customerName=${encodeUserName}`)
    }

    getDetailOnlineOrder = async (id: string) => {
        const axiosPrivate = userAxiosPrivate();
        console.log('get by id_service', `/orders/${id}`);
        return await axiosPrivate.get(`/orders/${id}`);
    }
}
export const onlineOrderService = new Private();