import { listServices } from "@/constants/secondaryConstants";
import { serviceFilter } from "@/types/actions/filterCreate";
import { dataService } from "@/types/actions/listService";

export const getServicesChoose = (pageSize: number) => {
    return {
        type: listServices.GET_LIST_SERVICES_CHOOSE,
        pageSize
    };
};

export const getServices = (pageNumber: number) => {
    return {
        type: listServices.GET_LIST_SERVICES,
        pageNumber
    };
};

export const getFilterServices = (data: serviceFilter<string,number>) => {
    return {
        type: listServices.GET_LIST_SERVICES_FILTER,
        data
    };
};

export const getServicesSuccess = (data:dataService<string,number>) => {
    return {
        type: listServices.GET_LIST_SERVICES_SUCCESS,
        payload: {
            data
        },
    };
};
export const getServicesFailed = (error:string) => {
    return {
        type: listServices.GET_LIST_SERVICES_FAIL,
        payload: {
            error,
        },
    };
};