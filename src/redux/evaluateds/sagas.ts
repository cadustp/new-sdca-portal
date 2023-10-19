import { takeLatest, put, call } from 'redux-saga/effects';
import { AnyAction } from 'redux';
import parse from 'parse-link-header';
import apiService, { fileFetcher } from '../../services/apiService';
import { evaluatedsTypes, filterParams } from './types';
import { RESPONSE_STATUS, ORDER_TYPES } from '../../helpers/consts';

import {
  searchFirstEvaluatedsRequestSuccess,
  searchEvaluatedsRequestSuccess,
  searchEvaluatedsRequestFailure,
  importEvaluatedsRequestResponse,
  activateInactivateEvaluatedsSuccess,
  activateInactivateEvaluatedsFailure,
  saveEvaluatedRequestResponse,
  exportEvaluatedsResponse,
} from './actions';
import { captureEvent } from '../../analytics';

const stringfySearchParams = paramsObject => {
  const {
    text,
    names,
    emails,
    groups,
    startDate,
    endDate,
    active,
    sort,
  }: filterParams = paramsObject;
  const url = [
    `&text=${text ?? ''}`,
    `&ids=${[...names ?? [], ...emails ?? []].map(evaluated => evaluated.value) ?? ''}`,
    `&groups=${groups?.map(group => group.value) ?? ''}`,
    `&start_date=${startDate ?? ''}`,
    `&end_date=${endDate ?? ''}`,
    `&active=${active ?? true}`,
    `&sort=${sort ?? ORDER_TYPES.ALPHABETICAL_ASCENDING}`,
  ].join('');

  return url;
};

export function* searchEvaluatedsRequest({
  payload,
}: AnyAction) {
  try {
    const { params, page } = payload;
    const stringfiedParams = stringfySearchParams(params);
    const url = `/users?user_type=evaluated${stringfiedParams}&page=${page}&per_page=50`;

    const { headers, data } = yield call(apiService.get, url);
    const parsedLinkHeader = parse(headers.link);
    const totalCount = headers['x-total-count'];

    const pagination = { total: totalCount, links: parsedLinkHeader };
    yield put(
      page === 1
        ? searchFirstEvaluatedsRequestSuccess({
          payload: data,
          pagination,
        })
        : searchEvaluatedsRequestSuccess({
          payload: data,
          pagination,
        }),
    );

    return data;
  } catch (error: any) {
    yield put(searchEvaluatedsRequestFailure());
  }
}

export function* importEvaluatedsRequest({
  payload,
}: AnyAction) {
  let rowErrors = [];
  try {
    const formData = new FormData();
    const url = '/evaluateds/import';
    formData.append('[spreadsheet]', payload);
    const { data } = yield call(apiService.post, url, formData);
    rowErrors = data.row_errors ?? [];

    yield put(importEvaluatedsRequestResponse({
      importStatus: RESPONSE_STATUS.SUCCESS,
      rowErrors,
    }));
    captureEvent('importEvaluateds', { status: 'success', hasErrorRows: rowErrors?.length });
    return true;
  } catch (error: any) {
    captureEvent('importEvaluateds', { status: 'error', error: error.response?.data?.message });
    yield put(importEvaluatedsRequestResponse({
      importStatus: RESPONSE_STATUS.FAILURE,
      rowErrors,
    }));
  }
}

export function* activateInactivateEvaluatedsRequest({
  payload,
}: AnyAction) {
  try {
    const url = '/users/activate_inactivate';
    const { status, error } = yield call(apiService.patch, url, { ...payload, user_type: 'evaluated' });

    if (status === 200) {
      yield put(activateInactivateEvaluatedsSuccess());
    } else {
      yield put(activateInactivateEvaluatedsFailure());
    }
    captureEvent('activateInactivateEvaluateds', {
      evaluateds: payload.ids?.length,
      status: 'success',
      action: payload.active ? 'activate' : 'inactivate',
    });
  } catch (error: any) {
    captureEvent('activateInactivateEvaluateds', {
      evaluateds: payload.ids?.length,
      status: 'error',
      action: payload.active ? 'activate' : 'inactivate',
      error: error.response?.data?.message,
    });
    yield put(activateInactivateEvaluatedsFailure());
  }
}

export function* saveEvaluatedRequest({
  payload,
}: AnyAction) {
  let saveError = null;
  try {
    const user = {
      id: payload.id ?? null,
      name: payload.name,
      email: payload.email,
      group_id: payload.group.value,
      language_id: payload.language.key,
      register: payload.identifier,
      enable_send_email_app_user_code: payload.enableSendEmail,
    };

    const url = `/users${payload.id ? `/update_evaluated/${payload.id}` : '/create_evaluated'}`;
    const { data } = yield call(payload.id ? apiService.put : apiService.post, url, { user });
    if (data.error) saveError = data.error;

    if (saveError) {
      yield put(saveEvaluatedRequestResponse({
        saveStatus: RESPONSE_STATUS.FAILURE,
        saveError,
      }));
    } else {
      yield put(saveEvaluatedRequestResponse({
        saveStatus: RESPONSE_STATUS.SUCCESS,
        saveError,
      }));
    }
    captureEvent('saveEvaluated', {
      status: saveError ? 'error' : 'success',
      kind: payload.id ? 'edit' : 'create',
      hasIdentifier: !!payload.identifier,
      enableSendEmail: payload.enableSendEmail,
      hasErrors: saveError,
    });
    return true;
  } catch (error: any) {
    captureEvent('saveEvaluated', {
      status: 'error',
      kind: payload.id ? 'edit' : 'create',
      hasIdentifier: !!payload.identifier,
      enableSendEmail: payload.enableSendEmail,
      error: error.response?.data?.message,
    });
    yield put(saveEvaluatedRequestResponse({
      saveStatus: RESPONSE_STATUS.FAILURE,
      saveError,
    }));
  }
}

export function* exportEvaluatedRequest({
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
    const url = `/evaluateds/export?user_type=evaluated&${stringfiedParams}`;
    const { data } = yield call(fileFetcher().get, url);

    yield put(exportEvaluatedsResponse({
      exportObject: data,
      exportStatus: RESPONSE_STATUS.SUCCESS,
    }));
    captureEvent('exportEvaluateds', { status: 'success', ...eventParams });
  } catch (error: any) {
    captureEvent('exportEvaluateds', { status: 'error', ...eventParams, error: error.message });
    yield put(exportEvaluatedsResponse({
      exportStatus: RESPONSE_STATUS.FAILURE,
      exportError: error.message,
    }));
  }
};
export default [
  takeLatest(
    evaluatedsTypes.SEARCH_EVALUATEDS_REQUEST,
    searchEvaluatedsRequest,
  ),
  takeLatest(
    evaluatedsTypes.IMPORT_EVALUATEDS_REQUEST,
    importEvaluatedsRequest,
  ),
  takeLatest(
    evaluatedsTypes.ACTIVATE_INACTIVATE_EVALUATEDS_REQUEST,
    activateInactivateEvaluatedsRequest,
  ),
  takeLatest(
    evaluatedsTypes.SAVE_EVALUATED_REQUEST,
    saveEvaluatedRequest,
  ),
  takeLatest(
    evaluatedsTypes.EXPORT_EVALUATEDS_REQUEST,
    exportEvaluatedRequest,
  ),
];
