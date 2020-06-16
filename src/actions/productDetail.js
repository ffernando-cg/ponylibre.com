import {
  SEARCH_PRODUCTS_BY_ID_START,
  SEARCH_PRODUCTS_BY_ID_RESET
} from '../constants/actionTypes';

export const resetSearchMovieById = () => ({
  type: SEARCH_PRODUCTS_BY_ID_RESET
});

export const searchMovieById = payload => ({
  type: SEARCH_PRODUCTS_BY_ID_START,
  payload
});
