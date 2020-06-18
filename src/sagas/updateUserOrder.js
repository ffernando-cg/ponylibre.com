import {
  put,
  call,
  takeLatest
} from 'redux-saga/effects';
import {
  UPDATE_USER_ORDER_START,
  UPDATE_USER_ORDER_ERROR,
  UPDATE_USER_ORDER_COMPLETE,

} from '../constants/actionTypes';
import apiCall from '../api';

function* updateUserOrder(action) {
  const obj = {
    isBuyed: true
  }
  try {

    const result = yield call(apiCall, 'PUT', `/v1/orders/${action.payload}`, obj);


    console.log(result.data);



    if (result.data.Error) {
      throw new Error(result.data.Error);
    }

    yield put({
      type: UPDATE_USER_ORDER_COMPLETE,
      payload: result.data
    });
  } catch (e) {
    yield put({
      type: UPDATE_USER_ORDER_ERROR,
      payload: e
    });
  }
}

export default function* () {
  yield takeLatest(UPDATE_USER_ORDER_START, updateUserOrder);
}
