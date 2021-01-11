/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-vars */
import { takeLatest, call, put, debounce } from 'redux-saga/effects';
import {
  getUserApi,
  registerUserApi,
  loginUserApi
} from './api';
import {
  GET_USER,
  REGISTER_USER,
  LOGIN_USER,
  LOGOUT_USER
} from './actionTypes';
import {
  getUserEnd,
  registerUserEnd,
  clearMessageEnd,
  loginUserEnd,
  logoutUserEnd
} from './actions';


export function* getUserSaga(action) {
  try {
    const apiResult = yield call(getUserApi);
    yield put(getUserEnd(apiResult));
  } catch (e) {
    // stops saga from breaking on api error
  }
}

export function* registerUserSaga(action) {
  try {
    const apiResult = yield call(registerUserApi, action.payload);
    yield put(registerUserEnd(apiResult));
  } catch (e) {
    // stops saga from breaking on api error
  }
}

export function* loginUserSaga(action) {
  try {
    const apiResult = yield call(loginUserApi, action.payload);
    yield put(loginUserEnd(apiResult));
  } catch (e) {
    // stops saga from breaking on api error
  }
}

export function* logoutUserSaga(action) {
  try {
    yield put(logoutUserEnd());
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
  yield takeLatest(GET_USER, getUserSaga);
  yield takeLatest(REGISTER_USER, registerUserSaga);
  yield takeLatest(LOGIN_USER, loginUserSaga);
  yield takeLatest(LOGOUT_USER, logoutUserSaga);
  yield debounce(5000, REGISTER_USER, clearMessageSaga);
  yield debounce(2000, LOGIN_USER, clearMessageSaga);
  yield debounce(2000, LOGOUT_USER, clearMessageSaga);
}
