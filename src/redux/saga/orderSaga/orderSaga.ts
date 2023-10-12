import { createOrderFailed, createOrderSuccess } from '@/actions/order';
import { postOrder } from '@/constants/mainConstants';
import { orderService } from '@/services/orderService';
import { sagaCreateOrder } from '@/types/actions/createOrder';
import { AxiosResponse } from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';


function* createOrder(payload:sagaCreateOrder<string,number>){
    console.log("hesad",payload);
    try{
        const resp:AxiosResponse =yield call(orderService.createOrder,payload.data)
        const {status,data} = resp;
        console.log("sagaOrder",status,data);
        if (data && status === 201) {
            yield put(createOrderSuccess(true));
        }else{
            yield put(createOrderFailed(data));
        }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }catch(error:any){
        const msg: string = error.message;
        console.log("sda345",msg)
        yield put(createOrderFailed(msg));
    }
}

export function* lookupOrder() {
    yield takeEvery(postOrder.POST_ORDER , createOrder);
}