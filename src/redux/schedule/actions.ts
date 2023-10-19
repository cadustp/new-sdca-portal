import { action } from 'typesafe-actions';
import { RemindersTypes } from './types';

export const clearExportReminder = () => action(RemindersTypes.CLEAR_EXPORT_REMINDERS);
export const exportRemindersSuccess = ({
  exportObject,
}) => action(RemindersTypes.EXPORT_REMINDERS_REQUEST_SUCCESS, exportObject);
export const exportReminders = requestParams => action(RemindersTypes.EXPORT_REMINDERS_REQUEST, requestParams);
export const searchRemindersRequest = requestParams => action(RemindersTypes.REMINDERS_REQUEST, requestParams);
export const searchRemindersRequestSuccess = ({
  payload: data, page,
}) => action(RemindersTypes.REMINDERS_REQUEST_SUCCESS, {
  data, page,
});
export const searchRemindersRequestFailure = () => action(RemindersTypes.REMINDERS_REQUEST_FAILURE);
export const changeFilterModalStatus = active => action(RemindersTypes.CHANGE_FILTER_MODAL_STATUS, active);
export const updateFilterParams = payload => action(RemindersTypes.UPDATE_FILTER_PARAMS, payload);
export const cancelReminderRequest = requestParams => action(RemindersTypes.REMINDER_CANCEL_REQUEST, requestParams);
export const cancelReminderRequestResponse = ({
  reminders, message, hasError,
}) => action(RemindersTypes.CANCEL_REMINDER_REQUEST_RESPONSE, {
  reminders, message, hasError,
});
export const deleteReminders = selectedReminders => action(RemindersTypes.DELETE_REMINDERS, selectedReminders);
export const deleteRemindersRequestSuccess = ({
  reminders, message, hasError,
}) => action(RemindersTypes.DELETE_REMINDERS_REQUEST_SUCCESS, {
  reminders, message, hasError,
});
export const rescheduleReminders = payload => action(RemindersTypes.RESCHEULE_REMINDERS, payload);
export const rescheduleRemindersResponse = ({
  message, hasError,
}) => action(RemindersTypes.RESCHEDULE_REMINDER_REQUEST_RESPONSE, {
  message,
  hasError,
});
export const unselectAllReminders = () => action(RemindersTypes.UNSELECT_ALL_REMINDERS);
export const closeSnackbar = () => action(RemindersTypes.CLOSE_SNACKBAR);
export const triggerSnackBarError = payload => action(RemindersTypes.TRIGGER_SNACK_BAR_ERROR, payload);
export const setSelectedReminders = payload => action(RemindersTypes.SET_SELECTED_REMINDERS, payload);
export const importRemindersRequest = importFile => action(RemindersTypes.IMPORT_REMINDERS_REQUEST, importFile);
export const clearImportStatus = () => action(RemindersTypes.CLEAR_IMPORT_STATUS);
export const importRemindersRequestResponse = payload => action(RemindersTypes.IMPORT_REMINDERS_REQUEST_RESPONSE, payload);
export const exportRemindersRequest = payload => action(RemindersTypes.EXPORT_REMINDERS_REQUEST, payload);
export const clearExportStatus = () => action(RemindersTypes.CLEAR_EXPORT_STATUS);
export const exportRemindersResponse = payload => action(RemindersTypes.EXPORT_REMINDERS_RESPONSE, payload);
export const loadListsRequest = () => action(RemindersTypes.LOAD_CREATION_LISTS_REQUEST);
export const loadListsRequestResponse = response => action(RemindersTypes.LOAD_CREATION_LISTS_REQUEST_RESPONSE, response);
export const saveReminderRequest = payload => action(RemindersTypes.SAVE_REMINDER_REQUEST, payload);
export const saveReminderRequestResponse = response => action(RemindersTypes.SAVE_REMINDER_REQUEST_RESPONSE, response);
export const setEditReminder = reminder => action(RemindersTypes.SET_EDIT_REMINDER, reminder);
export const clearEditReminder = () => action(RemindersTypes.CLEAR_EDIT_REMINDER);
export const clearCreateStepper = () => action(RemindersTypes.CLEAR_CREATE_STEPPER);
export const setSelectedReminderId = payload => action(RemindersTypes.SET_SELECTED_REMINDER_ID, payload);
export const loadSelectedReminder = payload => action(RemindersTypes.LOAD_SELECTED_REMINDER, payload);
