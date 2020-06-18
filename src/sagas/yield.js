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
  const orderId = action.payload;

  try {

    const result = yield call(apiCall, 'GET', `/v1/orders/${orderId}`, null);
    console.log(result);

    result.data.detalle.forEach(p => {
      const product = call(apiCall, 'GET', `/v1/products/${result.data.detalle.idProducto}`, null);
      console.log(product.data)
      p.imProduct = product.data.img;
      p.imName = product.data.name;
    });

    console.log(result);



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

export default function* () { }
