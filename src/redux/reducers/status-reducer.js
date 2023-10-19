import { types } from '../actions/status-actions';

const initialState = {
  data: {
    group: {
      id: [],
      labels: [],
      accomplished: [],
      pending: [],
      late: [],
    },
  },
  graph: {
    labels: [],
    values: {
      accomplished: [],
      pending: [],
      late: [],
    },
    subLabels: [],
  },
  loading: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.STATUS_BY_GROUPS_START:
      return { ...state, loading: true };
    case types.STATUS_BY_GROUPS_SUCCESS:
      return {
        ...state,
        data: {
          group: action.payload,
        },
      };
    case types.SET_STATUS_BY_GROUPS_GRAPH:
      return {
        ...state,
        loading: false,
        graph: {
          ...state.graph,
          labels: action.payload.labels,
          subLabels: action.payload.subLabels,
          values: {
            ...state.graph.values,
            accomplished: action.payload.accomplished,
            late: action.payload.late,
            pending: action.payload.pending,
          },
        },
      };
    default:
      return state;
  }
};
