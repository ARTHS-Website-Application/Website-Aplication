import { call, put, takeEvery } from 'redux-saga/effects';
import { userInfor } from '../../../constants/mainConstants';
import { privateService } from '@/services/privateService';
import { AxiosResponse } from 'axios';
import { ShowProfileFailed, ShowProfileSuccess } from '@/actions/userInfor';





function* userProfile() {
    // const storedAuth = localStorage.getItem('auth');
    // const initialAuth = storedAuth ? JSON.parse(storedAuth) : {};
    // const role: string = initialAuth.roles.toLowerCase();
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


export function* lookupUser() {
    yield takeEvery(userInfor.GET_USER_INFO, userProfile);
}