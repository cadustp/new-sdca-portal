export const types = {
  STATUS_BY_GROUPS_START: 'STATUS_BY_GROUPS_START',
  STATUS_BY_GROUPS_SUCCESS: 'STATUS_BY_GROUPS_SUCCESS',
  SET_STATUS_BY_GROUPS_GRAPH: 'SET_STATUS_BY_GROUPS_GRAPH',
};

export const fetchStatusByGroups = ({ body }) => ({
  type: types.STATUS_BY_GROUPS_START,
  payload: { body },
});

export const setStatusByGroupsGraph = ({
  labels,
  accomplished,
  pending,
  late,
  subLabels,
}) => ({
  type: types.SET_STATUS_BY_GROUPS_GRAPH,
  payload: {
    labels,
    accomplished,
    pending,
    late,
    subLabels,
  },
});

export const setStatusByGroups = ({
  id,
  labels,
  accomplished,
  pending,
  late,
}) => ({
  type: types.STATUS_BY_GROUPS_SUCCESS,
  payload: {
    id,
    labels,
    accomplished,
    pending,
    late,
  },
});
