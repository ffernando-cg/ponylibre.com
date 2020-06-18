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
  const obj = action.payload;
  try {
    const result = yield call(apiCall, 'GET', `/v1/products/${obj.idProducto}`, null);


    obj.imProduct = result.data.img;
    obj.imName = result.data.name;


    console.log(obj);



    if (result.data.Error) {
      throw new Error(result.data.Error);
    }

    yield put({
      type: SEARCH_USER_ORDERS_COMPLETE,
      payload: obj
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
