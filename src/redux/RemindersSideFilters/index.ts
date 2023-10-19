import { Reducer } from 'redux';
import moment from '../../timezones/moment';
import { RemindersSideFiltersState, remindersSideFilterTypes } from './types';

const INITIAL_STATE: RemindersSideFiltersState = {
  sideFilterParams: {
    selectedForms: [],
    selectedStartDate: moment().locale('pt-br').subtract(30, 'days'),
    selectedEndDate: moment().locale('pt-br'),
    selectedStatuses: [],
    selectedGroups: [],
    selectedValuatedUsers: [],
  },
};
const reducer: Reducer<RemindersSideFiltersState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case remindersSideFilterTypes.UPDATE_REMINDERS_FILTER:
      return {
        ...state,
        sideFilterParams: { ...state.sideFilterParams, ...action.payload },
      };
    case remindersSideFilterTypes.CLEAR_REMINDERS_FILTER:
      return {
        ...state,
        sideFilterParams: INITIAL_STATE.sideFilterParams,
      };
    default:
      return state;
  }
};
export default reducer;
