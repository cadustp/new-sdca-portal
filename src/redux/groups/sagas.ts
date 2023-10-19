import { takeLatest, put, call } from 'redux-saga/effects';
import { AnyAction } from 'redux';
import parse from 'parse-link-header';
import apiService, { fileFetcher } from '../../services/apiService';
import { groupsTypes } from './types';
import {
  searchFirstGroupsRequestSuccess,
  searchGroupsRequestSuccess,
  searchGroupsRequestFailure,
  importGroupsRequestResponse,
  saveGroupRequestResponse,
  deleteGroupRequestResponse,
  listAllGroupsRequestResponse,
  exportGroupsResponse,
} from './actions';
import { RESPONSE_STATUS } from '../../helpers/consts';
import { captureEvent } from '../../analytics';

const stringfySearchParams = paramsObject => {
  const {
    selectedEndDate,
    selectedStartDate,
    selectedParentGroups,
    selectedGroups,
    inputText,
    selectedGroupMembers,
    selectedSortType,
  } = paramsObject;
  const url = [
    `&start_date=${selectedStartDate || ''}`,
    `&end_date=${selectedEndDate || ''}`,
    `&groups=${selectedGroups ? selectedGroups.map(group => group.value) : ''}`,
    `&parent_groups=${selectedParentGroups ? selectedParentGroups.map(parent => parent.value) : ''}`,
    `&name=${inputText || ''}`,
    `&members=${selectedGroupMembers ? selectedGroupMembers.map(member => member.value) : ''}`,
    `&sort_type=${selectedSortType || 'ALPHABETICAL_ASCENDING'}`,
  ].join('');

  return url;
};

export function* searchGroupsRequest({
  payload,
}: AnyAction) {
  try {
    const { params, page } = payload;
    const stringfiedParams = stringfySearchParams(params);
    const url = `/groups?${stringfiedParams}&page=${page}&per_page=50`;

    const { headers, data } = yield call(apiService.get, url);
    const parsedLinkHeader = parse(headers.link);
    const totalCount = headers['x-total-count'];

    const pagination = { total: totalCount, links: parsedLinkHeader };
    yield put(
      page === 1
        ? searchFirstGroupsRequestSuccess({
          payload: data,
          pagination,
        })
        : searchGroupsRequestSuccess({
          payload: data,
          pagination,
        }),
    );

    return data;
  } catch (error) {
    yield put(searchGroupsRequestFailure());
  }
}

export function* importGroupsRequest({
  payload,
}: AnyAction) {
  let rowErrors = [];
  try {
    const formData = new FormData();
    const url = '/groups/import';
    formData.append('[spreadsheet]', payload);
    const { data } = yield call(apiService.post, url, formData);
    rowErrors = data.row_errors ?? [];
    yield put(importGroupsRequestResponse({
      importStatus: RESPONSE_STATUS.SUCCESS,
      rowErrors,
    }));
    captureEvent('importGroups', { status: 'success', hasErrorRows: rowErrors?.length });
    return true;
  } catch (error) {
    captureEvent('importGroups', { status: 'error', error: error.response?.data?.message });
    yield put(importGroupsRequestResponse({
      importStatus: RESPONSE_STATUS.FAILURE,
      rowErrors,
    }));
  }
}

export function* saveGroupRequest({
  payload,
}: AnyAction) {
  let saveErrors = [];
  try {
    const url = `/groups${payload.id ? `/${payload.id}` : ''}`;
    const { data } = yield call(payload.id ? apiService.put : apiService.post, url, payload);
    saveErrors = data.errors ?? [];

    yield put(saveGroupRequestResponse({
      saveStatus: RESPONSE_STATUS.SUCCESS,
      saveErrors,
    }));
    captureEvent('saveGroup', { status: 'success', type: payload.id ? 'edit' : 'new', hasFather: !!payload.parent_id });
    return true;
  } catch (error) {
    captureEvent('saveGroup', {
      status: 'error', type: payload.id ? 'edit' : 'new', hasFather: !!payload.parent_id, error: error.response?.data?.message,
    });
    yield put(saveGroupRequestResponse({
      saveStatus: RESPONSE_STATUS.FAILURE,
      saveErrors,
    }));
  }
}

export function* deleteGroupRequest({
  payload,
}: AnyAction) {
  let deleteError;
  try {
    const url = `/groups/${payload.id}`;
    const { data } = yield call(apiService.delete, url, payload);

    deleteError = data.error ?? null;

    yield put(deleteGroupRequestResponse({
      deleteStatus: data.error ? RESPONSE_STATUS.FAILURE : RESPONSE_STATUS.SUCCESS,
      deleteError,
    }));

    captureEvent('confirmDeleteGroups', { status: deleteError?.length ? 'error' : 'success', error: deleteError });
    return true;
  } catch (error) {
    captureEvent('confirmDeleteGroups', { status: 'error', error: error.response?.data?.message });
    yield put(deleteGroupRequestResponse({
      deleteStatus: RESPONSE_STATUS.FAILURE,
      deleteError,
    }));
  }
}

export function* listAllGroupsRequest() {
  try {
    const url = '/groups/list';
    const { data } = yield call(apiService.get, url);
    const allGroups = data.groups ?? [];

    yield put(listAllGroupsRequestResponse({
      listStatus: RESPONSE_STATUS.SUCCESS,
      allGroups,
    }));
    return true;
  } catch (error) {
    yield put(listAllGroupsRequestResponse({
      listStatus: RESPONSE_STATUS.FAILURE,
    }));
  }
}

export function* exportGroupsRequest({
  payload,
}: AnyAction) {
  const eventParams = {
    hasName: payload.selectedGroups?.length,
    hasFather: payload.selectedParentGroups?.length,
    hasMembers: payload.selectedGroupMembers?.length,
    hasDates: !!payload.selectedStartDate && !!payload.selectedEndDate,
  };
  try {
    const stringfiedParams = stringfySearchParams(payload);
    const url = `/groups/export?${stringfiedParams}`;
    const { data } = yield call(fileFetcher().get, url);

    yield put(exportGroupsResponse({
      exportObject: data,
      exportStatus: RESPONSE_STATUS.SUCCESS,
    }));
    captureEvent('exportGroups', { status: 'success', ...eventParams });
  } catch (error) {
    captureEvent('exportGroups', { status: 'error', ...eventParams, error: error.message });
    yield put(exportGroupsResponse({
      exportStatus: RESPONSE_STATUS.FAILURE,
      exportError: error.message,
    }));
  }
};

export default [
  takeLatest(
    groupsTypes.SEARCH_GROUPS_REQUEST,
    searchGroupsRequest,
  ),
  takeLatest(
    groupsTypes.IMPORT_GROUPS_REQUEST,
    importGroupsRequest,
  ),
  takeLatest(
    groupsTypes.SAVE_GROUP_REQUEST,
    saveGroupRequest,
  ),
  takeLatest(
    groupsTypes.DELETE_GROUP_REQUEST,
    deleteGroupRequest,
  ),
  takeLatest(
    groupsTypes.LIST_ALL_GROUPS_REQUEST,
    listAllGroupsRequest,
  ),
  takeLatest(
    groupsTypes.EXPORT_GROUPS_REQUEST,
    exportGroupsRequest,
  ),
];
