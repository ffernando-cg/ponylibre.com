import {
  SEARCH_USER_BY_ID_START,
  SEARCH_USER_BY_ID_RESET
} from '../constants/actionTypes';

export const resetSearchUserByEmail = () => ({
  type: SEARCH_USER_BY_ID_RESET
});

export const searchUserByEmail = payload => ({
  type: SEARCH_USER_BY_ID_START,
  payload
});
