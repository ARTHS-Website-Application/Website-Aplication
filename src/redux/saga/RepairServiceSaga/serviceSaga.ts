import { getServicesSuccess, getServicesFailed } from '@/actions/service';
import { listServices } from '@/constants/secondaryConstants';
import { ownerService } from '@/services/ownerService';
import { payloadServiceChoose } from '@/types/actions/listService';
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

export function* lookupService() {
    yield takeEvery(listServices.GET_LIST_SERVICES_CHOOSE, getChooseService);
}