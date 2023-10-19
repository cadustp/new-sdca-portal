import { takeLatest, put, call } from 'redux-saga/effects';
import { AnyAction } from 'redux';
import apiService from '../../services/apiService';
import { localeTypes } from './types';
import {
  setLanguageResponse,
} from './actions';
import { captureEvent } from '../../analytics';

export function* setLanguageRequest({
  payload,
}: AnyAction) {
  try {
    const params = {
      language: payload,
    };
    const url = 'users/language';
    const { data } = yield call(apiService.post, url, params);

    const localUser = JSON.parse(localStorage.getItem('user') || '{}');
    localUser.language = data.language;
    localStorage.setItem('user', JSON.stringify(localUser));
    yield put(setLanguageResponse({
      language: data.language,
    }));
    captureEvent('changeLanguage', {
      status: 'success',
      language: payload,
    });
    return true;
  } catch (error) {
    captureEvent('changeLanguage', {
      status: 'error',
      language: payload,
      error: error.response.data.message,
    });
    yield put(setLanguageResponse({
      error: true,
      errorMessage: error.response.data.message,
    }));
  }
}

export default [
  takeLatest(
    localeTypes.SET_LANGUAGE_REQUEST,
    setLanguageRequest,
  ),
];
