import userAxiosPrivate from "@/hooks/useAxiosPrivate"
import { serviceFilter } from "@/types/actions/filterCreate";


export class Private {
    getProfile = async () => {
        const axiosPrivate =userAxiosPrivate();

        return await axiosPrivate.get(`/auth`)
    }
    getListStaff = async () => {
        const axiosPrivate = userAxiosPrivate();

        return await axiosPrivate.get(`/staffs`)
    }
    getListService = async (numberPagination: number) => {
        const axiosPrivate = userAxiosPrivate();
        return await axiosPrivate.get(`/repair-services?pageNumber=${numberPagination}`)
    }

    getListFilterService = async (data: serviceFilter<string, number>) => {
        const axiosPrivate = userAxiosPrivate();
        if(data.name){
            return await axiosPrivate.get(`/repair-services?name=${data.name}&pageNumber=${data.paginationNumber}`)
        }
    }
}

export const privateService = new Private();