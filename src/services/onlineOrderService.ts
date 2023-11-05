import userAxiosPrivate from "@/hooks/useAxiosPrivate"

export class Private{
    getOnlineOrder = async(pageNumber: number, filter:any) => {
        const axiosPrivate = userAxiosPrivate();
        const queryParams = new URLSearchParams({
            ...filter,
            pageNumber: pageNumber.toString()}
        );
        console.log('get list', queryParams.toString());
        return await axiosPrivate.get(`/online-orders?${queryParams}`);
    }

    getDetailOnlineOrder = async (id: string) => {
        const axiosPrivate = userAxiosPrivate();
        console.log('get by id_service', `/online-orders/${id}`);
        return await axiosPrivate.get(`/online-orders/${id}`);
    }
}
export const onlineOrderService = new Private();