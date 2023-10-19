import {
  takeLatest, put, call, select,
} from 'redux-saga/effects';
import { AnyAction } from 'redux';
import apiService from '../../services/apiService';
import { RESPONSE_STATUS } from '../../helpers/consts';
import { routinesTypes } from './types';
import {
  loadAllRoutinesResponse,
  deleteRoutineResponse,
  activatePauseRoutineResponse,
} from './actions';
import { captureEvent } from '../../analytics';

const renameKey = data => data.map(d => {
  const r = { ...d, endAt: d.end_at };
  delete r.end_at;
  return r;
});

function toggleRoutineStatus({ status }) {
  switch (status) {
    case 'running':
      return 'paused';

    case 'paused':
      return 'running';

    default:
      return status;
  }
}

export function* loadAllRoutinesRequestSagas({
  payload,
}: AnyAction) {
  try {
    const url = '/reminder_routines';
    const { data } = yield call(apiService.get, url);

    const routines = renameKey(data);

    yield put(loadAllRoutinesResponse({
      routines,
    }));
    return true;
  } catch (error: any) {
    yield put(loadAllRoutinesResponse({
      errorMessage: error.response.data.message,
    }));
  }
}

export function* deleteRoutineRequest({
  payload,
}: AnyAction) {
  try {
    if (payload) {
      const url = `/reminder_routines/inactivate/${payload}`;
      const { status } = yield call(apiService.put, url, payload);

      if (status === 200) {
        const routines = yield select(state => state.routines.list);
        const updatedRoutines = routines.filter(r => r.id !== payload);
        yield put(deleteRoutineResponse({ routines: updatedRoutines, status: RESPONSE_STATUS.SUCCESS }));
      }
    }
    captureEvent('confirmDeleteRoutine', { status: 'success' });
    return true;
  } catch (error: any) {
    yield put(deleteRoutineResponse({
      status: RESPONSE_STATUS.FAILURE,
      error: error.response?.data?.message ?? error.message,
    }));
    captureEvent('confirmDeleteRoutine', { status: 'error', error: error.response?.data?.message ?? error.message });
  }
}

export function* activatePauseRoutineRequest({
  payload,
}: AnyAction) {
  try {
    if (payload) {
      const url = '/reminder_routines/run_or_pause';
      const { status } = yield call(apiService.post, url, { id: payload });
      if (status === 200) {
        const routines = yield select(state => state.routines.list);
        const updatedRoutines = routines.map(r => (r.id === payload ? { ...r, status: toggleRoutineStatus(r) } : r));
        yield put(activatePauseRoutineResponse({ routines: updatedRoutines }));
      }
    }
    return true;
  } catch (error: any) {
    yield put(activatePauseRoutineResponse({
      error: error.response?.data?.message ?? error.message,
    }));
  }
}

export default [
  takeLatest(
    routinesTypes.LOAD_ALL_ROUTINES_REQUEST,
    loadAllRoutinesRequestSagas,
  ),
  takeLatest(
    routinesTypes.DELETE_ROUTINE_REQUEST,
    deleteRoutineRequest,
  ),
  takeLatest(
    routinesTypes.ACTIVATE_PAUSE_ROUTINE_REQUEST,
    activatePauseRoutineRequest,
  ),
];
