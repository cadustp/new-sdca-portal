import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import {
  closeDeletionModal,
  deletePlan,
  DeletePlanAction,
} from '../../../../../redux/plans/duck';
import DeletePlanModal from './DeletePlanModal';

const mapStateToProps = state => ({
  planId: state.plans.deletionModal.planToDelete,
  planName: state.plans.deletionModal.planName,
  visible: state.plans.deletionModal.visible,
});

const mapDispatchToProps = dispatch => ({
  cancel: () => dispatch(closeDeletionModal()),
  deletePlan: (args: DeletePlanAction) => dispatch(deletePlan(args)),
});

export default withRouter(
  injectIntl(connect(mapStateToProps, mapDispatchToProps)(DeletePlanModal)),
);
