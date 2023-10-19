import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
  loadListsRequest,
  saveReminderRequest,
  clearEditReminder,
  clearCreateStepper,
  loadSelectedReminder,
} from '../../redux/schedule/actions';

import CreateReminderScreen from './CreateReminderScreen';

const mapStateToProps = state => ({
  isLoading: state.reminder.isLoading,
  reminder: state.reminder.reminder,
  allForms: state.reminder.allForms,
  allEvaluators: state.reminder.allEvaluators,
  allEvaluateds: state.reminder.allEvaluateds,
  allGroups: state.reminder.allGroups,
  listsStatus: state.reminder.listsStatus,
  saveStatus: state.reminder.saveStatus,
  saveError: state.reminder.saveError,
  selectedReminderId: state.reminder.selectedReminderId,
});

const mapDispatchToProps = dispatch => ({
  loadListsRequest: () => dispatch(loadListsRequest()),
  saveReminderRequest: payload => dispatch(saveReminderRequest(payload)),
  clearEditReminder: () => dispatch(clearEditReminder()),
  clearCreateStepper: () => dispatch(clearCreateStepper()),
  loadSelectedReminder: payload => dispatch(loadSelectedReminder(payload)),
});

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(CreateReminderScreen),
);
