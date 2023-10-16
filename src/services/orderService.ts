import userAxiosPrivate from "@/hooks/useAxiosPrivate";
export class Private {
    getOrder = async ()=>{
        const axiosPrivate = userAxiosPrivate();
        return await axiosPrivate.get("/store-orders")
    }
    getDetailOrder = async (id:string)=>{
        const axiosPrivate = userAxiosPrivate();
        return await axiosPrivate.get(`/store-orders/${id}`)
    }
}

export const orderService = new Private();