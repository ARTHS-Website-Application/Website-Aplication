import { call, put, takeEvery } from 'redux-saga/effects';
import { productInfor,productFilter, detailProduct, productCreate, productUpdate } from '../../../constants/mainConstants';
import { privateService } from '@/services/productService';
import { AxiosResponse } from 'axios';
import { ShowProductSuccess,ShowProductFailed, CategoryProductSuccess, CategoryProductFailed, FilterProductSuccess, FilterProductFailed, getDetailProductSuccess, getDetailProductFailed, vehicleProductSuccess, vehicleProductFailed } from '@/actions/product';
import { getFilter } from '@/types/actions/filterCreate';
import { payloadCreateProduct, payloadSaga, payloadUpdateProduct } from '@/types/actions/product';
import { sagaDetailProduct } from '@/types/actions/detailProduct';
import { listVehicles, productCategory } from '@/constants/secondaryConstants';
import { payloadVehicle } from '@/types/actions/listVehicle';

function* createProduct(payload:payloadCreateProduct) {
    try {
        const resp: AxiosResponse = yield call(privateService.createProduct,payload.data);
        const { status, data } = resp;
        console.log("create",data)
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

function* updateProduct(payload:payloadUpdateProduct) {
    try {
        const resp: AxiosResponse = yield call(privateService.updateProduct,payload.idProduct, payload.data);
        const { status, data } = resp;
        console.log("update",data)
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

function* getProduct(payload:payloadSaga<number>) {
    try {
        const resp: AxiosResponse = yield call(privateService.getListProduct,payload.number);
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

function* getVehicleSearchProduct(payload:payloadVehicle<string>) {
    console.log("payload", payload);
    try {
        const resp: AxiosResponse = yield call(privateService.getVehicleSearchProduct,payload.vehicleName);
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

function* getFilterProduct(payload:getFilter<string,number>) {
    console.log("payload", payload);
    try {
        const resp: AxiosResponse = yield call(privateService.getFilterCreateProduct,payload.data);
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

function* getDetailProduct(payload:sagaDetailProduct){
    try {
        const resp: AxiosResponse = yield call(privateService.getDetailProduct,payload.id);
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


export function* lookupProduct() {
    yield takeEvery(productCreate.PRODUCT_CREATE , createProduct);
    yield takeEvery(productUpdate.PRODUCT_UPDATE , updateProduct);
    yield takeEvery(productInfor.GET_PRODUCT_INFO , getProduct);
    yield takeEvery( productCategory.GET_PRODUCT_CATEGORY, getCategoryProduct);
    yield takeEvery( listVehicles.GET_LIST_VEHICLES, getVehicleProduct);
    yield takeEvery( listVehicles.GET_LIST_VEHICLES_SEARCH, getVehicleSearchProduct);
    yield takeEvery( productFilter.GET_PRODUCT_FILTER, getFilterProduct);
    yield takeEvery( detailProduct.DETAIL_PRODUCT, getDetailProduct);
}