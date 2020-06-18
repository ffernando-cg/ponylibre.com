import {
  UPDATE_USER_ORDER_START,
  UPDATE_USER_ORDER_RESET
} from '../constants/actionTypes';

export const resetUpdateUserOrder = () => ({
  type: UPDATE_USER_ORDER_RESET
});

export const updateUserOrder = payload => ({
  type: UPDATE_USER_ORDER_START,
  payload
});
