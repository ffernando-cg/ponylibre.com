import {
  put,
  call,
  takeLatest
} from 'redux-saga/effects';
import {
  CREATE_USER_START,
  CREATE_USER_ERROR,
  CREATE_USER_COMPLETE

} from '../constants/actionTypes';
import apiCall from '../api';

function* loginUser(action) {
  console.log(action.payload);
  const userEmail = action.payload;

  try {
    const result = yield call(apiCall, 'POST', `/v1/users/${userEmail}`, action.payload, null, { "Content-Type": "application/json" });
    console.log(result);

    if (result.data.Error) {
      throw new Error(result.data.Error);
    }
    yield put({
      type: CREATE_USER_COMPLETE,
      payload: result.data
    });
  } catch (e) {
    yield put({
      type: CREATE_USER_ERROR,
      payload: e
    });
  }
}

export default function* () {
  yield takeLatest(CREATE_USER_START, loginUser);
}
