import {
  SEARCH_PRODUCTS_COMPLETE,
  SEARCH_PRODUCTS_ERROR,
  SEARCH_PRODUCTS_RESET,
  SEARCH_PRODUCTS_START
} from '../constants/actionTypes';

const initialState = {
  loading: false,
  results: null,
  error: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SEARCH_PRODUCTS_START:
      return {
        ...state,
        loading: true
      };
    case SEARCH_PRODUCTS_COMPLETE:
      return {
        ...state,
        loading: false,
        results: action.payload
      };
    case SEARCH_PRODUCTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case SEARCH_PRODUCTS_RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
}
