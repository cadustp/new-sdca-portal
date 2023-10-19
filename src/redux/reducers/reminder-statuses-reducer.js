import { STATUSES } from '../../assets/constants';

const initialState = {
  statuses: [
    STATUSES.PENDING,
    STATUSES.LATE,
    STATUSES.ACCOMPLISHED,
    STATUSES.CANCELED,
    // STATUSES.RESCHEDULED,
  ],
};

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
