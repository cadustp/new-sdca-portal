import { takeLatest, put, call } from 'redux-saga/effects';
import {
  setAdherenceByGroups,
  setAdherenceByGroupsGraph,
  types,
} from '../actions/adherence-actions';
import apiService from '../../services/apiService';

function* fetchAdherenceByGroups({ payload: { body } }) {
  try {
    const result = yield call(apiService.post, '/adherence/groups', body);

    yield call(mountStatusGraphData, { result });

    const id = [];
    const labels = [];
    const values = [];
    let groups = [];
    let userGroupStat = {};
    userGroupStat = result.data.user_group;
    groups = result.data.data;

    result.data.data.forEach((data) => {
      id.push(data.group.id);
      labels.push(data.group.name);
      values.push(Math.round(data.group.adherence * 100));
    });

    yield put(
      setAdherenceByGroups({
        id,
        labels,
        values,
        groups,
        userGroupStat
      }),
    );
  } catch (error) {
    console.log(error);
  }
}

function* mountStatusGraphData({ result }) {
  try {
    const labels = [];
    const values = [];
    const subLabels = [];

    result.data.data.forEach((item) => {
      const subLabel = item.group.parent_group_name
        ? item.group.parent_group_name
        : '';
      labels.push(item.group.name);
      values.push(Math.round(item.group.adherence * 100));
      subLabels.push(subLabel);
    });

    yield put(
      setAdherenceByGroupsGraph({
        labels,
        values,
        subLabels,
      }),
    );
  } catch (e) {
    console.log(e);
  }
}

export default [
  takeLatest(types.ADHERENCE_BY_GROUPS_START, fetchAdherenceByGroups),
];
