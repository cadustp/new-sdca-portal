import { types } from '../actions/quality-actions';

const initialState = {
  group: {
    id: [],
    labels: [],
    values: [],
    groups: [],
    subLabels: [],
  },
  rankings: {
    groups: [],
    loading: true,
  },
  users: {
    employees: [],
    loading: true,
  },
  ranking_group: {
    labels: [],
    values: [],
  },
  forms: {
    labels: [],
    values: [],
    data: [],
    loading: true,
  },
  steps: {
    data: [],
    loading: true,
  },
  questions: {
    data: [],
    loading: true,
  },
  loading: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.QUALITY_BY_GROUPS_START:
      return { ...state, loading: true };
    case types.QUALITY_BY_GROUPS_RANKING_START:
      return {
        ...state,
        rankings: { ...state.rankings.groups, loading: true },
      };

    case types.QUALITY_BY_GROUPS_SUCCESS:
      return {
        ...state,
        group: action.payload,
        loading: false,
      };
    case types.SET_QUALITY_BY_GROUPS_RANKING:
      return {
        ...state,
        rankings: { ...state.rankings, groups: action.payload, loading: false },
      };

    case types.QUALITY_BY_FORMS_START:
      return {
        ...state,
        forms: { ...state.forms, loading: true },
        questions: { ...state.questions, loading: true },
        steps: { ...state.steps, loading: true },
        users: { ...state.users, loading: true },
      };
    case types.QUALITY_BY_FORMS_SUCCESS:
      return {
        ...state,
        forms: { ...state.forms, data: action.payload, loading: false },
      };

    case types.QUALITY_BY_QUESTIONS_START:
      return {
        ...state,
        questions: { ...state.questions, loading: true },
      };
    case types.QUALITY_BY_QUESTIONS_SUCCESS:
      return {
        ...state,
        questions: { data: action.payload, loading: false },
      };

    case types.QUALITY_BY_STEPS_START:
      return {
        ...state,
        steps: { ...state.steps, loading: true },
      };
    case types.QUALITY_BY_STEPS_SUCCESS:
      return {
        ...state,
        steps: { data: action.payload, loading: false },
      };

    case types.QUALITY_BY_EMPLOYEES_START:
      return { ...state, users: { ...state.users, loading: true } };

    case types.QUALITY_BY_EMPLOYEES_SUCCESS:
      return { ...state, users: { employees: action.payload, loading: false } };
    default:
      return state;
  }
};
