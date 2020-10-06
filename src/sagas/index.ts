import {all} from 'redux-saga/effects';
import users from './usersSagas';
import media from './mediaSages';

export default function* root() {
  yield all([users(), media()]);
}
