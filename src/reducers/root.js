import { combineReducers } from 'redux';
import searchProducts from './searchProducts';
import product from './product';
import login from './loginUser';
import searchOrders from './searchUserOrders'
import createUser from './createUser'
import getOrderByUser from './getOrderByUser'
import updateUserInfo from './updateUserInfo'
import createProduct from './createProduct'
import createOrderDetail from './createOrderDetail'


const rootReducer = combineReducers({
  searchProducts,
  searchOrders,
  product,
  login,
  createUser,
  getOrderByUser,
  updateUserInfo,
  createProduct,
  createOrderDetail
});

export default rootReducer;
