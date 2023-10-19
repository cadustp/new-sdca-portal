import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import StepSection from './StepSection';
import {
  setStepTitle,
  createNewStep,
  handleMoveStepModal,
  handleDeleteStepModal,
  duplicateStep,
  deleteStep,
} from '../../../redux/forms/actions';

const mapStateToProps = state => ({
  steps: state.forms.form.steps,
  calcResult: state.forms.form.calcResult,
});

const mapDispatchToProps = dispatch => ({
  setStepTitle: payload => dispatch(setStepTitle(payload)),
  createNewStep: payload => dispatch(createNewStep(payload)),
  handleMoveStepModal: payload => dispatch(handleMoveStepModal(payload)),
  handleDeleteStepModal: payload => dispatch(handleDeleteStepModal(payload)),
  duplicateStep: payload => dispatch(duplicateStep(payload)),
  deleteStep: payload => dispatch(deleteStep(payload)),
});

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(StepSection),
);
