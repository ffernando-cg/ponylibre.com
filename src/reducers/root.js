import { combineReducers } from 'redux';
import searchProducts from './searchProducts';
import product from './product';
import login from './loginUser';
import searchOrders from './searchUserOrders'
import createUser from './createUser'

const rootReducer = combineReducers({
  searchProducts,
  searchOrders,
  product,
  login,
  createUser
});

export default rootReducer;
