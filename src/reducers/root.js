import { combineReducers } from 'redux';
import searchProducts from './searchProducts';
import product from './product';
import login from './loginUser';
const rootReducer = combineReducers({
  searchProducts,
  product,
  login
});

export default rootReducer;
