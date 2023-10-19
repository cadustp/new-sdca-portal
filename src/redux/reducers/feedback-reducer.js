import { types } from '../actions/feedback-actions';

const initialState = {
  data: [],
  loading: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FEEDBACK_REPORT_START:
      return { ...state, loading: true };
    case types.SET_FEEDBACK_REPORT:
      return { ...state, data: action.payload.feedback, loading: false };
    default:
      return state;
  }
};
