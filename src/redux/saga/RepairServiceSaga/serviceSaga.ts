import { getServicesSuccess, getServicesFailed, detailServiceSuccess, detailServiceFailed } from '@/actions/service';
import { detailServices, listServices, serviceCreate, serviceUpdate } from '@/constants/secondaryConstants';
import { History } from '@/context/NavigateSetter';
import { ownerService } from '@/services/ownerService';
import { privateService } from '@/services/privateService';
import { payloadDetailService } from '@/types/actions/detailService';
import { getFilterService, getSortService } from '@/types/actions/filterService';
import { payloadCreateService, payloadService, payloadServiceChoose, payloadUpdateService } from '@/types/actions/listService';
import { AxiosResponse } from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';




function* createService(payload: payloadCreateService) {
    try {
        const resp: AxiosResponse = yield call(privateService.createService, payload.data);
        const { status, data } = resp;
        console.log("create", data)
        if (data && status === 201) {
            yield put(detailServiceSuccess(data));
            if (History.navigate)
                History.navigate(`/manage-services/${data.id}`)
        } else {
            yield put(detailServiceFailed(data));
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const msg: string = error.message;
        yield put(detailServiceFailed(msg));
    }
}

function* updateService(payload: payloadUpdateService) {
    try {
        const resp: AxiosResponse = yield call(privateService.updateService,payload.serviceId, payload.data);
        const { status, data } = resp;
        console.log("create", data)
        if (data && status === 201) {
            yield put(detailServiceSuccess(data));
        } else {
            yield put(detailServiceFailed(data));
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const msg: string = error.message;
        yield put(detailServiceFailed(msg));
    }
}

function* getChooseService(payload:payloadServiceChoose<string,number>) {
    try {
        const resp: AxiosResponse = yield call(ownerService.getServiceCreate,payload.data);
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

function* getListService(payload:payloadService<string,number>) {
    try {
        const resp: AxiosResponse = yield call(privateService.getListService,payload.data);
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

function* getDetailService(payload:payloadDetailService<string>) {
    try {
        const resp: AxiosResponse = yield call(privateService.getDetailService,payload.serviceId);
        const { status, data } = resp;
        if (data && status === 200) {
            yield put(detailServiceSuccess(data));
        } else {
            yield put(detailServiceFailed(data));
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const msg: string = error.message;
        yield put(detailServiceFailed(msg));
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

function* sortService(payload:getSortService<string,number>) {
    try {
        const resp: AxiosResponse = yield call(privateService.getSortService,payload.data);
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
    yield takeEvery(serviceCreate.SERVICE_CREATE, createService);
    yield takeEvery(serviceUpdate.SERVICE_UPDATE, updateService);
    yield takeEvery(listServices.GET_LIST_SERVICES_CHOOSE, getChooseService);
    yield takeEvery(listServices.GET_LIST_SERVICES, getListService);
    yield takeEvery(detailServices.DETAIL_SERVICES, getDetailService);
    yield takeEvery(listServices.GET_LIST_SERVICES_FILTER, filterService);
    yield takeEvery(listServices.GET_SORT_SERVICES, sortService);
}