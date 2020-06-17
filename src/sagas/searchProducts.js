import {
  put,
  call,
  takeLatest
} from 'redux-saga/effects';
import {
  SEARCH_PRODUCTS_COMPLETE,
  SEARCH_PRODUCTS_ERROR,
  SEARCH_PRODUCTS_START
} from '../constants/actionTypes';
import apiCall from '../api';

function* searchProduct(action) {
  try {
    const result = yield call(apiCall, 'GET', '/v1/products', null);
    console.log(result);

    yield put({
      type: SEARCH_PRODUCTS_COMPLETE,
      payload: result.data
    });
  } catch (e) {
    yield put({
      type: SEARCH_PRODUCTS_ERROR,
      payload: e
    });
  }
}

export default function* () {
  yield takeLatest(SEARCH_PRODUCTS_START, searchProduct);
}
