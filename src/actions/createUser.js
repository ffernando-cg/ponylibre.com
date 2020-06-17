import {
  CREATE_USER_START,
  CREATE_USER_RESET
} from '../constants/actionTypes';

export const resetCreateUser = () => ({
  type: CREATE_USER_RESET
});

export const createUser = payload => ({
  type: CREATE_USER_START,
  payload
});
