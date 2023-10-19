import { call, put } from 'redux-saga/effects';
import apiService from '../../../services/apiService';
import { setActionPlans } from '../../actions/action-plan-actions';

export function* fetchActionPlans({ payload: { body } }) {
  try {
    const { data } = yield call(apiService.post, '/report/action_plan', body);

    yield put(setActionPlans({ actionPlans: data.data }));
  } catch (error: any) {}
}
