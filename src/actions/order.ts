import { postOrder,listOrder, detailOrder } from "@/constants/mainConstants";
import { itemCreateOrder } from "@/types/actions/createOrder";
import { itemDetailOrder } from "@/types/actions/detailOrder";
import { itemOrder } from "@/types/actions/listOrder";

export const createOrder = (data:itemCreateOrder<string,number>) => {
    return {
        type: postOrder.POST_ORDER,
        data
    };
};

export const createOrderSuccess = (data) => {
    return {
        type: postOrder.POST_ORDER_SUCCESS,
        payload: {
            data,
        },
    };
};
export const createOrderFailed = (error:string) => {
    return {
        type: postOrder.POST_ORDER_FAIL,
        payload: {
            error,
        },
    };
};

export const getOrder = () => {
    return {
        type: listOrder.LIST_ORDER,
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