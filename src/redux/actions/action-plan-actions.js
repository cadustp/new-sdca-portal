export const types = {
  ACTION_PLANS_START: 'ACTION_PLANS_START',
  SET_ACTION_PLANS: 'SET_ACTION_PLANS',
};

export const fetchActionPlans = ({ body }) => ({
  type: types.ACTION_PLANS_START,
  payload: { body },
});

export const setActionPlans = ({ actionPlans }) => ({
  type: types.SET_ACTION_PLANS,
  payload: { actionPlans },
});
