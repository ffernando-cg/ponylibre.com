import {
  SEARCH_USER_BY_ID_START,
  SEARCH_USER_BY_ID_ERROR,
  SEARCH_USER_BY_ID_COMPLETE,
  SEARCH_USER_BY_ID_RESET,
  SEARCH_USER_BY_ID_RESET_ERROR
} from '../constants/actionTypes';

const initialState = {
  loading: false,
  results: null,
  error: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SEARCH_USER_BY_ID_START:
      return {
        ...state,
        loading: false
      };
    case SEARCH_USER_BY_ID_COMPLETE:
      return {
        ...state,
        loading: false,
        results: action.payload
      };
    case SEARCH_USER_BY_ID_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case SEARCH_USER_BY_ID_RESET:
      return {
        ...initialState
      };
    case SEARCH_USER_BY_ID_RESET_ERROR:
      return {
        ...state,
        loading: false,
        error: null
      };
    default:
      return state;
  }
}
