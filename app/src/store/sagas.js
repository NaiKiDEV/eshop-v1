import { all, fork } from 'redux-saga/effects';

import { sagas as userSagas } from './user';
import { sagas as productSagas } from './product';

export default function* sagas() {
    yield all([
        fork(userSagas),
        fork(productSagas)
    ]);
}