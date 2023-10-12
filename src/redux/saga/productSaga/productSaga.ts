import { call, put, takeEvery } from 'redux-saga/effects';
import { productInfor,productCategory,productFilter } from '../../../constants/mainConstants';
import { privateService } from '@/services/productService';
import { AxiosResponse } from 'axios';
import { ShowProductSuccess,ShowProductFailed, CategoryProductSuccess, CategoryProductFailed, FilterProductSuccess, FilterProductFailed } from '@/actions/product';
import { getFilter } from '@/types/actions/filterCreate';

function* getProduct() {
    try {
        const resp: AxiosResponse = yield call(privateService.getProduct);
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
        yield put(ShowProductFailed(msg));
    }

}

function* getFilterProduct(payload:getFilter<string>) {
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


export function* lookupProduct() {
    yield takeEvery(productInfor.GET_PRODUCT_INFO , getProduct);
    yield takeEvery( productCategory.GET_PRODUCT_CATEGORY, getCategoryProduct);
    yield takeEvery( productFilter.GET_PRODUCT_FILTER, getFilterProduct);
}