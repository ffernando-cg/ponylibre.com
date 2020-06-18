import {
  put,
  call,
  takeLatest
} from 'redux-saga/effects';
import {
  SEARCH_ORDER_BY_USER_COMPLETE,
  SEARCH_ORDER_BY_USER_ERROR,
  SEARCH_ORDER_BY_USER_START
} from '../constants/actionTypes';
import apiCall from '../api';

function* searchOrderByUser(action) {
  try {
    debugger
    const result = yield call(apiCall, 'GET', '/v1/orders', null);
    var ovejota = [];

    result.data.forEach(o => {
      if (o.usuario === action.payload) {
        ovejota.push(o);
      }
    });

    var unbuyedOrder = {};
    ovejota.forEach(s => {
      if (s.isBuyed == false) {
        unbuyedOrder = s;
      }
    });

    yield put({
      type: SEARCH_ORDER_BY_USER_COMPLETE,
      payload: unbuyedOrder
    });
  } catch (e) {
    yield put({
      type: SEARCH_ORDER_BY_USER_ERROR,
      payload: e
    });
  }
}

export default function* () {
  yield takeLatest(SEARCH_ORDER_BY_USER_START, searchOrderByUser);
}
