import { types } from '../actions/valuated-users-actions';

const initialState = {
  ids: [],
  names: [],
  valuatedUsers: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_VALUATED_USERS:
      return {
        ...state,
        ids: action.payload.ids,
        names: action.payload.names,
        valuatedUsers: action.payload.valuatedUsers,
      };
    default:
      return state;
  }
};
