import { getBookingFailed, getBookingSuccess, putUpdateFailed, putUpdateSuccess } from "@/actions/booking";
import { showErrorAlert, showSuccessAlert, showWarningAlert } from "@/constants/chooseToastify";
import { listBooking, updateBooking } from "@/constants/mainConstants";
import { bookingService } from "@/services/bookingService";
import { ErrorResponse } from "@/types/errorResponse";
import { itemBooking, payloadBooking, payloadUpdateBooking, selectorBooking } from "@/types/listBooking";
import { AxiosError, AxiosResponse } from "axios";
import { call, put, select, takeEvery } from "redux-saga/effects";

function* getBooking(payload: payloadBooking<number>) {
    try {
        const { pageNumber, filters } = payload;
        const response: AxiosResponse = yield call(bookingService.getBooking, pageNumber, filters);
        const { status, data } = response;
        if (data && status === 200) {
            yield put(getBookingSuccess(data));
        } else {
            yield put(getBookingFailed(data));
        }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const msg: string = error.message;
        yield put(getBookingFailed(msg));
    }
}

function* putBooking(payload: payloadUpdateBooking<string>) {
    try {
        const { bookingId, data } = payload;
        const response: AxiosResponse = yield call(bookingService.updateBooking, bookingId, data);
        const { status } = response;
        if (status === 201) {
            const updatedBookingData: itemBooking<string, number> = response.data;
            //console.log('data after update: ', updatedBookingData);
            const currentBookingInfo: itemBooking<string, number>[] = yield select((state: selectorBooking<string, number>) => state.bookingReducer.bookingInfo.data);
            const updateBookingInfo = currentBookingInfo.map(booking => booking.id === updatedBookingData.id ? updatedBookingData : booking);
            yield put(putUpdateSuccess(updateBookingInfo));
            showSuccessAlert('Cập nhật thành công');
        } else {
            console.log('error', response);
            yield put(putUpdateFailed(response.data))
        }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.log('error', error);
        const axiosError = error as AxiosError<ErrorResponse>;
        const msg: string = error.message;
        yield put(putUpdateFailed(msg));
        if (axiosError.response) {
            if (axiosError.response.status === 409) {
                showWarningAlert(axiosError.response.data.Message);

            } else {
                showErrorAlert('Đã xảy ra lỗi khi cập nhật thông tin. Vui lòng thử lại.');
            }
        } else {
            showErrorAlert('Không thể kết nối tới máy chủ. Vui lòng thử lại sau.');
        }
    }
}

export function* lookupBooking() {
    yield takeEvery(listBooking.LIST_BOOKING, getBooking);
    yield takeEvery(updateBooking.UPDATE_BOOKING, putBooking)
}