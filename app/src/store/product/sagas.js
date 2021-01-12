/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-vars */
import { takeLatest, call, put, debounce } from 'redux-saga/effects';
import {
  getAllProductsApi,
  addProductApi
} from './api';
import {
  GET_ALL_PRODUCTS,
  ADD_PRODUCT,
  ADD_TO_CART,
  REMOVE_FROM_CART
} from './actionTypes';
import {
  getAllProductsEnd,
  addProductEnd,
  addToCartEnd,
  removeFromCartEnd
} from './actions';


export function* getAllProductsSaga(action) {
  try {
    const apiResult = yield call(getAllProductsApi);
    yield put(getAllProductsEnd(apiResult));
  } catch (e) {
    // stops saga from breaking on api error
  }
}
export function* addProductSaga(action) {
  try {
    const apiResult = yield call(addProductApi, action.payload);
    yield put(addProductEnd(apiResult));
  } catch (e) {
    // stops saga from breaking on api error
  }
}
export function* addToCartSaga(action) {
  try {
    yield put(addToCartEnd(action.payload));
  } catch (e) {
    // stops saga from breaking on api error
  }
}
export function* removeFromCartSaga(action) {
  try {
    yield put(removeFromCartEnd(action.payload));
  } catch (e) {
    // stops saga from breaking on api error
  }
}


export default function* () {
  yield takeLatest(GET_ALL_PRODUCTS, getAllProductsSaga);
  yield takeLatest(ADD_PRODUCT, addProductSaga);
  yield takeLatest(ADD_TO_CART, addToCartSaga);
  yield takeLatest(REMOVE_FROM_CART, removeFromCartSaga);
}
