import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import createMiddleWareSaga from 'redux-saga';
import { rootSaga } from './saga/rootSaga';
import userReducer from './reducer/userReducer';
import productReducer from './reducer/productReducer';
import categoryProductReducer from './reducer/categoryProductReducer';
import orderReducer from './reducer/orderReducer';
import orderDetailReducer from './reducer/orderDetailReducer';
import productDetailReducer from './reducer/productDetailReducer';
const middleSaga = createMiddleWareSaga();
const allReducer = combineReducers({
  userReducer,
  // product
  productReducer,
  productDetailReducer,
  categoryProductReducer,
  // order
  orderReducer,
  orderDetailReducer,
  });

  const store = configureStore({
    reducer: allReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({ serializableCheck: false }).concat(middleSaga);
    },
  });

  middleSaga.run(rootSaga);

export default store;
