import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
  searchAppUserRemindersRequest,
  closeSnackbar,
  openSnackbar,
} from '../../redux/appUserReminders/actions';
import { clearReminderAnswers } from '../../redux/answerReminder/actions';
import {
  listsDataRequest,
} from '../../redux/lists/actions';
import AppUserRemindersScreen from './AppUserRemindersScreen';

const mapStateToProps = state => ({
  reminders: state.appUserReminders.app_users_reminders,
  searchLoading: state.appUserReminders.searchLoading,
  failure: state.appUserReminders.failure,
  snackbarState: state.appUserReminders.snackbarState,
  sideFilterParams: state.remindersSideFilters.sideFilterParams,
  forms: state.lists.data.forms,
  valuatedUsers: state.lists.data.evaluateds,
  loadingLists: state.lists.isLoading,
});

const mapDispatchToProps = dispatch => ({
  searchAppUserRemindersRequest: requestParams => dispatch(searchAppUserRemindersRequest(requestParams)),
  handleCloseSnackbarAction: () => dispatch(closeSnackbar()),
  handleOpenSnackbarAction: snackbar => dispatch(openSnackbar(snackbar)),
  clearReminderAnswers: () => dispatch(clearReminderAnswers()),
  listsDataRequest: requestParams => dispatch(listsDataRequest(requestParams)),
});

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(AppUserRemindersScreen),
);
