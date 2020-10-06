import {action} from 'typesafe-actions';
import * as types from './actionTypes';
import {Media} from '../types';

export const fetchMediaSuccess = (payload: Media) => action(types.MEDIA.FETCH_SUCCESS, payload);

export const fetchMediaFailure = (payload: string) => action(types.MEDIA.FETCH_FAILURE, payload);

export const isLoading = (payload: boolean) => action(types.MEDIA.IS_LOADING, payload);

export const fetchMedia = () => action(types.MEDIA.FETCH);
