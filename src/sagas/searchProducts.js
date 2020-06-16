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

function* searchMovie(action) {
  try {
    const result = yield call(apiCall, 'GET', '/v1/products', null);
    console.log(result);
    if (result.data.Error) {
      throw new Error(result.data.Error);
    }

    yield put({
      type: SEARCH_PRODUCTS_COMPLETE,
      payload: result.data.Search
    });
  } catch (e) {
    yield put({
      type: SEARCH_PRODUCTS_ERROR,
      payload: e
    });
  }
}

export default function* () {
  yield takeLatest(SEARCH_PRODUCTS_START, searchMovie);
}
