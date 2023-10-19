import { takeLatest, put, call } from 'redux-saga/effects';
import {
  Types,
  loadAppUsersSuccess,
  loadAppUsersFailure,
} from '../actions/app-users-actions';
import apiService from '../../services/apiService';

export function* loadAppUsers() {
  try {
    const result = yield call(apiService.get, '/user/app_users');

    const appUsers = result.data.data.map(appUser => ({
      id: appUser.id,
      name: appUser.name,
      email: appUser.email,
    }));

    yield put(loadAppUsersSuccess(appUsers));
  } catch (error) {
    yield put(loadAppUsersFailure(error));
  }
}

export default [takeLatest(Types.LOAD_APP_USERS_REQUEST, loadAppUsers)];
