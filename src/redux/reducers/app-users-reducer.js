import { Types } from '../actions/app-users-actions';

const initialState = {
  appUsers: [],
  failure: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Types.LOAD_APP_USERS_REQUEST:
      return { ...state, failure: false };
    case Types.LOAD_APP_USERS_SUCCESS:
      return { ...state, appUsers: action.payload };
    case Types.LOAD_APP_USERS_FAILURE:
      return { ...state, failure: true };
    default:
      return state;
  }
};
