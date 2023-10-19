import { connect, MapStateToProps } from 'react-redux';
import { injectIntl } from 'react-intl';
import { withRouter } from '../../../../../helpers/withRouter';
import ActionPlanCard from './ActionPlanCard';
import {
  openDeletionModal,
  setCreationModalVisibility,
  PlanBasicData,
  ModalVisibility,
} from '../../../../../redux/plans/duck';

import { Intl } from '../../../../../helpers/types';

type StateProps = {
  actionPlanData: PlanBasicData;
};

type DispatchProps = {
  openDeletionModal: (args: { planId: number; planName: string }) => void;
  handleCreationModalVisibility: ({
    isVisible,
    planId,
  }: ModalVisibility) => void;
};

type OwnProps = {
  intl: Intl;
  index: number;
  statusColor: string;
};

export type ActionPlanCardTypes = StateProps & DispatchProps & OwnProps;

const mapStateToProps = state => ({
  planId: state.plans.deletionModal.planToDelete,
  planName: state.plans.deletionModal.planName,
  isCreationModalVisible: state.plans.creationModal.isVisible,
});

const mapDispatchToProps = dispatch => ({
  openDeletionModal: ({
    planId,
    planName,
  }: {
    planId: number;
    planName: string;
  }) => dispatch(openDeletionModal({ planId, planName })),
  handleCreationModalVisibility: ({ isVisible, planId }) =>
    dispatch(setCreationModalVisibility({ isVisible, planId })),
});

export default withRouter(
  injectIntl(
    connect(
      mapStateToProps,
      mapDispatchToProps,
    )(ActionPlanCard),
  ),
);
