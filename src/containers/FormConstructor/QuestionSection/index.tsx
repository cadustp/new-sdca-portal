import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import QuestionSection from './QuestionSection';
import {
  addNewQuestion,
  duplicateQuestion,
  deleteQuestion,
  handleMoveQuestionModal,
  editQuestionField,
  handleAnswerTypeModal,
} from '../../../redux/forms/actions';

const mapStateToProps = state => ({
  calcResult: state.forms.form.calcResult,
  steps: state.forms.form.steps,
});

const mapDispatchToProps = dispatch => ({
  addNewQuestion: payload => dispatch(addNewQuestion(payload)),
  duplicateQuestion: payload => dispatch(duplicateQuestion(payload)),
  deleteQuestion: payload => dispatch(deleteQuestion(payload)),
  handleMoveQuestionModal: payload => dispatch(handleMoveQuestionModal(payload)),
  editQuestionField: payload => dispatch(editQuestionField(payload)),
  handleAnswerTypeModal: payload => dispatch(handleAnswerTypeModal(payload)),
});

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(QuestionSection),
);
