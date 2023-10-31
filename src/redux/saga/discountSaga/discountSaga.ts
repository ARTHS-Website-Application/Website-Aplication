import { getDiscountFailed, getDiscountSuccess } from '@/actions/discount';
import { listDiscount } from '@/constants/secondaryConstants';
import { ownerService } from '@/services/ownerService';
import { AxiosResponse } from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';

function* getChooseDiscount() {
    try {
        const resp: AxiosResponse = yield call(ownerService.getDiscountCreate);
        const { status, data } = resp;
        if (data && status === 200) {
            yield put(getDiscountSuccess(data));
        } else {
            yield put(getDiscountFailed(data));
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const msg: string = error.message;
        yield put(getDiscountFailed(msg));
    }

}

export function* lookupDiscount() {
    yield takeEvery(listDiscount.GET_LIST_DISCOUNT_CHOOSE, getChooseDiscount);
}