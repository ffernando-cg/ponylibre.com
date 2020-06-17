import {
  SEARCH_USER_ORDERS_START,
  SEARCH_USER_ORDERS_ERROR,
  SEARCH_USER_ORDERS_COMPLETE,
  SEARCH_USER_ORDERS_RESET,
} from '../constants/actionTypes';

const initialState = {
  loading: false,
  results: null,
  error: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SEARCH_USER_ORDERS_START:
      return {
        ...state,
        loading: false
      };
    case SEARCH_USER_ORDERS_COMPLETE:
      return {
        ...state,
        loading: false,
        results: action.payload
      };
    case SEARCH_USER_ORDERS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case SEARCH_USER_ORDERS_RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
}
