import { types } from '../actions/action-plan-actions';

const initialState = {
  data: [],
  loading: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.ACTION_PLANS_START:
      return { ...state, loading: true };
    case types.SET_ACTION_PLANS:
      return { ...state, data: action.payload.actionPlans, loading: false };
    default:
      return state;
  }
};
