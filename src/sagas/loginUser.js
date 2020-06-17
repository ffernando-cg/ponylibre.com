import {
  put,
  call,
  takeLatest
} from 'redux-saga/effects';
import {
  SEARCH_USER_BY_ID_START,
  SEARCH_USER_BY_ID_ERROR,
  SEARCH_USER_BY_ID_COMPLETE

} from '../constants/actionTypes';
import apiCall from '../api';

function* loginUser(action) {
  console.log(action.payload);
  const userEmail = action.payload;

  try {
    const result = yield call(apiCall, 'GET', `/v1/users/${userEmail}`, null);

    if (result.data.Error) {
      throw new Error(result.data.Error);
    }
    yield put({
      type: SEARCH_USER_BY_ID_COMPLETE,
      payload: result.data
    });
  } catch (e) {
    yield put({
      type: SEARCH_USER_BY_ID_ERROR,
      payload: e
    });
  }
}

export default function* () {
  yield takeLatest(SEARCH_USER_BY_ID_START, loginUser);
}
