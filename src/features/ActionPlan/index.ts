import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import ActionPlanScreen from './ActionPlanScreen';
import {
  fetchPlansList,
  closeDeletionModal,
  setCreationModalVisibility,
  closeFilterModal,
} from '../../redux/plans/duck';

import {
  listsDataRequest,
  planUsersRequest,
} from '../../redux/lists/actions';

import {
  openExportModal,
  closeExportModal,
} from '../../redux/actions/reports-actions';

const mapStateToProps = state => ({
  plansList: state.plans.list,
  displayDeletionModal: state.plans.deletionModal.visible,
  isCreationModalVisible: state.plans.creationModal.isVisible,
  displayFilterModal: state.plans.filterModal.isVisible,
  loading: state.plans.loading,
  exportModalOpened: state.reportsReducer.exportModalOpened,
  groups: state.lists.data.groups,
  appUsers: state.lists.data.evaluators,
  valuatedUsers: state.lists.data.evaluateds,
  actionPlanUsers: state.lists.data.planUsers,
  startRange: state.plansSideFilters.sideFilterParams.startRange,
  endRange: state.plansSideFilters.sideFilterParams.endRange,
});

const mapDispatchToProps = dispatch => ({
  fetchPlansList: () => dispatch(fetchPlansList()),
  closeDeletionModal: () => dispatch(closeDeletionModal()),
  handleCreationModalVisibility: ({ isVisible }) =>
    dispatch(setCreationModalVisibility({ isVisible })),
  closeFilterModal: () => dispatch(closeFilterModal()),
  handleOpenExportModal: () => dispatch(openExportModal()),
  handleCloseExportModal: () => dispatch(closeExportModal()),
  listsDataRequest: requestParams => dispatch(listsDataRequest(requestParams)),
  planUsersRequest: () => dispatch(planUsersRequest()),
});

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(ActionPlanScreen),
);
