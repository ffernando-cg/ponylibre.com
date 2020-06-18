import {
  SEARCH_ORDER_BY_USER_START,
  SEARCH_ORDER_BY_USER_ERROR,
  SEARCH_ORDER_BY_USER_COMPLETE,
  SEARCH_ORDER_BY_USER_RESET,
} from '../constants/actionTypes';

const initialState = {
  loading: false,
  results: null,
  error: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SEARCH_ORDER_BY_USER_START:
      return {
        ...state,
        loading: false
      };
    case SEARCH_ORDER_BY_USER_COMPLETE:
      return {
        ...state,
        loading: false,
        results: action.payload
      };
    case SEARCH_ORDER_BY_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case SEARCH_ORDER_BY_USER_RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
}
