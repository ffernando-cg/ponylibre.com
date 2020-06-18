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
import apiCall from '../apiusers';

function* loginUser(action) {
  console.log(action.payload);
  var ovejota = {
    correo: action.payload.userEmail,
    password: action.payload.userPassword
  }
  try {
    const result = yield call(apiCall, 'POST', `/v1/users`, ovejota);
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
