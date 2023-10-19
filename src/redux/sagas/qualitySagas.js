import { takeLatest, put, call } from 'redux-saga/effects';

import apiService from '../../services/apiService';
import {
  setQualityByEmployees,
  setQualityByForms,
  setQualityByGroups,
  setQualityByQuestions,
  setQualityBySteps,
  setQualityRankings,
  types,
} from '../actions/quality-actions';

function* fetchQualityByGroups({ payload: { body } }) {
  try {
    const result = yield call(apiService.post, '/quality/groups', body);

    const id = [];
    const labels = [];
    const values = [];
    let groups = [];
    let userGroupStat = {};
    userGroupStat = result.data.user_group;

    const subLabels = [];
    groups = result.data.data;

    result.data.data.forEach((data) => {
      const subLabel = data.group.parent_group_name
        ? data.group.parent_group_name
        : '';
      id.push(data.group.id);
      labels.push(data.group.name);
      values.push(Math.round(data.group.score));
      subLabels.push(subLabel);
    });

    yield put(
      setQualityByGroups({
        id,
        labels,
        values,
        groups,
        subLabels,
        userGroupStat,
      }),
    );
  } catch (error) {
    console.log(error);
  }
}

function* fetchQualityGroupsByRanking({ payload: { body } }) {
  try {
    const { data } = yield call(apiService.post, '/quality/groups', body);

    const sorted = data.data.sort((a, b) => {
      if (a.group.score > b.group.score) return -1;
      if (a.group.score < b.group.score) return 1;
      return 0;
    });

    yield put(setQualityRankings({ groups: sorted }));
  } catch (error) {
    console.log(error);
  }
}

function* fetchQualityForms({ payload: { body } }) {
  try {
    const { data } = yield call(apiService.post, '/quality/forms', body);

    yield put(setQualityByForms({ forms: data.data }));
  } catch (error) {
    console.log(error);
  }
}

function* fetchQualityEmployees({ payload: { body } }) {
  try {
    const { data } = yield call(apiService.post, '/quality/users', body);

    yield put(setQualityByEmployees({ employees: data.data }));
  } catch (error) {
    console.log(error);
  }
}

function* fetchQualityQuestions({ payload: { body } }) {
  try {
    const { data } = yield call(apiService.post, '/quality/questions', body);

    yield put(setQualityByQuestions({ questions: data.data }));
  } catch (error) {
    console.log(error);
  }
}

function* fetchQualitySteps({ payload: { body } }) {
  try {
    const { data } = yield call(apiService.post, '/quality/steps', body);

    yield put(setQualityBySteps({ steps: data.data }));
  } catch (error) {
    console.log(error);
  }
}

export default [
  takeLatest(types.QUALITY_BY_GROUPS_START, fetchQualityByGroups),
  takeLatest(
    types.QUALITY_BY_GROUPS_RANKING_START,
    fetchQualityGroupsByRanking,
  ),
  takeLatest(types.QUALITY_BY_EMPLOYEES_START, fetchQualityEmployees),
  takeLatest(types.QUALITY_BY_FORMS_START, fetchQualityForms),
  takeLatest(types.QUALITY_BY_QUESTIONS_START, fetchQualityQuestions),
  takeLatest(types.QUALITY_BY_STEPS_START, fetchQualitySteps),
];
