import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import MoveQuestion from './MoveQuestion';
import {
  handleMoveQuestionModal,
  moveQuestion,
  deleteStep,
} from '../../../../redux/forms/actions';

const mapStateToProps = state => ({
  open: state.forms.moveQuestion.show,
  stepIndex: state.forms.moveQuestion.stepIndex,
  questionIndex: state.forms.moveQuestion.questionIndex,
  steps: state.forms.form.steps,
});

const mapDispatchToProps = dispatch => ({
  onClose: payload => dispatch(handleMoveQuestionModal(payload)),
  deleteStep: payload => dispatch(deleteStep(payload)),
  moveQuestion: payload => dispatch(moveQuestion(payload)),
});

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(MoveQuestion),
);
