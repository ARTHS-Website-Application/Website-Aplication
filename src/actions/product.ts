import { productInfor, productCategory, productFilter } from "@/constants/mainConstants";
import { itemCategoryProduct } from "@/types/actions/categoryPr";
import { itemFilter } from "@/types/actions/filterCreate";
import { itemProduct } from "@/types/actions/product";

export const ShowProduct = (number:number) => {
    return {
        type: productInfor.GET_PRODUCT_INFO,
        number:number
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

export const CategoryProduct = () => {
    return {
        type: productCategory.GET_PRODUCT_CATEGORY,
    };
};

export const CategoryProductSuccess = (data:itemCategoryProduct<string>) => {
    return {
        type: productCategory.GET_PRODUCT_CATEGORY_SUCCESS,
        payload: {
            data,
        },
    };
};
export const CategoryProductFailed = (error:string) => {
    return {
        type: productCategory.GET_PRODUCT_CATEGORY_FAIL,
        payload: {
            error,
        },
    };
};

export const FilterProduct = (data:itemFilter<string,number>) => {
    return {
        type: productFilter.GET_PRODUCT_FILTER,
        data
    };
};

export const FilterProductSuccess = (data:itemProduct<string,number>) => {
    return {
        type: productFilter.GET_PRODUCT_FILTER_SUCCESS,
        payload: {
            data,
        },
    };
};
export const FilterProductFailed = (error:string) => {
    return {
        type: productFilter.GET_PRODUCT_FILTER_FAIL,
        payload: {
            error,
        },
    };
};