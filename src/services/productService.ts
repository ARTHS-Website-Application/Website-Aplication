import userAxiosPrivate from "@/hooks/useAxiosPrivate"
import { itemFilter } from "@/types/actions/filterCreate";


export class Private {
    getProduct = async () => {
        const axiosPrivate = userAxiosPrivate();

        return await axiosPrivate.get(`/motobike-products`)
    }
    getCategoryProduct = async () => {
        const axiosPrivate = userAxiosPrivate();

        return await axiosPrivate.get(`/categories`)
    }
    getFilterCreateProduct = async (data: itemFilter<string>) => {
        const axiosPrivate = userAxiosPrivate();
        if (data.name && data.category) {
            const encodeName = encodeURIComponent(data.name);
            const encodeCategory = encodeURIComponent(data.category);
            return await axiosPrivate.get(`/motobike-products?name=${encodeName}&category=${encodeCategory}`)
        }else if(data.name){
            const encodeName = encodeURIComponent(data.name);
            return await axiosPrivate.get(`/motobike-products?name=${encodeName}`)
        }else if(data.category){
            const encodeCategory = encodeURIComponent(data.category);
            return await axiosPrivate.get(`/motobike-products?category=${encodeCategory}`)
        }
    }

}

export const privateService = new Private();