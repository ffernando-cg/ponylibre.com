import {
  put,
  call,
  takeLatest
} from 'redux-saga/effects';
import {
  SEARCH_USER_ORDERS_START,
  SEARCH_USER_ORDERS_ERROR,
  SEARCH_USER_ORDERS_COMPLETE

} from '../constants/actionTypes';
import apiCall from '../api';

function* searchUserOrders(action) {
  const { userEmail } = action.payload;

  try {
    const result = yield call(apiCall, 'GET', `v1/orders/${userEmail}`, null);

    if (result.data.Error) {
      throw new Error(result.data.Error);
    }

    yield put({
      type: SEARCH_USER_ORDERS_COMPLETE,
      payload: result.data
    });
  } catch (e) {
    yield put({
      type: SEARCH_USER_ORDERS_ERROR,
      payload: e
    });
  }
}

export default function* () {
  yield takeLatest(SEARCH_USER_ORDERS_START, searchUserOrders);
}
