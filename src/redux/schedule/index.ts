import { Reducer } from 'redux';
import { RemindersState, RemindersTypes } from './types';

const INITIAL_STATE: RemindersState = {
  reminders: {
    data: [],
    page: 0,
  },
  isLoading: false,
  failure: false,
  selectedReminders: [],
  hasError: false,
  showSnackbar: false,
  message: '',
  importStatus: '',
  exportStatus: '',
  importRowErrors: [],
  filterParams: {
    inputSearchValue: '',
    form: [],
    appUser: [],
    evaluatedUser: [],
    startDate: '',
    endDate: '',
    status: [],
    active: true,
    sort: 'START_DATE_ASCENDING',
  },
  filterModalIsOpen: false,
  app_users: [],
  forms: [],
  evaluateds: [],
  exportObject: new Blob(),
  saveStatus: '',
  saveError: '',
  allForms: [],
  allEvaluators: [],
  allEvaluateds: [],
  allGroups: [],
  listsStatus: '',
  reminder: {
    id: 0,
    name: '',
    form: 0,
    evaluators: [],
    evaluateds: [],
    evaluatorsGroups: [],
    evaluatedsGroups: [],
    recurrence: 0,
    startDate: '',
    endDate: '',
    deadline: '',
    weekDays: [],
    automaticScheduling: false,
  },
  selectedReminderId: null,
};

const reducer: Reducer<RemindersState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RemindersTypes.UNSELECT_ALL_REMINDERS:
      return {
        ...state,
        selectedReminders: [],
      };
    case RemindersTypes.EXPORT_REMINDERS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case RemindersTypes.CLEAR_EXPORT_REMINDERS:
      return {
        ...state,
        exportObject: new Blob(),
      };
    case RemindersTypes.EXPORT_REMINDERS_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        exportObject: action.payload,
      };
    case RemindersTypes.REMINDERS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case RemindersTypes.CLOSE_SNACKBAR:
      return {
        ...state,
        showSnackbar: false,
      };
    case RemindersTypes.TRIGGER_SNACK_BAR_ERROR:
      return {
        ...state,
        showSnackbar: true,
        message: action.payload,
        hasError: true,
      };
    case RemindersTypes.SET_SELECTED_REMINDERS:
      return {
        ...state,
        selectedReminders: action.payload,
      };
    case RemindersTypes.REMINDER_CANCEL_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case RemindersTypes.CANCEL_REMINDER_REQUEST_RESPONSE:
      return {
        ...state,
        reminders: action.payload.hasError ? state.reminders : action.payload.reminders,
        message: action.payload.message,
        hasError: action.payload.hasError,
        isLoading: false,
        showSnackbar: true,
        selectedReminders: (action.payload.hasError === false) ? [] : state.selectedReminders,
      };
    case RemindersTypes.DELETE_REMINDERS:
      return {
        ...state,
        isLoading: true,
      };
    case RemindersTypes.DELETE_REMINDERS_REQUEST_SUCCESS:
      return {
        ...state,
        reminders: { ...state.reminders, data: state.reminders.data.filter(r => !action.payload.reminders.includes(r.id)) },
        message: action.payload.message,
        hasError: action.payload.hasError,
        isLoading: false,
        showSnackbar: true,
        selectedReminders: (action.payload.hasError === false) ? [] : state.selectedReminders,
      };
    case RemindersTypes.RESCHEULE_REMINDERS:
      return {
        ...state,
        isLoading: true,
      };
    case RemindersTypes.RESCHEDULE_REMINDER_REQUEST_RESPONSE:
      return {
        ...state,
        message: action.payload.message,
        hasError: action.payload.hasError,
        isLoading: false,
        showSnackbar: true,
        selectedReminders: (action.payload.hasError === false) ? [] : state.selectedReminders,
      };
    case RemindersTypes.REMINDERS_REQUEST_SUCCESS:
      return {
        ...state,
        reminders: {
          data: action.payload.page === 0 ? [...action.payload.data] : [...state.reminders.data, ...action.payload.data],
          page: action.payload.page,
        },
        isLoading: false,
        failure: false,
      };
    case RemindersTypes.REMINDERS_REQUEST_FAILURE:
      return {
        ...state,
        isLoading: false,
        failure: true,
      };
    case RemindersTypes.IMPORT_REMINDERS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case RemindersTypes.CLEAR_IMPORT_STATUS:
      return {
        ...state,
        importRowErrors: INITIAL_STATE.importRowErrors,
        importStatus: INITIAL_STATE.importStatus,
      };
    case RemindersTypes.IMPORT_REMINDERS_REQUEST_RESPONSE:
      return {
        ...state,
        importStatus: action.payload.importStatus,
        importRowErrors: action.payload.rowErrors,
        isLoading: false,
      };
    case RemindersTypes.UPDATE_FILTER_PARAMS:
      return {
        ...state,
        isLoading: true,
        filterModalIsOpen: false,
        filterParams: action.payload,
      };
    case RemindersTypes.CHANGE_FILTER_MODAL_STATUS:
      return {
        ...state,
        filterModalIsOpen: action.payload,
      };
    case RemindersTypes.LOAD_CREATION_LISTS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case RemindersTypes.LOAD_CREATION_LISTS_REQUEST_RESPONSE:
      return {
        ...state,
        allForms: action.payload.allForms,
        allEvaluators: action.payload.allEvaluators,
        allEvaluateds: action.payload.allEvaluateds,
        allGroups: action.payload.allGroups,
        listsStatus: action.payload.listsStatus,
        isLoading: false,
      };
    case RemindersTypes.SAVE_REMINDER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case RemindersTypes.SAVE_REMINDER_REQUEST_RESPONSE:
      return {
        ...state,
        saveStatus: action.payload.saveStatus,
        saveError: action.payload.saveError,
        isLoading: false,
      };
    case RemindersTypes.SET_EDIT_REMINDER:
      return {
        ...state,
        reminder: action.payload.reminder ?? INITIAL_STATE.reminder,
        isLoading: false,
      };
    case RemindersTypes.CLEAR_EDIT_REMINDER:
      return {
        ...state,
        reminder: INITIAL_STATE.reminder,
        selectedReminderId: INITIAL_STATE.selectedReminderId,
        listsStatus: INITIAL_STATE.listsStatus,
      };
    case RemindersTypes.SET_SELECTED_REMINDER_ID:
      return {
        ...state,
        selectedReminderId: action.payload.id,
      };
    case RemindersTypes.LOAD_SELECTED_REMINDER:
      return {
        ...state,
        isLoading: true,
      };
    case RemindersTypes.CLEAR_CREATE_STEPPER:
      return {
        ...state,
        saveStatus: INITIAL_STATE.saveStatus,
        saveError: INITIAL_STATE.saveError,
      };
    case RemindersTypes.CLEAR_EXPORT_STATUS:
      return {
        ...state,
        exportObject: new Blob(),
        exportStatus: INITIAL_STATE.exportStatus,
        message: INITIAL_STATE.message,
      };
    case RemindersTypes.EXPORT_REMINDERS_RESPONSE:
      return {
        ...state,
        exportObject: action.payload.exportObject || new Blob(),
        exportStatus: action.payload.exportStatus,
        message: action.payload.message,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default reducer;
