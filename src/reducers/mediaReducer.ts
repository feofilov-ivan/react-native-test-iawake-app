'use strict';
import {MEDIA} from '../actions/actionTypes';

const initialState = {
  programs: [],
  categories: [],
  playlists: [],
  loading: false,
};

export default function mediaReducer(state = initialState, action: any = {}) {
  switch (action.type) {
    case MEDIA.FETCH_SUCCESS:
      return {...state, ...action.payload};
    case MEDIA.IS_LOADING:
      return {...state, loading: action.payload};
    default:
      return state;
  }
}
