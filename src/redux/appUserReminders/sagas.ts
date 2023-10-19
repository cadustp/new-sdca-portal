import parse from 'parse-link-header';
import { takeLatest, put, call } from 'redux-saga/effects';
import { AnyAction } from 'redux';
import { stringfySearchParams } from '../../helpers/api_service_helper';
import apiService from '../../services/apiService';
import { appUserReminderTypes } from './types';
import { captureEvent } from '../../analytics';

import {
  searchAppUserRemindersRequestSuccess,
  searchAppUserRemindersFailure,
  searchFirstPageAppUserRemindersRequestSuccess,
  setRemindersLocations
} from './actions';
import { string } from 'prop-types';

export function* searchAppUserRemindersRequest({
  payload: { params, page = 1 },
}: AnyAction) {
  const eventParams = {
    forms: params.selectedForms?.length || 0,
    dateRange: !!params.selectedStartDate,
    statuses: params.selectedStatuses?.map(s => s.value).join(', ') || '-',
    evaluateds: params.selectedValuatedUsers?.length || 0,
  };

  try {
    const stringfiedParams = stringfySearchParams(params);
    const url = `/app_user/reminders${stringfiedParams}&page=${page}&per_page=50`;

    const { headers, data } = yield call(apiService.get, url);
    const parsedLinkHeader = parse(headers.link);
    const totalCount = headers['x-total-count'];

    const pagination = { total: totalCount, links: parsedLinkHeader };

    if (page === 1) {
      yield put(
        searchFirstPageAppUserRemindersRequestSuccess({
          payload: data,
          pagination,
        }),
      );
    } else {
      yield put(
        searchAppUserRemindersRequestSuccess({
          payload: data,
          pagination,
        }),
      );
    }

    if (params.filter) captureEvent('filterReminders', { ...eventParams, status: 'success' });
    return data;
  } catch (error) {
    yield put(searchAppUserRemindersFailure());
    if (params.filter) captureEvent('filterReminders', { ...eventParams, status: 'error', error: error.message });
  }
}

export function* fetchRemindersWithLocation({
  payload: { body },
}: AnyAction) {
  try {
    const stringfiedParams = stringfySearchParams(body.data);

    const url = `/quality/reminders_locations${stringfiedParams}`;
    const { data } = yield call(apiService.get, url);

    if(data) {
      yield put(setRemindersLocations({ list: data, showSnackBar: false }));
    }
  } catch(e){
    yield put(setRemindersLocations({ list: [], showSnackBar: true }));
  }
}

export default [
  takeLatest(
    appUserReminderTypes.GET_REMINDERS_LOCATIONS,
    fetchRemindersWithLocation
  ),
  takeLatest(
    appUserReminderTypes.SEARCH_APP_USER_REMINDERS_REQUEST,
    searchAppUserRemindersRequest,
  ),
];
