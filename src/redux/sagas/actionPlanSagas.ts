import { takeLatest, put, call } from 'redux-saga/effects';
import { setActionPlans, types } from '../actions/action-plan-actions';
import apiService from '../../services/apiService';

export function* fetchActionPlans({ payload: { body } }) {
  try {
    const { data } = yield call(apiService.post, '/report/action_plan', body);

    yield put(setActionPlans({ actionPlans: data.data }));
  } catch (error: any) {}
}

export default [
  // @ts-ignore
  takeLatest(types.ACTION_PLANS_START, fetchActionPlans),
];
