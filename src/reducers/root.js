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
import updateUserOrder from './updateUserOrder'

const rootReducer = combineReducers({
  searchProducts,
  searchOrders,
  product,
  login,
  createUser,
  getOrderByUser,
  updateUserInfo,
  updateUserOrder,
  createProduct,
  createOrderDetail
});

export default rootReducer;
