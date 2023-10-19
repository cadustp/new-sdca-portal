import { takeLatest, put, call } from 'redux-saga/effects';
import { AnyAction } from 'redux';
import parse from 'parse-link-header';
import apiService, {
  fileFetcher,
} from '../../services/apiService';
import { usersTypes, filterParams } from './types';
import {
  searchFirstUsersRequestSuccess,
  searchUsersRequestSuccess,
  searchUsersRequestFailure,
  importUsersRequestResponse,
  activateInactivateUsersSuccess,
  activateInactivateUsersFailure,
  saveUserRequestResponse,
  listAdminsRequestResponse,
  exportUsersResponse,
} from './actions';
import { RESPONSE_STATUS, ORDER_TYPES } from '../../helpers/consts';
import { captureEvent } from '../../analytics';

const stringfySearchParams = paramsObject => {
  const {
    text,
    names,
    emails,
    groups,
    typesOfUsers,
    startDate,
    endDate,
    active,
    sort,
  }: filterParams = paramsObject;
  const url = [
    `?text=${text ?? ''}`,
    `&ids=${[...names ?? [], ...emails ?? []].map(user => user.value) ?? ''}`,
    `&groups=${groups?.map(group => group.value) ?? ''}`,
    `&types_of_users=${typesOfUsers?.map(typeOfUser => typeOfUser.value) ?? ''}`,
    `&start_date=${startDate ?? ''}`,
    `&end_date=${endDate ?? ''}`,
    `&active=${active ?? true}`,
    `&sort=${sort ?? ORDER_TYPES.ALPHABETICAL_ASCENDING}`,
  ].join('');

  return url;
};

const mapPayload = items => {
  if (items) {
    return items.map(item => item.value);
  }
};

export function* searchUsersRequest({
  payload,
}: AnyAction) {
  try {
    const { params, page } = payload;
    const stringfiedParams = stringfySearchParams(params);
    const url = `/users${stringfiedParams}&page=${page}&per_page=50`;

    const { headers, data } = yield call(apiService.get, url);
    const parsedLinkHeader = parse(headers.link);
    const totalCount = headers['x-total-count'];

    const pagination = { total: totalCount, links: parsedLinkHeader };
    yield put(
      page === 1
        ? searchFirstUsersRequestSuccess({
          payload: data,
          pagination,
        })
        : searchUsersRequestSuccess({
          payload: data,
          pagination,
        }),
    );

    return data;
  } catch (error) {
    yield put(searchUsersRequestFailure());
  }
}

export function* importUsersRequest({
  payload,
}: AnyAction) {
  let rowErrors = [];
  try {
    const formData = new FormData();
    const url = '/users/import';
    formData.append('[spreadsheet]', payload.selectedFile);
    formData.append('send_to_email', payload.email);
    const { data } = yield call(apiService.post, url, formData);
    rowErrors = data.row_errors ?? [];
    yield put(importUsersRequestResponse({
      importStatus: RESPONSE_STATUS.SUCCESS,
      rowErrors,
    }));
    captureEvent('importUsers', { status: 'success', hasErrorRows: rowErrors?.length });
    return true;
  } catch (error) {
    captureEvent('importUsers', { status: 'error', error: error.response?.data?.message });
    yield put(importUsersRequestResponse({
      importStatus: RESPONSE_STATUS.FAILURE,
      rowErrors,
    }));
  }
}

export function* activateInactivateUsersRequest({
  payload,
}: AnyAction) {
  try {
    const url = '/users/activate_inactivate';
    const { status, error } = yield call(apiService.patch, url, payload);

    if (status === 200) {
      yield put(activateInactivateUsersSuccess());
    } else {
      throw new Error(error);
    }

    captureEvent('activateInactivateUsers', {
      users: payload.ids?.length,
      status: 'success',
      action: payload.active ? 'activate' : 'inactivate',
    });
  } catch (error) {
    captureEvent('activateInactivateUsers', {
      users: payload.ids?.length,
      status: 'error',
      action: payload.active ? 'activate' : 'inactivate',
      error: error.response?.data?.message,
    });
    yield put(activateInactivateUsersFailure());
  }
}

export function* saveUserRequest({
  payload,
}: AnyAction) {
  let saveError = '';
  try {
    const user = {
      id: payload.id ?? null,
      name: payload.name,
      email: payload.email,
      user_type: mapPayload(payload.userType),
      password: payload.password.length ? payload.password : null,
      password_confirmation: payload.passwordConfirmation.length ? payload.passwordConfirmation : null,
      parent_user: payload.responsible.value,
      admin_users: mapPayload(payload.othersResponsibles),
      group: payload.group.value,
      language: payload.language.key,
      register: payload.identifier,
      enable_send_email_app_user_code: payload.enableSendEmail,
      has_temporary_access: payload.hasTemporaryAccess,
    };

    const url = `/users${payload.id ? `/${payload.id}` : ''}`;
    const { data } = yield call(payload.id ? apiService.put : apiService.post, url, user);

    saveError = data[0].error ?? '';
    if (saveError) {
      yield put(saveUserRequestResponse({
        saveStatus: RESPONSE_STATUS.FAILURE,
        saveError,
      }));
    } else {
      yield put(saveUserRequestResponse({
        saveStatus: RESPONSE_STATUS.SUCCESS,
        saveError,
      }));
    }
    captureEvent('saveUser', {
      status: saveError ? 'error' : 'success',
      kind: payload.id ? 'edit' : 'create',
      userTypes: mapPayload(payload.userType),
      hasOtherResponsibles: mapPayload(payload.othersResponsibles),
      hasIdentifier: !!payload.identifier,
      enableSendEmail: payload.enableSendEmail,
      hasErrors: saveError,
    });
    return true;
  } catch (error) {
    captureEvent('saveUser', {
      status: 'error',
      kind: payload.id ? 'edit' : 'create',
      userTypes: mapPayload(payload.userType),
      hasOtherResponsibles: mapPayload(payload.othersResponsibles),
      hasIdentifier: !!payload.identifier,
      enableSendEmail: payload.enableSendEmail,
      error: error.response?.data?.message,
    });
    yield put(saveUserRequestResponse({
      saveStatus: RESPONSE_STATUS.FAILURE,
      saveError,
    }));
  }
}

export function* listAdminsRequest() {
  try {
    const url = '/users/admins';
    const { data } = yield call(apiService.get, url);
    const allAdmins = data ?? [];

    yield put(listAdminsRequestResponse({
      listStatus: RESPONSE_STATUS.SUCCESS,
      allAdmins,
    }));
    return true;
  } catch (error) {
    yield put(listAdminsRequestResponse({
      allAdmins: RESPONSE_STATUS.FAILURE,
    }));
  }
}

export function* exportUsersRequest({
  payload,
}: AnyAction) {
  const eventParams = {
    active: payload.active,
    hasName: payload.names?.length,
    hasEmails: payload.emails?.length,
    hasGroups: payload.groups?.length,
    userTypes: payload.typesOfUsers?.map(t => t.value),
    hasDates: !!payload.startDate && !!payload.endDate,
  };
  try {
    const stringfiedParams = stringfySearchParams(payload);
    const url = `/users/export?${stringfiedParams}`;
    const { data } = yield call(fileFetcher().get, url);

    yield put(exportUsersResponse({
      exportObject: data,
      exportStatus: RESPONSE_STATUS.SUCCESS,
    }));
    captureEvent('exportUsers', { status: 'success', ...eventParams });
  } catch (error) {
    captureEvent('exportUsers', { status: 'error', ...eventParams, error: error.message });
    yield put(exportUsersResponse({
      exportStatus: RESPONSE_STATUS.FAILURE,
      exportError: error.message,
    }));
  }
};

export default [
  takeLatest(
    usersTypes.SEARCH_USERS_REQUEST,
    searchUsersRequest,
  ),
  takeLatest(
    usersTypes.IMPORT_USERS_REQUEST,
    importUsersRequest,
  ),
  takeLatest(
    usersTypes.ACTIVATE_INACTIVATE_USERS_REQUEST,
    activateInactivateUsersRequest,
  ),
  takeLatest(
    usersTypes.SAVE_USER_REQUEST,
    saveUserRequest,
  ),
  takeLatest(
    usersTypes.LIST_ADMINS_REQUEST,
    listAdminsRequest,
  ),
  takeLatest(
    usersTypes.EXPORT_USERS_REQUEST,
    exportUsersRequest,
  ),
];
