import {
  put,
  call,
  takeLatest
} from 'redux-saga/effects';
import {
  UPDATE_USER_INFO_START,
  UPDATE_USER_INFO_ERROR,
  UPDATE_USER_INFO_COMPLETE,

} from '../constants/actionTypes';
import apiCall from '../api';

function* updateUserInfo(action) {
  console.log(action.payload);
  const userActualEmail = action.payload.userActualEmail

  var ovejota = {
    correo: action.payload.userEmail,
    password: action.payload.userPassword
  }
  console.log(userActualEmail);
  console.log(ovejota);
  try {
    const result = yield call(apiCall, 'PUT', `/v1/users/${userActualEmail}`, ovejota);
    console.log(result);

    if (result.data.Error) {
      throw new Error(result.data.Error);
    }
    yield put({
      type: UPDATE_USER_INFO_COMPLETE,
      payload: result.data
    });
  } catch (e) {
    yield put({
      type: UPDATE_USER_INFO_ERROR,
      payload: e
    });
  }
}

export default function* () {
  yield takeLatest(UPDATE_USER_INFO_START, updateUserInfo);
}
