import {all} from 'redux-saga/effects';
import * as authSaga from './authSaga/authSaga'
import * as productSaga from './productSaga/productSaga'
export function* rootSaga(){
    yield all([
        authSaga.lookupUser(),
        productSaga.lookupProduct(),
        
    ])
}