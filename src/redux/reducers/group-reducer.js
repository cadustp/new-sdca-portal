import { types } from '../actions/group-actions';

const initialState = {
  data: {
    userGroups: {
      ids: [],
      names: [],
      groups: [],
    },
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_USER_GROUPS:
      return {
        ...state,
        data: {
          ...state.data,
          userGroups: action.payload,
        },
      };
    default:
      return state;
  }
};
