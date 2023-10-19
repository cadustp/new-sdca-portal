import { Reducer } from 'redux';
import moment from '../../timezones/moment';
import { PlansSideFiltersState, plansSideFilterTypes } from './types';

const INITIAL_STATE: PlansSideFiltersState = {
  sideFilterParams: {
    startRange: moment().locale('pt-br').subtract(91, 'days'),
    endRange: moment().locale('pt-br'),
    planUserIds: [],
    planUserGroupIds: [],
    assetIds: [],
    assetGroupIds: [],
    appUserIds: [],
    appUserGroupIds: [],
  },
};

const reducer: Reducer<PlansSideFiltersState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case plansSideFilterTypes.UPDATE_PLANS_FILTER:
      return {
        ...state,
        sideFilterParams: { ...state.sideFilterParams, ...action.payload },
      };
    case plansSideFilterTypes.CLEAR_PLANS_FILTER:
      return {
        ...state,
        sideFilterParams: INITIAL_STATE.sideFilterParams,
      };
    default:
      return state;
  }
};
export default reducer;
