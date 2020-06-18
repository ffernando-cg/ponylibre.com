import {
  UPDATE_USER_INFO_START,
  UPDATE_USER_INFO_RESET
} from '../constants/actionTypes';

export const resetUpdateUserInfo = () => ({
  type: UPDATE_USER_INFO_RESET
});

export const startUpdateUserInfo = payload => ({
  type: UPDATE_USER_INFO_START,
  payload
});
