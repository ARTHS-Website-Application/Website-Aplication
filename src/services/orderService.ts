import userAxiosPrivate from "@/hooks/useAxiosPrivate";
export class Private {
    getOrder = async (pageNumber:number)=>{
        const axiosPrivate = userAxiosPrivate();
        return await axiosPrivate.get(`/store-orders?pageNumber=${pageNumber}`)
    }
    getDetailOrder = async (id:string)=>{
        const axiosPrivate = userAxiosPrivate();
        return await axiosPrivate.get(`/store-orders/${id}`)
    }
}

export const orderService = new Private();