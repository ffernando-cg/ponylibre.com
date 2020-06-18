import {
  SEARCH_ORDER_BY_USER_START,
  SEARCH_ORDER_BY_USER_RESET
} from '../constants/actionTypes';

export const resetSearchOrderByUser = () => ({
  type: SEARCH_ORDER_BY_USER_RESET,
});

export const searchOrderByUser = payload => ({
  type: SEARCH_ORDER_BY_USER_START,
  payload
});
