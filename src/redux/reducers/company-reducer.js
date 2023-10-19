import { types } from '../actions/company-actions';

const initialState = {
  company: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_USER_COMPANY:
      return {
        ...state,
        company: action.payload.company,
      };
    default:
      return state;
  }
};
