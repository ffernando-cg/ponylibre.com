import {
  UPDATE_USER_INFO_START,
  UPDATE_USER_INFO_ERROR,
  UPDATE_USER_INFO_COMPLETE,
  UPDATE_USER_INFO_RESET
} from '../constants/actionTypes';

const initialState = {
  loading: false,
  results: null,
  error: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_USER_INFO_START:
      return {
        ...state,
        loading: false
      };
    case UPDATE_USER_INFO_ERROR:
      return {
        ...state,
        loading: false,
        results: action.payload
      };
    case UPDATE_USER_INFO_COMPLETE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case UPDATE_USER_INFO_RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
}
