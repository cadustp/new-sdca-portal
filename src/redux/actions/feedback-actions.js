export const types = {
  FEEDBACK_REPORT_START: 'FEEDBACK_REPORT_START',
  SET_FEEDBACK_REPORT: 'SET_FEEDBACK_REPORT',
};

export const fetchFeedback = ({ body }) => ({
  type: types.FEEDBACK_REPORT_START,
  payload: { body },
});

export const setFeedback = ({ feedback }) => ({
  type: types.SET_FEEDBACK_REPORT,
  payload: { feedback },
});
