import { getDetailOnlineOrderSuccess, getOnlineOrderFailed, getOnlineOrderSuccess } from "@/actions/onlineOrder";
import { getDetailOrderFailed } from "@/actions/order";
import { detailOnlineOrder, listOnlineOrder } from "@/constants/mainConstants";
import { onlineOrderService } from "@/services/onlineOrderService";
import { payloadDetailOnlineOrder, payloadOnlineOrder } from "@/types/actions/listOnlineOrder";
import { AxiosResponse } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";

function* getOnlineOrder(payload: payloadOnlineOrder<number>) {
    try {
        const resp: AxiosResponse = yield call(onlineOrderService.getOnlineOrder, payload.number, payload.filter);
        const { status, data } = resp;
        if (data && status === 200) {
            yield put(getOnlineOrderSuccess(data));
        } else {
            yield put(getOnlineOrderFailed(data));
        }
    } catch (error: any) {
        const msg: string = error.message;
        yield put(getOnlineOrderFailed(msg));
    }
}
function* getDetailOnlineOrder(payload: payloadDetailOnlineOrder<string>) {
    try {
        const resp: AxiosResponse = yield call(onlineOrderService.getDetailOnlineOrder, payload.id);
        const { status, data } = resp;
        if (data && status === 200) {
            yield put(getDetailOnlineOrderSuccess(data));
        } else {
            yield put(getDetailOrderFailed(data));
        }
    } catch (error: any) {
        const msg: string = error.message;
        yield put(getDetailOrderFailed(msg));
    }
}

export function* lookupOnlineOrder() {
    yield takeEvery(listOnlineOrder.LIST_ONLINE_ORDER, getOnlineOrder);
    yield takeEvery(detailOnlineOrder.DETAIL_ONLINE_ORDER, getDetailOnlineOrder);
}