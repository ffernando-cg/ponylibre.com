import {
  put,
  call,
  takeLatest
} from 'redux-saga/effects';
import {
  CREATE_PRODUCT_START,
  CREATE_PRODUCT_ERROR,
  CREATE_PRODUCT_COMPLETE,

} from '../constants/actionTypes';
import apiCall from '../api';

function* createProduct(action) {
  console.log(action.payload);
  var ovejota = {
    name: action.payload.name,
    img: action.payload.img,
    description: action.payload.description,
    price: action.payload.price
  }
  try {
    const result = yield call(apiCall, 'POST', `/v1/products`, ovejota);
    console.log(result);

    if (result.data.Error) {
      throw new Error(result.data.Error);
    }
    yield put({
      type: CREATE_PRODUCT_COMPLETE,
      payload: result.data
    });
  } catch (e) {
    yield put({
      type: CREATE_PRODUCT_ERROR,
      payload: e
    });
  }
}

export default function* () {
  yield takeLatest(CREATE_PRODUCT_START, createProduct);
}
