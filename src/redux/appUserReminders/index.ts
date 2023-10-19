import { AppUserRemindersState, appUserReminderTypes } from './types';
import { Reducer } from 'redux';

const INITIAL_STATE: AppUserRemindersState = {
  app_users_reminders:{
    data: [],
    pagination: 1,
  },
  snackbarState: {
    context: '',
    type: '',
    open: false,
  },
  searchLoading: false,
  failure: false,
  infiniteLoading: false,
  inputText: "",
  remindersLocations: [],
}

const reducer: Reducer<AppUserRemindersState> = (state = INITIAL_STATE, action) => {
  switch(action.type){
    case appUserReminderTypes.SEARCH_APP_USER_REMINDERS_REQUEST:
      return {
        ...state,
        searchLoading: true,
      };
    case appUserReminderTypes.SEARCH_APP_USER_REMINDERS_SUCCESS:
      return {
        ...state,
        app_users_reminders: {
          data: [ ...state.app_users_reminders.data, ...action.payload.data],
          pagination: action.payload.pagination ? action.payload.pagination :state.app_users_reminders.pagination
        },
        searchLoading: false,
        failure: false,
        infiniteLoading: false,
      };
    case appUserReminderTypes.SEARCH_FIRST_PAGE_APP_USER_REMINDERS_SUCCESS:
      return {
        ...state,
        app_users_reminders: {
          data: [ ...action.payload.data],
          pagination: action.payload.pagination ? action.payload.pagination :state.app_users_reminders.pagination
        },
        searchLoading: false,
        failure: false,
        infiniteLoading: false,
      };
    case appUserReminderTypes.SEARCH_APP_USER_REMINDERS_FAILURE:
      return { ...state, searchLoading: false, failure: true };
    case appUserReminderTypes.OPEN_SNACKBAR:
      return {
        ...state,
        snackbarState: {
          ...state.snackbarState,
          context: action.payload,
          open: true,
        },
      };
    case appUserReminderTypes.CLOSE_SNACKBAR:
      return {
        ...state,
        snackbarState: { ...state.snackbarState, open: false },
      };
    case appUserReminderTypes.GET_REMINDERS_LOCATIONS:
      return {
        ...state,
        infiniteLoading: true,
      };
    case appUserReminderTypes.SET_REMINDERS_LOCATIONS:
      return {
        ...state,
        remindersLocations: action.payload.list,
        infiniteLoading: false,
        snackbarState: {
          type: '',
          context: '',
          open: action.payload.showSnackBar,
        },
      };
    default:
      return state;
  }
}
export default reducer;