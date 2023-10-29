import { productInfor, productFilter, detailProduct, productCreate, productUpdate } from "@/constants/mainConstants";
import { listVehicles, productCategory } from "@/constants/secondaryConstants";
import { itemCategoryProduct } from "@/types/actions/categoryPr";
import { itemFilter } from "@/types/actions/filterCreate";
import { itemVehicleProduct } from "@/types/actions/listVehicle";
import { item, itemProduct } from "@/types/actions/product";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const postCreateProduct = (data:any) => {
    return {
        type: productCreate.PRODUCT_CREATE,
        data
    };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateProduct = (idProduct:string,data:any) => {
    return {
        type: productUpdate.PRODUCT_UPDATE,
        data,
        idProduct
    };
};

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

export const CategoryProductSuccess = (data:itemCategoryProduct<string>[]) => {
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

export const getVehicleProduct = () => {
    return {
        type: listVehicles.GET_LIST_VEHICLES,
    };
};

export const getVehicleSearch = (vehicleName:string) => {
    return {
        type: listVehicles.GET_LIST_VEHICLES_SEARCH,
        vehicleName
    };
};

export const vehicleProductSuccess = (data:itemVehicleProduct<string>[]) => {
    return {
        type: listVehicles.GET_LIST_VEHICLES_SUCCESS,
        payload: {
            data,
        },
    };
};
export const vehicleProductFailed = (error:string) => {
    return {
        type: listVehicles.GET_LIST_VEHICLES_FAil,
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

export const getDetailProduct = (id: string) => {
    return {
        type: detailProduct.DETAIL_PRODUCT,
        id
    };
};

export const getDetailProductSuccess = (data: item<string, number>) => {
    return {
        type: detailProduct.DETAIL_PRODUCT_SUCCESS,
        payload: {
            data,
        },
    };
};
export const getDetailProductFailed = (error: string) => {
    return {
        type: detailProduct.DETAIL_PRODUCT_FAIL,
        payload: {
            error,
        },
    };
};