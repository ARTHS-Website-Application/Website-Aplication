import userAxiosPrivate from "@/hooks/useAxiosPrivate"
import { itemFilter } from "@/types/actions/filterCreate";


export class Private {
    getListProduct = async (numberPagination:number) => {
        const axiosPrivate = userAxiosPrivate();
        return await axiosPrivate.get(`/motobike-products?pageNumber=${numberPagination}`)
    }
    getCategoryProduct = async () => {
        const axiosPrivate = userAxiosPrivate();

        return await axiosPrivate.get(`/categories`)
    }
    getFilterCreateProduct = async (data: itemFilter<string,number>) => {
        const axiosPrivate = userAxiosPrivate();
        if (data.name && data.category) {
            const encodeName = encodeURIComponent(data.name);
            const encodeCategory = encodeURIComponent(data.category);
            return await axiosPrivate.get(`/motobike-products?name=${encodeName}&category=${encodeCategory}&pageNumber=${data.paginationNumber}`)
        }else if(data.name){
            const encodeName = encodeURIComponent(data.name);
            return await axiosPrivate.get(`/motobike-products?name=${encodeName}&pageNumber=${data.paginationNumber}`)
        }else if(data.category){
            const encodeCategory = encodeURIComponent(data.category);
            return await axiosPrivate.get(`/motobike-products?category=${encodeCategory}&pageNumber=${data.paginationNumber}`)
        }
    }

    getDetailProduct = async (id: string) => {
        const axiosPrivate = userAxiosPrivate();
        return await axiosPrivate.get(`/motobike-products/${id}`)
    }

}

export const privateService = new Private();