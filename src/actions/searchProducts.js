import {
  SEARCH_PRODUCTS_START,
  SEARCH_PRODUCTS_RESET
} from '../constants/actionTypes';

export const resetProductSearch = () => ({
  type: SEARCH_PRODUCTS_RESET
});

export const searchProduct = payload => ({
  type: SEARCH_PRODUCTS_START,
  payload
});
