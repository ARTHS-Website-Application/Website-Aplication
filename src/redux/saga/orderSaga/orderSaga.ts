import { getDetailOrderFailed, getDetailOrderSuccess, getOrderFailed, getOrderSuccess } from '@/actions/order';
import {listOrder, detailOrder } from '@/constants/mainConstants';
import { orderService } from '@/services/orderService';
import { sagaDetailOrder } from '@/types/actions/detailOrder';
import { payloadOrder } from '@/types/actions/listOrder';
import { AxiosResponse } from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';


function* getOrder(payload:payloadOrder<number>){
    try {
        const resp: AxiosResponse = yield call(orderService.getOrder,payload.number);
        const { status, data } = resp;
        if (data && status === 200) {
            yield put(getOrderSuccess(data));
        } else {
            yield put(getOrderFailed(data));
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const msg: string = error.message;
        yield put(getOrderFailed(msg));
    }
}

function* getDetailOrder(payload:sagaDetailOrder){
    try {
        const resp: AxiosResponse = yield call(orderService.getDetailOrder,payload.id);
        const { status, data } = resp;
        if (data && status === 200) {
            yield put(getDetailOrderSuccess(data));
        } else {
            yield put(getDetailOrderFailed(data));
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const msg: string = error.message;
        yield put(getDetailOrderFailed(msg));
    }
}

export function* lookupOrder() {
    yield takeEvery(listOrder.LIST_ORDER , getOrder);
    yield takeEvery(detailOrder.DETAIL_ORDER , getDetailOrder);
}