export const types = {
  ADHERENCE_BY_GROUPS_START: 'ADHERENCE_BY_GROUPS_START',
  ADHERENCE_BY_GROUPS_SUCCESS: 'ADHERENCE_BY_GROUPS_SUCCESS',
  SET_ADHERENCE_BY_GROUPS_GRAPH: 'SET_ADHERENCE_BY_GROUPS_GRAPH',
};

export const fetchAdherenceByGroups = ({ body }) => ({
  type: types.ADHERENCE_BY_GROUPS_START,
  payload: { body },
});

export const setAdherenceByGroupsGraph = ({
  id, labels, values, groups, userGroupStat
}) => ({
  type: types.SET_ADHERENCE_BY_GROUPS_GRAPH,
  payload: {
    id,
    labels,
    values,
    groups,
    userGroupStat,
  },
});

export const setAdherenceByGroups = ({
  id, labels, values, groups, userGroupStat,
}) => ({
  type: types.ADHERENCE_BY_GROUPS_SUCCESS,
  payload: {
    id,
    labels,
    values,
    groups,
    userGroupStat,
  },
});
