import { getServicesSuccess, getServicesFailed } from '@/actions/service';
import { listServices } from '@/constants/secondaryConstants';
import { ownerService } from '@/services/ownerService';
import { privateService } from '@/services/privateService';
import { getFilterService } from '@/types/actions/filterCreate';
import { payloadService, payloadServiceChoose } from '@/types/actions/listService';
import { AxiosResponse } from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';

function* getChooseService(payload:payloadServiceChoose<number>) {
    try {
        const resp: AxiosResponse = yield call(ownerService.getServiceCreate,payload.pageSize);
        const { status, data } = resp;
        if (data && status === 200) {
            yield put(getServicesSuccess(data));
        } else {
            yield put(getServicesFailed(data));
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const msg: string = error.message;
        yield put(getServicesFailed(msg));
    }

}

function* getListService(payload:payloadService<number>) {
    try {
        const resp: AxiosResponse = yield call(privateService.getListService,payload.pageNumber);
        const { status, data } = resp;
        if (data && status === 200) {
            yield put(getServicesSuccess(data));
        } else {
            yield put(getServicesFailed(data));
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const msg: string = error.message;
        yield put(getServicesFailed(msg));
    }

}

function* filterService(payload:getFilterService<string,number>) {
    try {
        const resp: AxiosResponse = yield call(privateService.getListFilterService,payload.data);
        const { status, data } = resp;
        if (data && status === 200) {
            yield put(getServicesSuccess(data));
        } else {
            yield put(getServicesFailed(data));
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const msg: string = error.message;
        yield put(getServicesFailed(msg));
    }

}

export function* lookupService() {
    yield takeEvery(listServices.GET_LIST_SERVICES_CHOOSE, getChooseService);
    yield takeEvery(listServices.GET_LIST_SERVICES, getListService);
    yield takeEvery(listServices.GET_LIST_SERVICES_FILTER, filterService);
}