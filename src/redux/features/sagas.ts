import {
    takeLatest, put, call, select,
  } from 'redux-saga/effects';
  import { AnyAction } from 'redux';
  import apiService from '../../services/apiService';
  import { featuresTypes } from './types';
  import { featuresRequestResponse } from "./actions";
    
  export function* getFeaturesRequest() {
    try {
      const local = localStorage.getItem('user')
      const localUser = local ? JSON.parse(local) : "";

      const url =`/users/${localUser.id}/features`;
      const { data } = yield call(apiService.get, url);
  
      yield put(featuresRequestResponse({
        data,
      }));
      return true;
    } catch (error) {
      yield put(featuresRequestResponse({
        error: error.response.data.message,
      }));
    }
  }

  export function* updateFeaturesRequest({
    payload,
  }: AnyAction) {
    try {
      const local = localStorage.getItem('user')
      const localUser = local ? JSON.parse(local) : "";

      const url =`/users/${localUser.id}/features`;

      const { data } = yield call(apiService.post, url, {feature: {feature_id: payload.featureId, preview: payload.preview} });
  
      yield put(featuresRequestResponse({
        data,
      }));
      return true;
    } catch (error) {
      yield put(featuresRequestResponse({
        error: error.response.data.message,
      }));
    }
  }
 
export default [
  takeLatest(
    featuresTypes.UPDATE_FEATURES_USER_REQUEST,
    updateFeaturesRequest
  ),
  takeLatest(
    featuresTypes.GET_FEATURES_REQUEST,
    getFeaturesRequest,
  ),
];
