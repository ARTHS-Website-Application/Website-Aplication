import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import createMiddleWareSaga from 'redux-saga';
import { rootSaga } from './saga/rootSaga';
import userReducer from './reducer/userReducer';
import productReducer from './reducer/productReducer';
import categoryProductReducer from './reducer/categoryProductReducer';
import createOrderReducer from './reducer/createOrderReducer';
const middleSaga = createMiddleWareSaga();
const allReducer = combineReducers({
  userReducer,
  productReducer,
  categoryProductReducer,
  createOrderReducer,
  });

  const store = configureStore({
    reducer: allReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({ serializableCheck: false }).concat(middleSaga);
    },
  });

  middleSaga.run(rootSaga);

export default store;
