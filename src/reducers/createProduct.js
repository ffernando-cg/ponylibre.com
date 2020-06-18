import {
  CREATE_PRODUCT_START,
  CREATE_PRODUCT_ERROR,
  CREATE_PRODUCT_COMPLETE,
  CREATE_PRODUCT_RESET
} from '../constants/actionTypes';

const initialState = {
  loading: false,
  results: null,
  error: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_PRODUCT_START:
      return {
        ...state,
        loading: false
      };
    case CREATE_PRODUCT_ERROR:
      return {
        ...state,
        loading: false,
        results: action.payload
      };
    case CREATE_PRODUCT_COMPLETE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case CREATE_PRODUCT_RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
}
