import {
  CREATE_PRODUCT_START,
  CREATE_PRODUCT_RESET
} from '../constants/actionTypes';

export const resetCreateProduct = () => ({
  type: CREATE_PRODUCT_RESET
});

export const createProduct = payload => ({
  type: CREATE_PRODUCT_START,
  payload
});
