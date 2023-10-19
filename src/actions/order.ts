import { listOrder, detailOrder, updateUserOrder } from "@/constants/mainConstants";
import { itemDetailOrder } from "@/types/actions/detailOrder";
import { itemOrder } from "@/types/actions/listOrder";


export const getOrder = (number:number) => {
    return {
        type: listOrder.LIST_ORDER,
        number
    };
};

export const getOrderSuccess = (data:itemOrder<string,number>) => {
    return {
        type: listOrder.LIST_ORDER_SUCCESS,
        payload: {
            data,
        },
    };
};
export const getOrderFailed = (error:string) => {
    return {
        type: listOrder.LIST_ORDER_FAIL,
        payload: {
            error,
        },
    };
};

export const getDetailOrder = (id:string) => {
    return {
        type: detailOrder.DETAIL_ORDER,
        id
    };
};

export const getDetailOrderSuccess = (data:itemDetailOrder<string,number>) => {
    return {
        type: detailOrder.DETAIL_ORDER_SUCCESS,
        payload: {
            data,
        },
    };
};
export const getDetailOrderFailed = (error:string) => {
    return {
        type: detailOrder.DETAIL_ORDER_FAIL,
        payload: {
            error,
        },
    };
};

export const updateCustomerOrder = (id:string) => {
    return {
        type: updateUserOrder.UPDATE_USER_ORDER,
        id
    };
};

export const updateCustomerOrderSuccess = (data) => {
    return {
        type: updateUserOrder.UPDATE_USER_ORDER_SUCCESS,
        payload: {
            data,
        },
    };
};
export const updateCustomerOrderFailed = (error:string) => {
    return {
        type: updateUserOrder.UPDATE_USER_ORDER_FAIL,
        payload: {
            error,
        },
    };
};