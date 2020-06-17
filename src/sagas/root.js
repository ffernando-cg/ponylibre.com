import { all } from 'redux-saga/effects';
import searchProducts from './searchProducts';
import searchMovieById from './searchMovieById';
import searchUserOrders from './searchUserOrders';
import loginUser from './loginUser';
import creaetUser from './createUser'


export default function* () {
  yield all([
    searchProducts(),
    searchMovieById(),
    searchUserOrders(),
    loginUser(),
    creaetUser()
  ]);
}
