export enum RemindersTypes {
  REMINDERS_REQUEST = 'REMINDERS_REQUEST',
  EXPORT_REMINDERS_REQUEST = 'EXPORT_REMINDERS_REQUEST',
  EXPORT_REMINDERS_REQUEST_SUCCESS = 'EXPORT_REMINDERS_REQUEST_SUCCESS',
  CLEAR_EXPORT_REMINDERS = 'CLEAR_EXPORT_REMINDERS',
  REMINDERS_REQUEST_SUCCESS = 'REMINDERS_REQUEST_SUCCESS',
  REMINDERS_REQUEST_FAILURE = 'REMINDERS_REQUEST_FAILURE',
  REMINDER_CANCEL_REQUEST = 'REMINDER_CANCEL_REQUEST',
  CANCEL_REMINDER_REQUEST_RESPONSE = 'CANCEL_REMINDER_REQUEST_RESPONSE',
  SET_SELECTED_REMINDERS = 'SET_SELECTED_REMINDERS',
  DELETE_REMINDERS = 'DELETE_REMINDERS',
  DELETE_REMINDERS_REQUEST_SUCCESS = 'DELETE_REMINDERS_REQUEST_SUCCESS',
  RESCHEULE_REMINDERS = 'RESCHEDULE_REMINDERS',
  RESCHEDULE_REMINDER_REQUEST_RESPONSE = 'RESCHEDULE_REMINDER_REQUEST_RESPONSE',
  CLOSE_SNACKBAR = 'CLOSE_SNACKBAR',
  TRIGGER_SNACK_BAR_ERROR = 'TRIGGER_SNACK_BAR_ERROR',
  IMPORT_REMINDERS_REQUEST = 'IMPORT_REMINDERS_REQUEST',
  UNSELECT_ALL_REMINDERS = 'UNSELECT_ALL_REMINDERS',
  CLEAR_IMPORT_STATUS = 'CLEAR_IMPORT_STATUS',
  CLEAR_EXPORT_STATUS = 'CLEAR_EXPORT_STATUS',
  IMPORT_REMINDERS_REQUEST_RESPONSE = 'IMPORT_REMINDERS_REQUEST_RESPONSE',
  EXPORT_REMINDERS_RESPONSE = 'EXPORT_REMINDERS_RESPONSE',
  UPDATE_FILTER_PARAMS = 'UPDATE_FILTER_PARAMS',
  CHANGE_FILTER_MODAL_STATUS = 'CHANGE_FILTER_MODAL_STATUS',
  LOAD_CREATION_LISTS_REQUEST = 'LOAD_CREATION_LISTS_REQUEST',
  LOAD_CREATION_LISTS_REQUEST_RESPONSE = 'LOAD_CREATION_LISTS_REQUEST_RESPONSE',
  SAVE_REMINDER_REQUEST = 'SAVE_REMINDER_REQUEST',
  SAVE_REMINDER_REQUEST_RESPONSE = 'SAVE_REMINDER_REQUEST_RESPONSE',
  SET_EDIT_REMINDER = 'SET_EDIT_REMINDER',
  CLEAR_EDIT_REMINDER = 'CLEAR_EDIT_REMINDER',
  CLEAR_CREATE_STEPPER = 'CLEAR_CREATE_STEPPER',
  SET_SELECTED_REMINDER_ID = 'SET_SELECTED_REMINDER_ID',
  LOAD_SELECTED_REMINDER = 'LOAD_SELECTED_REMINDER',
};
export interface Reminders {
  id: number,
  name: string,
  start_date: string,
  end_date: string,
  app_users: Array<Valuator>,
  form: Array<Form>,
  evaluateds: Array<Evaluated>,
  forms: Array<Form>,
  valuated_users: Array<Valuator>,
  has_auto_scheduling: boolean,
};
export interface Valuator {
  id: number,
  name: string,
  status: number,
};
export interface Evaluated {
  id: number,
  name: string,
};

export interface Form {
  id: number,
  name: string,
}
export interface Groups {
  id: number,
  name: string,
}

export interface filterParams {
  inputSearchValue: string,
  form: Array<Form>,
  appUser: Array<Valuator>,
  evaluatedUser: Array<Evaluated>,
  startDate: string,
  endDate: string,
  status: Array<any>,
  active: boolean,
  sort: string,
};
export interface RemindersState {
  reminders: {
    data: Array<Reminders> | [],
    page: number,
  }
  isLoading: boolean,
  failure: boolean,
  hasError: boolean,
  message: string,
  showSnackbar: boolean,
  selectedReminders: Array<number>,
  importStatus: string,
  exportStatus: string,
  exportObject: Object,
  importRowErrors: Array<string>,
  filterParams: filterParams,
  filterModalIsOpen: boolean,
  app_users: [],
  forms: []
  evaluateds: [],
  has_auto_scheduling?: boolean
  saveStatus: string,
  saveError: string,
  allForms: [],
  allEvaluators: [],
  allEvaluateds: [],
  allGroups: [],
  listsStatus: string,
  reminder: {
    id: number,
    name: string,
    form: number,
    evaluators: Array<Valuator>,
    evaluateds: Array<Evaluated>,
    evaluatorsGroups: Array<Groups>,
    evaluatedsGroups: Array<Groups>,
    recurrence: number,
    startDate: string,
    endDate: string,
    deadline: string,
    weekDays: [],
    automaticScheduling: boolean,
  }
  selectedReminderId: number | null,
};
