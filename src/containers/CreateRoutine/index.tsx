import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
  loadListsRequest,
  clearEditReminder,
  clearCreateStepper,
  loadSelectedReminder,
  saveReminderRequest,
} from '../../redux/schedule/actions';

import CreateRoutineScreen from './CreateRoutineScreen';

const mapStateToProps = state => ({
  isLoading: state.reminder.isLoading,
  routine: state.reminder.reminder,
  allForms: state.reminder.allForms,
  allEvaluators: state.reminder.allEvaluators,
  allEvaluateds: state.reminder.allEvaluateds,
  allGroups: state.reminder.allGroups,
  listsStatus: state.reminder.listsStatus,
  saveStatus: state.reminder.saveStatus,
  saveError: state.reminder.saveError,
  selectedRoutineId: state.reminder.selectedReminderId,
});

const mapDispatchToProps = dispatch => ({
  loadListsRequest: () => dispatch(loadListsRequest()),
  saveRoutineRequest: payload => dispatch(saveReminderRequest(payload)),
  clearEditRoutine: () => dispatch(clearEditReminder()),
  clearCreateStepper: () => dispatch(clearCreateStepper()),
  loadSelectedRoutine: payload => dispatch(loadSelectedReminder(payload)),
});

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(CreateRoutineScreen),
);
