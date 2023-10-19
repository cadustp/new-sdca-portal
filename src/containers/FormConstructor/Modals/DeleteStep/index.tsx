import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import DeleteStep from './DeleteStep';
import {
  handleDeleteStepModal,
  deleteStep,
} from '../../../../redux/forms/actions';

const mapStateToProps = state => ({
  open: state.forms.deleteStep.show,
  title: state.forms.deleteStep.title,
  stepIndex: state.forms.deleteStep.index,
});

const mapDispatchToProps = dispatch => ({
  onClose: payload => dispatch(handleDeleteStepModal(payload)),
  onConfirm: payload => dispatch(deleteStep(payload)),
});

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(DeleteStep),
);
