import {
  CREATE_ORDER_DETAIL_START,
  CREATE_ORDER_DETAIL_RESET
} from '../constants/actionTypes';

export const resetCreateOrderDetail = () => ({
  type: CREATE_ORDER_DETAIL_RESET
});

export const createOrderDetail = payload => ({
  type: CREATE_ORDER_DETAIL_START,
  payload
});
