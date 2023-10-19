import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
  searchRemindersRequest,
  cancelReminderRequest,
  setSelectedReminders,
  rescheduleReminders,
  deleteReminders,
  exportReminders,
  clearExportReminder,
  closeSnackbar,
  clearImportStatus,
  importRemindersRequest,
  changeFilterModalStatus,
  updateFilterParams,
  setEditReminder,
  clearCreateStepper,
  triggerSnackBarError,
  exportRemindersRequest,
  clearExportStatus,
  setSelectedReminderId,
} from '../../redux/schedule/actions';
import {
  listsDataRequest,
} from '../../redux/lists/actions';

import ScheduleScreen from './ScheduleScreen';

const mapStateToProps = state => ({
  reminders: state.reminder.reminders,
  isLoading: state.reminder.isLoading,
  loadingLists: state.lists.isLoading,
  selectedReminders: state.reminder.selectedReminders,
  message: state.reminder.message,
  hasError: state.reminder.hasError,
  showSnackbar: state.reminder.showSnackbar,
  failure: state.reminder.failure,
  exportStatus: state.reminder.exportStatus,
  importStatus: state.reminder.importStatus,
  importRowErrors: state.reminder.importRowErrors,
  filterParams: state.reminder.filterParams,
  exportObject: state.reminder.exportObject,
  filterModalIsOpen: state.reminder.filterModalIsOpen,
  saveStatus: state.reminder.saveStatus,
  evaluatorsList: state.lists.data.evaluators,
  evaluatedsList: state.lists.data.evaluateds,
  formsList: state.lists.data.forms,
  features: state.features.features,
});

const mapDispatchToProps = dispatch => ({
  searchRemindersRequest: requestParams => dispatch(searchRemindersRequest(requestParams)),
  cancelReminderRequest: requestParams => dispatch(cancelReminderRequest(requestParams)),
  selectReminders: payload => dispatch(setSelectedReminders(payload)),
  deleteReminders: selectedReminders => dispatch(deleteReminders(selectedReminders)),
  rescheduleReminders: seletedReminders => dispatch(rescheduleReminders(seletedReminders)),
  closeSnackbar: () => dispatch(closeSnackbar()),
  exportReminders: requestParams => dispatch(exportReminders(requestParams)),
  clearImportStatus: () => dispatch(clearImportStatus()),
  importRemindersRequest: importFile => dispatch(importRemindersRequest(importFile)),
  exportRemindersRequest: payload => dispatch(exportRemindersRequest(payload)),
  clearExportStatus: () => dispatch(clearExportStatus()),
  updateFilterParams: filterParams => dispatch(updateFilterParams(filterParams)),
  changeFilterModalStatus: active => dispatch(changeFilterModalStatus(active)),
  clearCreateStepper: () => dispatch(clearCreateStepper()),
  setEditReminder: reminder => dispatch(setEditReminder(reminder)),
  triggerSnackBarError: payload => dispatch(triggerSnackBarError(payload)),
  listsDataRequest: requestParams => dispatch(listsDataRequest(requestParams)),
  setSelectedReminderId: payload => dispatch(setSelectedReminderId(payload)),
});

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(ScheduleScreen),
);
