import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
  loadFormRequest,
  loadAuthenticationRequiredRequest,
  updateFormAnswers,
  knockoutStep,
  removeKnockoutStep,
  knockoutForm,
  sendPublicAnswer,
  setQuestionObservation,
  clearStatus,
  publicLinkPlanUsersRequest,
  clearLoadingErrors,
  setPlan,
} from '../../redux/publicAnswer/actions';
import PublicAnswerScreen from './PublicAnswerScreen';

const mapStateToProps = state => ({
  form: state.publicAnswer.form,
  formActive: state.publicAnswer.formActive,
  isLoading: state.publicAnswer.isLoading,
  message: state.publicAnswer.message,
  afterMessage: state.publicAnswer.afterMessage,
  afterImageLink: state.publicAnswer.afterImageLink,
  afterImageRedirect: state.publicAnswer.afterImageRedirect,
  status: state.publicAnswer.status,
  isAccomplished: state.publicAnswer.isAccomplished,
  isAuthenticated: state.publicAnswer.isAuthenticated,
  requireAuth: state.publicAnswer.requireAuth,
  customPasswordRequired: state.publicAnswer.customPasswordRequired,
  loadingError: state.publicAnswer.loadingError,
});

const mapDispatchToProps = dispatch => ({
  loadFormRequest: formId => dispatch(loadFormRequest(formId)),
  loadAuthenticationRequiredRequest: formId => dispatch(loadAuthenticationRequiredRequest(formId)),
  updateFormAnswers: payload => dispatch(updateFormAnswers(payload)),
  knockoutStep: payload => dispatch(knockoutStep(payload)),
  removeKnockoutStep: payload => dispatch(removeKnockoutStep(payload)),
  knockoutForm: payload => dispatch(knockoutForm(payload)),
  sendPublicAnswer: payload => dispatch(sendPublicAnswer(payload)),
  setQuestionObservation: payload => dispatch(setQuestionObservation(payload)),
  setPlan: payload => dispatch(setPlan(payload)),
  clearStatus: () => dispatch(clearStatus()),
  publicLinkPlanUsersRequest: payload => dispatch(publicLinkPlanUsersRequest(payload)),
  clearLoadingErrors: () => dispatch(clearLoadingErrors()),
});

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(PublicAnswerScreen),
);
