import { AnyAction } from 'redux';
import { takeLatest, put, call } from 'redux-saga/effects';
import { push } from '@lagunovsky/redux-react-router';
import { RESPONSE_STATUS } from '../../helpers/consts';
import apiService from '../../services/apiService';
import { loginTypes } from './types';
import {
  doLoginResponse, saveLoggedUser, resetInstructionsResponse, updatePasswordResponse,
} from './actions';
import { getBrowserTimezone } from '../../helpers/date_helper';
import { setLanguage } from '../locale/actions';
import { addUserCompany } from '../actions/company-actions';
import { captureEvent, setUserProfile } from '../../analytics';

function setAuthTokens({
  user, authToken,
}) {
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('token', authToken);
}

function* setLocalStorageItems(user, dashboardSettings, authToken) {
  user.dashboardSettings = dashboardSettings;
  yield call(setAuthTokens, {
    user,
    authToken,
  });
}

export function* doLoginRequest({
  payload,
}: AnyAction) {
  try {
    const { email, password, session } = payload.login;

    const url = '/authentication';
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    const body = !!password ? { email, password } : { email, session };

    const { data } = yield call(apiService.post, url, body, { headers });

    data.user.timezone = getBrowserTimezone();
    data.user.companyLogo = data.company.image;
    delete data.company.image;

    yield setLocalStorageItems(data.user, data.company, data.token);
    yield put(saveLoggedUser(data.user));
    yield put(setLanguage(data.user.language));
    yield put(addUserCompany(data.company));

    captureEvent('doLogin', {
      status: 'success',
    });
    setUserProfile(data.user.id);

    yield put(doLoginResponse({ status: '' }));
    yield put(push('/dashboard'));
  } catch (e) {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    captureEvent('doLogin', {
      status: 'error',
      error: e.message,
    });
    yield put(doLoginResponse({ status: RESPONSE_STATUS.FAILURE }));
  }
}

export function* resetInstructionsRequest({
  payload,
}: AnyAction) {
  try {
    const url = '/authentication/forgot_password';
    yield call(apiService.post, url, payload);

    yield put(resetInstructionsResponse({ status: RESPONSE_STATUS.SUCCESS }));
  } catch (e) {
    yield put(resetInstructionsResponse({ status: RESPONSE_STATUS.FAILURE }));
  }
}

export function* updatePasswordRequest({
  payload,
}: AnyAction) {
  try {
    const url = '/authentication/update_password';
    yield call(apiService.post, url, payload);

    yield put(updatePasswordResponse({ status: RESPONSE_STATUS.SUCCESS }));
  } catch (e) {
    yield put(updatePasswordResponse({ status: RESPONSE_STATUS.FAILURE }));
  }
}

export function* doLogout({
  payload,
}: AnyAction) {
  const token = localStorage.getItem('token');
  yield window.localStorage.clear();

  const callApi = payload?.manualLogout;
  if (callApi) {
    const url = '/authentication/logout';
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    yield call(apiService.delete, url, { headers });
  }
  captureEvent('doLogout');
}

export default [
  takeLatest(
    loginTypes.DO_LOGIN_REQUEST,
    doLoginRequest,
  ),
  takeLatest(
    loginTypes.RESET_INSTRUCTIONS_REQUEST,
    resetInstructionsRequest,
  ),
  takeLatest(
    loginTypes.UPDATE_PASSWORD_REQUEST,
    updatePasswordRequest,
  ),
  takeLatest(
    loginTypes.DO_LOGOUT,
    doLogout,
  ),
];
