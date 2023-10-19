import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import MoveStep from './MoveStep';
import {
  handleMoveStepModal,
  moveStep,
} from '../../../../redux/forms/actions';

const mapStateToProps = state => ({
  open: state.forms.moveStep.show,
  stepIndex: state.forms.moveStep.index,
  positions: state.forms.moveStep.positions,
});

const mapDispatchToProps = dispatch => ({
  onClose: payload => dispatch(handleMoveStepModal(payload)),
  onConfirm: payload => dispatch(moveStep(payload)),
});

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(MoveStep),
);
