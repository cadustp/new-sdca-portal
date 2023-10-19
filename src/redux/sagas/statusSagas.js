import { takeLatest, put, call } from 'redux-saga/effects';
import {
  setStatusByGroups,
  setStatusByGroupsGraph,
  types,
} from '../actions/status-actions';
import apiService from '../../services/apiService';

function* fetchStatusByGroups({ payload: { body } }) {
  try {
    const result = yield call(apiService.post, '/status/groups', body);

    yield call(mountStatusGraphData, { result });
    const id = [];
    const labels = [];
    const accomplished = [];
    const pending = [];
    const late = [];

    result.data.data.forEach((data) => {
      id.push(data.group.id);
      labels.push(data.group.name);
      accomplished.push(data.group.status.accomplished);
      pending.push(data.group.status.pending);
      late.push(data.group.status.late);
    });

    yield put(
      setStatusByGroups({
        id,
        labels,
        accomplished,
        pending,
        late,
      }),
    );
  } catch (error) {}
}

function* mountStatusGraphData({ result }) {
  try {
    const labels = [];
    const accomplished = [];
    const pending = [];
    const late = [];
    const subLabels = [];

    result.data.data.forEach((item) => {
      const subLabel = item.group.parent_group_name
        ? item.group.parent_group_name
        : '';

      labels.push(item.group.name);
      accomplished.push(Math.round(item.group.status.accomplished));
      pending.push(Math.round(item.group.status.pending));
      late.push(Math.round(item.group.status.late));
      subLabels.push(subLabel);
    });

    yield put(
      setStatusByGroupsGraph({
        labels,
        accomplished,
        pending,
        late,
        subLabels,
      }),
    );
  } catch (e) {
    console.log(e);
  }
}

export default [takeLatest(types.STATUS_BY_GROUPS_START, fetchStatusByGroups)];
