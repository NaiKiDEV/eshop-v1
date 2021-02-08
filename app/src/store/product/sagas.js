/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-vars */
import { takeLatest, call, put, debounce } from 'redux-saga/effects';
import {
  getAllProductsApi,
  addProductApi,
  removeProductApi,
  updateProductApi,
  getSingleProductApi
} from './api';
import {
  GET_ALL_PRODUCTS,
  ADD_PRODUCT,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART,
  REMOVE_PRODUCT,
  UPDATE_PRODUCT,
  REMOVE_PRODUCT_END,
  UPDATE_PRODUCT_END,
  GET_SINGLE_PRODUCT_END,
  GET_SINGLE_PRODUCT
} from './actionTypes';
import {
  getAllProductsEnd,
  addProductEnd,
  addToCartEnd,
  removeFromCartEnd,
  updateCartEnd,
  removeProductEnd,
  clearMessageEnd,
  updateProductEnd,
  getSingleProductEnd
} from './actions';


export function* getAllProductsSaga(action) {
  try {
    const apiResult = yield call(getAllProductsApi);
    yield put(getAllProductsEnd(apiResult));
  } catch (e) {
    // stops saga from breaking on api error
  }
}
export function* getSingleProductSaga(action) {
  try {
    const apiResult = yield call(getSingleProductApi, action.payload);
    yield put(getSingleProductEnd(apiResult));
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
export function* updateProductSaga(action) {
  try {
    const apiResult = yield call(updateProductApi, action.payload);
    yield put(updateProductEnd(apiResult));
  } catch (e) {
    // stops saga from breaking on api error
  }
}
export function* removeProductSaga(action) {
  try {
    const apiResult = yield call(removeProductApi, action.payload);
    yield put(removeProductEnd(apiResult));
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

// {_id: toUpdateItem, quantity: amountOfProducts}
export function* updateCartSaga(action) {
  try {
    if (action.payload.quantity > 0) {
      yield put(updateCartEnd(action.payload));
    } else {
      yield put(removeFromCartEnd(action.payload._id));
    }

  } catch (e) {
    // stops saga from breaking on api error
  }
}

export function* clearMessageSaga(action) {
  try {
    yield put(clearMessageEnd());
  } catch (e) {
    // stops saga from breaking on api error
  }
}

export default function* () {
  yield takeLatest(GET_ALL_PRODUCTS, getAllProductsSaga);
  yield takeLatest(ADD_PRODUCT, addProductSaga);
  yield takeLatest(ADD_TO_CART, addToCartSaga);
  yield takeLatest(REMOVE_FROM_CART, removeFromCartSaga);
  yield takeLatest(UPDATE_CART, updateCartSaga);
  yield takeLatest(REMOVE_PRODUCT, removeProductSaga);
  yield takeLatest(UPDATE_PRODUCT, updateProductSaga);
  yield takeLatest(GET_SINGLE_PRODUCT, getSingleProductSaga);
  // Making sure we refresh all products after modifying products
  yield takeLatest(UPDATE_PRODUCT_END, getAllProductsSaga);
  yield takeLatest(REMOVE_PRODUCT_END, getAllProductsSaga);
  // Making sure to clear messages after they are issued
  yield debounce(2000, REMOVE_PRODUCT, clearMessageSaga);
  yield debounce(2000, UPDATE_PRODUCT, clearMessageSaga);
  yield debounce(2000, ADD_PRODUCT, clearMessageSaga);
}

