import { postOrder } from "@/constants/mainConstants";
import { itemCreateOrder } from "@/types/actions/createOrder";

export const createOrder = (data:itemCreateOrder<string,number>) => {
    return {
        type: postOrder.POST_ORDER,
        data
    };
};

export const createOrderSuccess = (data:boolean) => {
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