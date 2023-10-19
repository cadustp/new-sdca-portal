import {
  takeLatest, put, call,
} from 'redux-saga/effects';
import { AnyAction } from 'redux';
import apiService from '../../services/apiService';
import { userPlansRoute } from '../../services/routesService';
import {
  listsDataRequesResponse,
  planUsersResponse,
} from './actions';
import { ListsTypes } from './types';

export function* listsDataRequest({
  payload,
}: AnyAction) {
  try {
    const params = {
      forms: payload.forms,
      groups: payload.groups,
      evaluators: payload.evaluators,
      evaluateds: payload.evaluateds,
      admins: payload.admins,
    };
    const url = '/lists/load';
    const { data } = yield call(apiService.post, url, params);
    yield put(listsDataRequesResponse({
      data,
      failure: false,
    }));
  } catch (error) {
    yield put(listsDataRequesResponse({
      data: {},
      failure: true,
    }));
  }
}

export function* planUsersRequest() {
  try {
    const { data } = yield call(apiService.get, `${userPlansRoute}`);

    yield put(planUsersResponse({
      data,
      failure: false,
    }));
  } catch (error) {
    yield put(planUsersResponse({
      data: {},
      failure: true,
    }));
  }
}


export default [
  takeLatest(
    ListsTypes.LISTS_DATA_REQUEST,
    listsDataRequest,
  ),
  takeLatest(
    ListsTypes.PLAN_USERS_REQUEST,
    planUsersRequest,
  ),
];
