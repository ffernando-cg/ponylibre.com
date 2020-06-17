import {
  SEARCH_USER_ORDERS_START,
  SEARCH_USER_ORDERS_RESET
} from '../constants/actionTypes';

export const resetSearchUserOrders = () => ({
  type: SEARCH_USER_ORDERS_RESET
});

export const searchUserOrders = payload => ({
  type: SEARCH_USER_ORDERS_START,
  payload
});
