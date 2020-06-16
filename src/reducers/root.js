import { combineReducers } from 'redux';
import searchProducts from './searchProducts';
import product from './product';

const rootReducer = combineReducers({
  searchProducts,
  product
});

export default rootReducer;
