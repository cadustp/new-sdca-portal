import { Reducer } from 'redux';
import { DashboardState, DashboardTypes } from './types';

const INITIAL_STATE: DashboardState = {
  failure: false,
  isLoading: false,
};

const reducer: Reducer<DashboardState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DashboardTypes.DASHBOARD_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case DashboardTypes.DASHBOARD_DATA_REQUEST_RESPONSE:
      return {
        ...state,
        isLoading: false,
        failure: action.payload.failure,
      };
    default:
      return state;
  }
};

export default reducer;
