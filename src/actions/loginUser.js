import {
  SEARCH_USER_BY_ID_START,
  SEARCH_USER_BY_ID_RESET,
  SEARCH_USER_BY_ID_RESET_ERROR
} from '../constants/actionTypes';

export const resetErrorSearchUserByEmail = () => ({
  type: SEARCH_USER_BY_ID_RESET_ERROR
});

export const resetSearchUserByEmail = () => ({
  type: SEARCH_USER_BY_ID_RESET
});

export const searchUserByEmail = payload => ({
  type: SEARCH_USER_BY_ID_START,
  payload
});
