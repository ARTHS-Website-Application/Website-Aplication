import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import createMiddleWareSaga from 'redux-saga';
import { rootSaga } from './saga/rootSaga';
import userReducer from './reducer/userReducer';
import listStaffReducer from './reducer/listStaffReducer';
import productReducer from './reducer/productReducer';
import categoryProductReducer from './reducer/categoryProductReducer';
import vehicleProductReducer from './reducer/vehicleReducer';
import orderReducer from './reducer/orderReducer';
import orderDetailReducer from './reducer/orderDetailReducer';
import productDetailReducer from './reducer/productDetailReducer';
import serviceReducer from './reducer/serviceReducer';
import serviceDetailReducer from './reducer/serviceDetailReducer';
import warrantyReducer from './reducer/warrantyReducer';
import discountReducer from './reducer/discountReducer';
import bookingReducer from './reducer/bookingReducer';
import detailBookingReducer from './reducer/detailBookingReducer';
import onlineOrderReducer from './reducer/onlineOrderReducer';
import onlineOrderDetailReducer from './reducer/onlineOrderDetailReducer';

const middleSaga = createMiddleWareSaga();
const allReducer = combineReducers({
  userReducer,
  listStaffReducer,
  // product
  productReducer,
  productDetailReducer,
  categoryProductReducer,
  vehicleProductReducer,
  // order
  orderReducer,
  orderDetailReducer,

  //service
  serviceReducer,
  serviceDetailReducer,

  //discount
  discountReducer,
  //booking
  bookingReducer,
  detailBookingReducer,

  //warranty
  warrantyReducer,

  //onlineOrder
  onlineOrderReducer,
  onlineOrderDetailReducer,

  });

  const store = configureStore({
    reducer: allReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({ serializableCheck: false }).concat(middleSaga);
    },
  });

  middleSaga.run(rootSaga);

export default store;
