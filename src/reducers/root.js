import { combineReducers } from 'redux';
import searchProducts from './searchProducts';
import product from './product';
import login from './loginUser';
import searchOrders from './searchUserOrders'

const rootReducer = combineReducers({
  searchProducts,
  searchOrders,
  product,
  login
});

export default rootReducer;
