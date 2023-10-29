import {all} from 'redux-saga/effects';
import * as authSaga from './authSaga/authSaga'
import * as productSaga from './productSaga/productSaga'
import * as orderSaga from './orderSaga/orderSaga'
import * as serviceSaga from './RepairServiceSaga/serviceSaga'
import * as discountSaga from './discountSaga/discountSaga'
export function* rootSaga(){
    yield all([
        authSaga.lookupUser(),
        productSaga.lookupProduct(),
        orderSaga.lookupOrder(),
        serviceSaga.lookupService(),
        discountSaga.lookupDiscount(),
        
        
    ])
}