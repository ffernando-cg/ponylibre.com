import {
  SEARCH_PRODUCTS_START,
  SEARCH_PRODUCTS_RESET
} from '../constants/actionTypes';

export const resetMovieSearch = () => ({
  type: SEARCH_PRODUCTS_RESET
});

export const searchMovie = payload => ({
  type: SEARCH_PRODUCTS_START,
  payload
});
