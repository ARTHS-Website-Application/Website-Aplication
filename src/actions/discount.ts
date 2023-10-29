import { listDiscount } from "@/constants/secondaryConstants";
import { itemDiscount } from "@/types/actions/listDiscout";

export const getDiscountChoose = () => {
    return {
        type: listDiscount.GET_LIST_DISCOUNT_CHOOSE,
        // pageSize
    };
};

export const getDiscount = (pageNumber: number) => {
    return {
        type: listDiscount.GET_LIST_DISCOUNT,
        pageNumber
    };
};

export const getDiscountSuccess = (data:itemDiscount<string,number>[]) => {
    return {
        type: listDiscount.GET_LIST_DISCOUNT_SUCCESS,
        payload: {
            data
        },
    };
};
export const getDiscountFailed = (error:string) => {
    return {
        type: listDiscount.GET_LIST_DISCOUNT_FAIL,
        payload: {
            error,
        },
    };
};