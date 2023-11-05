import { detailOnlineOrder, listOnlineOrder } from "@/constants/mainConstants"
import { itemOnlineOrder } from "@/types/actions/listOnlineOrder";

export const getOnlineOrder = (number: number, filter: any) => {
    return{
        type: listOnlineOrder.LIST_ONLINE_ORDER,
        number,
        filter,
    }
};

export const getOnlineOrderSuccess = (data: itemOnlineOrder<string, number>) => {
    return {
        type: listOnlineOrder.LIST_ORDER_SUCCESS,
        payload: {
            data,
        },
    };
};
export const getOnlineOrderFailed = (error: string) => {
    return {
        type: listOnlineOrder.LIST_ORDER_FAIL,
        payload: {
            error,
        },
    };
};

export const getDetailOnlineOrder = (id: string) => {
    return {
        type: detailOnlineOrder.DETAIL_ONLINE_ORDER,
        id
    };
};

export const getDetailOnlineOrderSuccess = (data: itemOnlineOrder<string, number>) => {
    return {
        type: detailOnlineOrder.DETAIL_ONLINE_ORDER_SUCCESS,
        payload: {
            data,
        },
    };
};
export const getDetailOnlineOrderFailed = (error: string) => {
    return {
        type: detailOnlineOrder.DETAIL_ONLINE_ORDER_FAIL,
        payload: {
            error,
        },
    };
};
