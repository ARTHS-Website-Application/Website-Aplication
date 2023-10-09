import { call, put, takeEvery } from 'redux-saga/effects';
import { productInfor } from '../../../constants/mainConstants';
import { privateService } from '@/services/productService';
import { AxiosResponse } from 'axios';
import { ShowProductSuccess,ShowProductFailed } from '@/actions/product';

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


export function* lookupProduct() {
    yield takeEvery(productInfor.GET_PRODUCT_INFO , getProduct);
}