import { types } from '../actions/adherence-actions';

const initialState = {
  data: {
    group: {
      id: [],
      labels: [],
      values: [],
    },
  },
  graph: {
    labels: [],
    values: [],
    subLabels: [],
  },
  loading: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.ADHERENCE_BY_GROUPS_START:
      return { ...state, loading: true };
    case types.ADHERENCE_BY_GROUPS_SUCCESS:
      return {
        ...state,
        data: {
          group: action.payload,
        },
      };
    case types.SET_ADHERENCE_BY_GROUPS_GRAPH:
      return {
        ...state,
        loading: false,
        graph: {
          ...state.graph,
          subLabels: action.payload.subLabels,
          labels: action.payload.labels,
          values: action.payload.values,
        },
      };
    default:
      return state;
  }
};
