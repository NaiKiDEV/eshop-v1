import { all, fork } from 'redux-saga/effects';

import { sagas as userSagas } from './user';

export default function* sagas() {
    yield all([
        fork(userSagas),
    ]);
}