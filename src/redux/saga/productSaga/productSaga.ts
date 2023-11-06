import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { productInfor, productFilter, detailProduct, productCreate, productUpdate } from '../../../constants/mainConstants';
import { privateService } from '@/services/productService';
import { AxiosResponse } from 'axios';
import {
    ShowProductSuccess,
    ShowProductFailed,
    CategoryProductSuccess,
    CategoryProductFailed,
    FilterProductSuccess,
    FilterProductFailed,
    getDetailProductSuccess,
    getDetailProductFailed,
    vehicleProductSuccess,
    vehicleProductFailed,
    WarrantyProductSuccess,
    WarrantyProductFailed,
    SortProduct
} from '@/actions/product';
import { payloadCreateProduct, payloadSaga, payloadSortProduct, payloadUpdateProduct, payloadUpdateStatusProduct } from '@/types/actions/product';
import { sagaDetailProduct } from '@/types/actions/detailProduct';
import { listVehicles, listWarranty, productCategory } from '@/constants/secondaryConstants';
import { History } from '@/context/NavigateSetter';
import { getFilter, getFilterProductInService, getFilterProductNotService } from '@/types/actions/filterCreate';
import { ownerService } from '@/services/ownerService';

function* createProduct(payload: payloadCreateProduct) {
    try {
        const resp: AxiosResponse = yield call(privateService.createProduct, payload.data);
        const { status, data } = resp;
        console.log("create", data)
        if (data && status === 201) {
            yield put(getDetailProductSuccess(data));
            if (History.navigate)
                History.navigate(`/manage-products/${data.id}`)
        } else {
            yield put(getDetailProductFailed(data));
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const msg: string = error.message;
        yield put(getDetailProductFailed(msg));
    }
}

function* updateProduct(payload: payloadUpdateProduct) {
    try {
        const resp: AxiosResponse = yield call(privateService.updateProduct, payload.idProduct, payload.data);
        const { status, data } = resp;
        console.log("update", data)
        if (data && status === 201) {
            yield put(getDetailProductSuccess(data));
        } else {
            yield put(getDetailProductFailed(data));
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const msg: string = error.message;
        yield put(getDetailProductFailed(msg));
    }
}

function* updateProductStatus(payload: payloadUpdateStatusProduct) {
    console.log("data",payload.data)
    try {
        const resp: AxiosResponse = yield call(privateService.updateProductStatus, payload.idProduct, payload.status);
        const { status, data } = resp;
        console.log("update", data)
        if (data && status === 201) {
            yield put(getDetailProductSuccess(data));
            yield put(SortProduct(payload.data))
        } else {
            yield put(getDetailProductFailed(data));
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const msg: string = error.message;
        yield put(getDetailProductFailed(msg));
    }
}

function* getProduct(payload: payloadSaga<string, number>) {
    try {
        const resp: AxiosResponse = yield call(privateService.getListProduct, payload.data);
        const { status, data } = resp;
        if (data && status === 200) {
            yield put(ShowProductSuccess(data));
        } else {
            yield put(ShowProductFailed(data));
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const msg: string = error.message;
        yield put(ShowProductFailed(msg));
    }
}

function* getSortProduct(payload: payloadSortProduct<string, number>) {
    try {
        const resp: AxiosResponse = yield call(privateService.getSortListProduct, payload.data);
        const { status, data } = resp;
        if (data && status === 200) {
            yield put(ShowProductSuccess(data));
        } else {
            yield put(ShowProductFailed(data));
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const msg: string = error.message;
        yield put(ShowProductFailed(msg));
    }
}

function* getCategoryProduct() {
    try {
        const resp: AxiosResponse = yield call(privateService.getCategoryProduct);
        const { status, data } = resp;
        if (data && status === 200) {
            yield put(CategoryProductSuccess(data));
        } else {
            yield put(CategoryProductFailed(data));
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const msg: string = error.message;
        yield put(CategoryProductFailed(msg));
    }

}

function* getWarrantyProduct() {
    try {
        const resp: AxiosResponse = yield call(privateService.getWarrantyProduct);
        const { status, data } = resp;
        if (data && status === 200) {
            yield put(WarrantyProductSuccess(data));
        } else {
            yield put(WarrantyProductFailed(data));
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const msg: string = error.message;
        yield put(WarrantyProductFailed(msg));
    }

}

function* getVehicleProduct() {
    try {
        const resp: AxiosResponse = yield call(privateService.getVehicleProduct);
        const { status, data } = resp;
        if (data && status === 200) {
            yield put(vehicleProductSuccess(data));
        } else {
            yield put(vehicleProductFailed(data));
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const msg: string = error.message;
        yield put(vehicleProductFailed(msg));
    }

}

function* getFilterProduct(payload: getFilter<string, number>) {
    console.log("payload", payload);
    try {
        const resp: AxiosResponse = yield call(privateService.getFilterCreateProduct, payload.data);
        const { status, data } = resp;
        if (data && status === 200) {
            yield put(FilterProductSuccess(data));
        } else {
            yield put(FilterProductFailed(data));
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const msg: string = error.message;
        yield put(FilterProductFailed(msg));
    }

}


function* getDetailProduct(payload: sagaDetailProduct) {
    try {
        const resp: AxiosResponse = yield call(privateService.getDetailProduct, payload.id);
        const { status, data } = resp;
        if (data && status === 200) {
            yield put(getDetailProductSuccess(data));
        } else {
            yield put(getDetailProductFailed(data));
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const msg: string = error.message;
        yield put(getDetailProductFailed(msg));
    }
}

function* getProductFilterService(payload: getFilterProductInService<string, number>) {
    try {
        const resp: AxiosResponse = yield call(ownerService.getProductInService, payload.data);
        const { status, data } = resp;
        if (data && status === 200) {
            yield put(FilterProductSuccess(data));
        } else {
            yield put(FilterProductFailed(data));
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const msg: string = error.message;
        yield put(FilterProductFailed(msg));
    }

}

function* getProductFilterNotService(payload: getFilterProductNotService<number>) {
    try {
        const resp: AxiosResponse = yield call(ownerService.getProductNotService, payload.data);
        const { status, data } = resp;
        if (data && status === 200) {
            yield put(FilterProductSuccess(data));
        } else {
            yield put(FilterProductFailed(data));
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const msg: string = error.message;
        yield put(FilterProductFailed(msg));
    }

}

export function* lookupProduct() {
    yield takeEvery(productCreate.PRODUCT_CREATE, createProduct);
    yield takeEvery(productUpdate.PRODUCT_UPDATE, updateProduct);
    yield takeLatest(productUpdate.PRODUCT_UPDATE_STATUS, updateProductStatus);
    yield takeEvery(productInfor.GET_PRODUCT_INFO, getProduct);
    yield takeEvery(productInfor.GET_SORT_PRODUCT_INFO, getSortProduct);
    yield takeEvery(productCategory.GET_PRODUCT_CATEGORY, getCategoryProduct);
    yield takeEvery(listWarranty.GET_LIST_WARRANTY, getWarrantyProduct);
    yield takeEvery(listVehicles.GET_LIST_VEHICLES, getVehicleProduct);
    yield takeEvery(productFilter.GET_PRODUCT_FILTER, getFilterProduct);
    yield takeEvery(productFilter.GET_PRODUCT_FILTER_SERVICE, getProductFilterService);
    yield takeEvery(productFilter.GET_PRODUCT_FILTER_NOT_SERVICE, getProductFilterNotService);
    yield takeEvery(detailProduct.DETAIL_PRODUCT, getDetailProduct);
}