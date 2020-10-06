import * as types from '../actions/actionTypes';
import {fetchMediaFailure, fetchMediaSuccess, isLoading} from '../actions/mediaActions';
import IAwakeAPI from '../lib/iAwakeAPI';
import {call, put, takeEvery} from 'redux-saga/effects';
function* fetchMedia() {
  try {
    yield put(isLoading(true));
    const media = yield call(IAwakeAPI.fetchMedia);
    yield put(fetchMediaSuccess(media));
    yield put(isLoading(false));
  } catch (e) {
    yield put(isLoading(false));
    yield put(fetchMediaFailure(e.message));
  }
}

export default function* root() {
  yield takeEvery(types.MEDIA.FETCH, fetchMedia);
}
