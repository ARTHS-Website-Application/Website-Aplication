import userAxiosPrivate from "@/hooks/useAxiosPrivate";
import { filterProductInService, filterProductNotService } from "@/types/actions/filterCreate";
import { itemServiceChoose } from "@/types/actions/listService";

export class Private {
    getServiceCreate = async (data: itemServiceChoose<string,number>) => {
        const axiosPrivate = userAxiosPrivate();
        const endCodeStatus = encodeURIComponent(data.status);
        return await axiosPrivate.get(`/repair-services?status=${endCodeStatus}&pageSize=${data.pageSize}`)
    }
    getProductInService = async (data:filterProductInService<string,number>) => {
        const axiosPrivate = userAxiosPrivate();
        if(data.repairService){
            const encodeName = encodeURIComponent(data.repairService);
            return await axiosPrivate.get(`/motobike-products?repairService=${encodeName}&pageSize=${data.pageSize}`)
        }
    }

    getProductNotService = async(data:filterProductNotService<number>)=>{
        const axiosPrivate = userAxiosPrivate();
        return await axiosPrivate.get(`/motobike-products?noRepairService=${data.noRepairService}&pageSize=${data.pageSize}`)
    }
    getDiscountCreate = async () => {
        const axiosPrivate = userAxiosPrivate();
        return await axiosPrivate.get(`/discounts`)
    }

    
}

export const ownerService = new Private();