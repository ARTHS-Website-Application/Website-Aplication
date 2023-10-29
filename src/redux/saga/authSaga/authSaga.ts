import { call, put, takeEvery } from 'redux-saga/effects';
import { userInfor } from '../../../constants/mainConstants';
import { privateService } from '@/services/privateService';
import { AxiosResponse } from 'axios';
import { ShowProfileFailed, ShowProfileSuccess, selectStaffFailed, selectStaffSuccess } from '@/actions/userInfor';
import { listStaff } from '@/constants/secondaryConstants';

function* userProfile() {
    try {
        const resp: AxiosResponse = yield call(privateService.getProfile);
        const { status, data } = resp;
        if (data && status === 200) {
            yield put(ShowProfileSuccess(data));
        } else {
            yield put(ShowProfileFailed(data));
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const msg: string = error.message;
        yield put(ShowProfileFailed(msg));
    }

}
function* getListStaff() {
    try {
        const resp: AxiosResponse = yield call(privateService.getListStaff);
        const { status, data } = resp;
        if (data && status === 200) {
            yield put(selectStaffSuccess(data));
        } else {
            yield put(selectStaffFailed(data));
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const msg: string = error.message;
        yield put(selectStaffFailed(msg));
    }

}


export function* lookupUser() {
    yield takeEvery(userInfor.GET_USER_INFO, userProfile);
    yield takeEvery(listStaff.LIST_STAFF, getListStaff);
}