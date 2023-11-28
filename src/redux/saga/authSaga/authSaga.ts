import { call, put, takeEvery } from 'redux-saga/effects';
import { userInfor } from '../../../constants/mainConstants';
import { privateService } from '@/services/privateService';
import { AxiosResponse } from 'axios';
import { ShowProfileFailed, ShowProfileSuccess, createAccountFailed, getAccount, getAccountFailed, getAccountSuccess, getAllAccount, getAllAccountSuccess, getFilterAccount, getFilterAccountSuccess, getFilterNotAccountSuccess, getNotAccountSuccess, selectStaffFailed, selectStaffSuccess } from '@/actions/userInfor';
import { createAccounts, listAccounts, listAllAccounts, listFilterAccounts, listNotAccounts, listStaff } from '@/constants/secondaryConstants';
import { payloadFilterAccount, payloadFilterNotAccount, payloadListAccount, payloadListNotAccount } from '@/types/actions/listAccount';
import { adminService } from '@/services/adminService';
import { payloadCreateAccount } from '@/types/actions/createUpdateAccount';
import { typeAccount } from '@/types/typeAuth';
import { showSuccessAlert } from '@/constants/chooseToastify';

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

function* postAccount(payload: payloadCreateAccount<string>) {
    try {
        const resp: AxiosResponse = yield call(adminService.postAccount,payload.role, payload.data);
        const { status, data } = resp;
        if (data && status === 201) {
            yield put(getAllAccount());
            yield put(getAccount(typeAccount.InActive));
            const data = {
                pageNumber: 0,
                status: typeAccount.InActive,
                fullName: "",
            }
            yield put(getFilterAccount(data));
            showSuccessAlert('Cập nhật thành công');
        } else {
            console.log("data",data)
            yield put(createAccountFailed(data));
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const msg: string = error.response.data.Message;
        console.log("msg",msg);
        yield put(createAccountFailed(msg));
    }

}


function* getFilterListAccount(payload: payloadFilterAccount<string, number>) {
    try {
        const resp: AxiosResponse = yield call(adminService.getFilterAccount, payload.data);
        const { status, data } = resp;
        if (data && status === 200) {
            yield put(getFilterAccountSuccess(data));
        } else {
            yield put(getAccountFailed(data));
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const msg: string = error.message;
        yield put(getAccountFailed(msg));
    }

}

function* getFilterListNotAccount(payload: payloadFilterNotAccount<string, number>) {
    try {
        const resp: AxiosResponse = yield call(adminService.getFilterNotAccount, payload.data);
        const { status, data } = resp;
        if (data && status === 200) {
            yield put(getFilterNotAccountSuccess(data));
        } else {
            yield put(getAccountFailed(data));
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const msg: string = error.message;
        yield put(getAccountFailed(msg));
    }

}

function* getListAllAccount() {
    try {
        const resp: AxiosResponse = yield call(adminService.getAllAccount);
        const { status, data } = resp;
        if (data && status === 200) {
            yield put(getAllAccountSuccess(data.pagination));
        } else {
            yield put(getAccountFailed(data));
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const msg: string = error.message;
        yield put(getAccountFailed(msg));
    }

}

function* getListAccount(payload: payloadListAccount<string>) {
    try {
        const resp: AxiosResponse = yield call(adminService.getAccount, payload.status);
        const { status, data } = resp;
        if (data && status === 200) {
            yield put(getAccountSuccess(data.pagination));
        } else {
            yield put(getAccountFailed(data));
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const msg: string = error.message;
        yield put(getAccountFailed(msg));
    }

}

function* getListNotAccount(payload: payloadListNotAccount<string>) {
    try {
        const resp: AxiosResponse = yield call(adminService.getNotAccount, payload.status);
        const { status, data } = resp;
        if (data && status === 200) {
            yield put(getNotAccountSuccess(data.pagination));
        } else {
            yield put(getAccountFailed(data));
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const msg: string = error.message;
        yield put(getAccountFailed(msg));
    }

}


export function* lookupUser() {
    yield takeEvery(userInfor.GET_USER_INFO, userProfile);
    yield takeEvery(listStaff.LIST_STAFF, getListStaff);
    yield takeEvery(createAccounts.CREATE_ACCOUNT, postAccount);
    yield takeEvery(listAllAccounts.LIST_ALL_ACCOUNT, getListAllAccount);
    yield takeEvery(listAccounts.LIST_ACCOUNT, getListAccount);
    yield takeEvery(listNotAccounts.LIST_NOT_ACCOUNT, getListNotAccount);
    yield takeEvery(listFilterAccounts.LIST_FILTER_ACCOUNT, getFilterListAccount);
    yield takeEvery(listFilterAccounts.LIST_FILTER_NOT_ACCOUNT, getFilterListNotAccount);
}