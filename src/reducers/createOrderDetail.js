import {
  CREATE_ORDER_DETAIL_START,
  CREATE_ORDER_DETAIL_ERROR,
  CREATE_ORDER_DETAIL_COMPLETE,
  CREATE_ORDER_DETAIL_RESET
} from '../constants/actionTypes';

const initialState = {
  loading: false,
  results: null,
  error: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_ORDER_DETAIL_START:
      return {
        ...state,
        loading: false
      };
    case CREATE_ORDER_DETAIL_ERROR:
      return {
        ...state,
        loading: false,
        results: action.payload
      };
    case CREATE_ORDER_DETAIL_COMPLETE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case CREATE_ORDER_DETAIL_RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
}
