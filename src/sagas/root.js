import { all } from 'redux-saga/effects';
import searchProducts from './searchProducts';
import searchMovieById from './searchMovieById';

export default function* () {
  yield all([
    searchProducts(),
    searchMovieById()
  ]);
}
