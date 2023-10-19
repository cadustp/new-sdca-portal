import {
  takeLatest, put, call, select,
} from 'redux-saga/effects';
import { AnyAction } from 'redux';
import apiService from '../../services/apiService';
import { digitalContentsTypes } from './types';
import {
  searchDigitalContentsResponse,
  deleteContentResponse,
  saveContentResponse,
} from './actions';
import { RESPONSE_STATUS } from '../../helpers/consts';
import { captureEvent } from '../../analytics';

const mapPayload = items => items.map(item => item.value);

export function* searchDigitalContentsRequest({
  payload,
}: AnyAction) {
  try {
    const url = 'contents';
    const { data } = yield call(apiService.get, url);

    yield put(searchDigitalContentsResponse({
      data,
    }));
    return true;
  } catch (error: any) {
    yield put(searchDigitalContentsResponse({
      error: error.response.data.message,
    }));
  }
}
export function* deleteContentRequest({
  payload,
}: AnyAction) {
  let deleteError;
  const contents = yield select(state => state.digitalContents.contents);
  try {
    const url = `/contents/${payload.id}`;
    const { data } = yield call(apiService.delete, url, payload);
    deleteError = data.error ?? null;

    yield put(deleteContentResponse({
      deleteStatus: data.error ? RESPONSE_STATUS.FAILURE : RESPONSE_STATUS.SUCCESS,
      deleteError,
      updatedContents: deleteError ? contents : contents.filter(c => c.id !== payload.id),
    }));

    captureEvent('confirmDeleteContents', { status: 'success' });
    return true;
  } catch (error: any) {
    captureEvent('confirmDeleteContents', { status: 'error', error: error.response?.data?.message });
    yield put(deleteContentResponse({
      deleteStatus: RESPONSE_STATUS.FAILURE,
      deleteError: error.response.data.message,
      updatedContents: contents,
    }));
  }
}

export function* saveContentRequest({
  payload,
}: AnyAction) {
  try {
    let saveError = '';
    const url = `/contents${payload.id ? `/${payload.id}` : ''}`;

    if (payload.id) {
      const params = {
        id: payload.id,
        name: payload.name.trim(),
        description: payload.description,
        user_ids: mapPayload(payload.users),
      };
      const { data } = yield call(payload.id ? apiService.put : apiService.post, url, params);
      saveError = data.error ?? '';
    } else {
      const formData = new FormData();
      formData.append('digital_content[name]', payload.name?.trim());
      formData.append('digital_content[description]', payload.description?.trim());
      formData.append('digital_content[user_ids]', mapPayload(payload.users));
      formData.append('digital_content[document]', payload.file.file, payload.file.file.name);
      const { data } = yield call(apiService.post, url, formData);
      saveError = data.error ?? '';
    }

    yield put(saveContentResponse({
      saveStatus: RESPONSE_STATUS.SUCCESS,
      saveError,
    }));
    captureEvent('saveDigitalContent', { status: 'success', kind: payload.id ? 'edit' : 'new', sharedUsers: payload.users?.length });
    return true;
  } catch (error: any) {
    captureEvent('saveDigitalContent', {
      status: 'error', kind: payload.id ? 'edit' : 'new', sharedUsers: payload.users?.length, error: error.response?.data?.message,
    });
    yield put(saveContentResponse({
      saveStatus: RESPONSE_STATUS.FAILURE,
      saveError: error.response.data.message,
    }));
  }
}

export default [
  takeLatest(
    digitalContentsTypes.SEARCH_DIGITAL_CONTENTS_REQUEST,
    searchDigitalContentsRequest,
  ),
  takeLatest(
    digitalContentsTypes.DELETE_CONTENT_REQUEST,
    deleteContentRequest,
  ),
  takeLatest(
    digitalContentsTypes.SAVE_CONTENT_REQUEST,
    saveContentRequest,
  ),
];
