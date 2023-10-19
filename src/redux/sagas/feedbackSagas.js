import { takeLatest, put, call } from 'redux-saga/effects';
import { setFeedback, types } from '../actions/feedback-actions';
import apiService from '../../services/apiService';

export function* fetchFeedback({ payload: { body } }) {
  try {
    const { data } = yield call(apiService.post, '/report/feedback', body);

    yield put(setFeedback({ feedback: data.data }));
  } catch (error) {}
}

export default [takeLatest(types.FEEDBACK_REPORT_START, fetchFeedback)];
