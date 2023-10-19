import {
  takeLatest, put, call,
} from 'redux-saga/effects';
import { AnyAction } from 'redux';
import apiService from '../../services/apiService';
import {
  dashboardDataRequesResponse,
} from './actions';
import { DashboardTypes } from './types';
import { addUserGroups } from '../actions/group-actions';
import { addUserForms } from '../actions/form-actions';
import { addValuatedUsers } from '../actions/valuated-users-actions';
import { loadAppUsers } from '../../redux/sagas/appUsersSagas';

export function* dashboardDataRequest({
  payload,
}: AnyAction) {
  try {
    const url = '/dashboard';
    const { data } = yield call(apiService.get, url);

    yield put(addUserForms(data.forms));
    yield put(addUserGroups(data.groups));
    yield put(addValuatedUsers(data.valuated_users));
    yield put(dashboardDataRequesResponse({
      failure: false,
    }));
    yield call(loadAppUsers);
  } catch (error) {
    yield put(dashboardDataRequesResponse({
      failure: true,
    }));
  }
}

export default [
  takeLatest(
    DashboardTypes.DASHBOARD_DATA_REQUEST,
    dashboardDataRequest,
  ),
];
