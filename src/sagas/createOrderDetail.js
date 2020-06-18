import {
  put,
  call,
  takeLatest
} from 'redux-saga/effects';
import {
  CREATE_ORDER_DETAIL_START,
  CREATE_ORDER_DETAIL_ERROR,
  CREATE_ORDER_DETAIL_COMPLETE

} from '../constants/actionTypes';
import apiCall from '../api';

function* createOrderDetail(action) {
  console.log(action.payload);
  var ovejota = {
    idProducto: action.payload.id,
    cantidad: 1
  }
  try {
    const result = null;
    if (action.payload.idOrder != null) {
      result = yield call(apiCall, 'POST', `/v1/orders/detail/${action.payload.idOrder}`, ovejota);
    } else {
      ovejota.usuario = action.payload.userEmail;
      result = yield call(apiCall, 'POST', `/v1/orders/orderwhitdetail`, ovejota);
    }
    
    console.log(result);

    if (result.data.Error) {
      throw new Error(result.data.Error);
    }
    yield put({
      type: CREATE_ORDER_DETAIL_COMPLETE,
      payload: result.data
    });
  } catch (e) {
    yield put({
      type: CREATE_ORDER_DETAIL_ERROR,
      payload: e
    });
  }
}

export default function* () {
  yield takeLatest(CREATE_ORDER_DETAIL_START, createOrderDetail);
}
