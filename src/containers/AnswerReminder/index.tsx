import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
  requestReminderForAnswer,
  setEmployee, updateReminderAnswers,
  knockoutStep,
  removeKnockoutStep,
  clearQuestionAnswer,
  setObservation,
  setLocation,
  knockoutForm,
  sendReminder,
  generatePdf,
  closeSnackbar,
  setPlan,
  startFilling,
} from '../../redux/answerReminder/actions';
import {
  listsDataRequest,
  planUsersRequest,
} from '../../redux/lists/actions';
import AppUserRemindersScreen from './AnswerReminderScreen';

const mapStateToProps = state => (
  {
    answerReminder: state.answerReminder,
    showLoading: state.answerReminder.showLoading,
    appLoading: state.app.showLoading,
    loadingLists: state.lists.isLoading,
    actionPlanUsers: state.lists.data.planUsers,
  }
);

const mapDispatchToProps = dispatch => ({
  requestReminderForAnswer: reminder_id => dispatch(requestReminderForAnswer(reminder_id)),
  setEmployee: employee => dispatch(setEmployee({ payload: employee })),
  handleClearQuestionAnswer: payload => dispatch(clearQuestionAnswer(payload)),
  handleUpdateReminderAnswers: payload => dispatch(updateReminderAnswers(payload)),
  handleKnockoutStep: payload => dispatch(knockoutStep(payload)),
  handleRemoveKnockoutStep: payload => dispatch(removeKnockoutStep(payload)),
  handleKnockoutForm: payload => dispatch(knockoutForm(payload)),
  handleSetObservation: payload => dispatch(setObservation(payload)),
  handleSetLocation: payload => dispatch(setLocation(payload)),
  setPlan: payload => dispatch(setPlan(payload)),
  sendReminder: payload => dispatch(sendReminder(payload)),
  startFilling: () => dispatch(startFilling()),
  generatePdf: payload => dispatch(generatePdf(payload)),
  closeSnackbar: () => dispatch(closeSnackbar()),
  listsDataRequest: requestParams => dispatch(listsDataRequest(requestParams)),
  planUsersRequest: () => dispatch(planUsersRequest()),
});

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(AppUserRemindersScreen),
);
