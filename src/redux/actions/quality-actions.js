export const types = {
  QUALITY_BY_GROUPS: 'QUALITY_BY_GROUPS',
  QUALITY_BY_GROUPS_RANKING_START: 'QUALITY_BY_GROUPS_RANKING_START',
  SET_QUALITY_BY_GROUPS_RANKING: 'SET_QUALITY_BY_GROUPS_RANKING',
  QUALITY_BY_QUESTION: 'QUALITY_BY_QUESTION',
  QUALITY_BY_STEP: 'QUALITY_BY_STEP',
  QUALITY_BY_FORMS: 'QUALITY_BY_FORMS',
  QUALITY_BY_GROUPS_START: 'QUALITY_BY_GROUPS_START',
  QUALITY_BY_GROUPS_SUCCESS: 'QUALITY_BY_GROUPS_SUCCESS',
  SET_QUALITY_BY_GROUPS_GRAPH: 'SET_QUALITY_BY_GROUPS_GRAPH',
  QUALITY_BY_EMPLOYEES_START: 'QUALITY_BY_EMPLOYEES_START',
  QUALITY_BY_EMPLOYEES_SUCCESS: 'QUALITY_BY_EMPLOYEES_SUCCESS',
  QUALITY_BY_FORMS_START: 'QUALITY_BY_FORMS_START',
  QUALITY_BY_FORMS_SUCCESS: 'QUALITY_BY_FORMS_SUCCESS',
  QUALITY_BY_QUESTIONS_START: 'QUALITY_BY_QUESTIONS_START',
  QUALITY_BY_QUESTIONS_SUCCESS: 'QUALITY_BY_QUESTIONS_SUCCESS',
  QUALITY_BY_STEPS_START: 'QUALITY_BY_STEPS_START',
  QUALITY_BY_STEPS_SUCCESS: 'QUALITY_BY_STEPS_SUCCESS',
};

export const fetchQualityByGroups = ({ body }) => ({
  type: types.QUALITY_BY_GROUPS_START,
  payload: { body },
});

export const fetchQualityGroupsRankings = ({ body }) => ({
  type: types.QUALITY_BY_GROUPS_RANKING_START,
  payload: { body },
});

export const fetchQualityByForms = ({ body }) => ({
  type: types.QUALITY_BY_FORMS_START,
  payload: { body },
});

export const fetchQualityByQuestions = ({ body }) => ({
  type: types.QUALITY_BY_QUESTIONS_START,
  payload: { body },
});

export const setQualityByQuestions = ({ questions }) => ({
  type: types.QUALITY_BY_QUESTIONS_SUCCESS,
  payload: questions,
});

export const fetchQualityByEmployees = ({ body }) => ({
  type: types.QUALITY_BY_EMPLOYEES_START,
  payload: { body },
});

export const setQualityByForms = ({ forms }) => ({
  type: types.QUALITY_BY_FORMS_SUCCESS,
  payload: forms,
});

export const fetchQualityBySteps = ({ body }) => ({
  type: types.QUALITY_BY_STEPS_START,
  payload: { body },
});

export const setQualityBySteps = ({ steps }) => ({
  type: types.QUALITY_BY_STEPS_SUCCESS,
  payload: steps,
});

export const setQualityByEmployees = ({ employees }) => ({
  type: types.QUALITY_BY_EMPLOYEES_SUCCESS,
  payload: employees,
});

export const setQualityRankings = ({ groups }) => ({
  type: types.SET_QUALITY_BY_GROUPS_RANKING,
  payload: groups,
});

export const setQualityByGroups = ({
  id,
  labels,
  values,
  groups,
  subLabels,
  userGroupStat,
}) => ({
  type: types.QUALITY_BY_GROUPS_SUCCESS,
  payload: {
    id,
    labels,
    values,
    groups,
    subLabels,
    userGroupStat,
  },
});
