import { productInfor } from "@/constants/mainConstants";
import { itemProduct } from "@/types/actions/product";

export const ShowProduct = () => {
    return {
        type: productInfor.GET_PRODUCT_INFO,
    };
};

export const ShowProductSuccess = (data:itemProduct<string,number>) => {
    return {
        type: productInfor.GET_PRODUCT_INFO_SUCCESS,
        payload: {
            data,
        },
    };
};
export const ShowProductFailed = (error:string) => {
    return {
        type: productInfor.GET_PRODUCT_INFO_FAIL,
        payload: {
            error,
        },
    };
};