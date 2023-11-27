import { getRevenueFailed, getRevenueSuccess, getStaticsFailed, getStaticsSuccess } from "@/actions/revenue";
import { listRevenue, listStatics } from "@/constants/mainConstants";
import { revenueService } from "@/services/revenueService";
import { payloadRevenue, payloadStatics } from "@/types/revenue";
import { AxiosResponse } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";

function* getRevenue(payload: payloadRevenue<number>) {
    try {
        const { pageNumber, filters } = payload;
        const response: AxiosResponse = yield call(revenueService.getRevenue, pageNumber, filters);
        const { status, data } = response;
        if (data && status === 200) {
            yield put(getRevenueSuccess(data));
        } else {
            yield put(getRevenueFailed(data));
        }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const msg: string = error.message;
        yield put(getRevenueFailed(msg));
    }
}

function* getStatics(payload: payloadStatics) {
    try {
        const { filters } = payload;
        const response: AxiosResponse = yield call(revenueService.getStatics, filters);
        const { status, data } = response;
        if (data && status === 200) {
            yield put(getStaticsSuccess(data));
        } else {
            yield put(getStaticsFailed(data));
        }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const msg: string = error.message;
        yield put(getStaticsFailed(msg));
    }
}

export function* lookupRevenue() {
    yield takeEvery(listRevenue.LIST_REVENUE, getRevenue);
    yield takeEvery(listStatics.LIST_STATICS, getStatics);
}