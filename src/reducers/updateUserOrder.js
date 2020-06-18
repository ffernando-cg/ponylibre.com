import {
  UPDATE_USER_ORDER_START,
  UPDATE_USER_ORDER_ERROR,
  UPDATE_USER_ORDER_COMPLETE,
  UPDATE_USER_ORDER_RESET,
} from '../constants/actionTypes';

const initialState = {
  loading: false,
  results: null,
  error: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_USER_ORDER_START:
      return {
        ...state,
        loading: false
      };
    case UPDATE_USER_ORDER_COMPLETE:
      return {
        ...state,
        loading: false,
        results: action.payload
      };
    case UPDATE_USER_ORDER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case UPDATE_USER_ORDER_RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
}
