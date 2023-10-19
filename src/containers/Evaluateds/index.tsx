import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
  searchEvaluatedsRequest,
  updateFilterParams,
  changeFilterModalStatus,
  activateInactivateEvaluatedsRequest,
  clearEditEvaluatedStepper,
  setEditEvaluated,
  importEvaluatedsRequest,
  clearImportStatus,
  exportEvaluatedsRequest,
  clearExportStatus,
} from '../../redux/evaluateds/actions';
import {
  listsDataRequest,
} from '../../redux/lists/actions';

import EvaluatedsScreen from './EvaluatedsScreen';

const mapStateToProps = state => ({
  evaluateds: state.evaluateds?.evaluateds,
  isLoading: state.evaluateds?.isLoading,
  loadingLists: state.lists.isLoading,
  failure: state.evaluateds?.failure,
  exportObject: state.evaluateds?.exportObject,
  activateInactivateFailure: state.evaluateds?.activateInactivateFailure,
  filterModalIsOpen: state.evaluateds.filterModalIsOpen,
  filterParams: state.evaluateds.filterParams,
  evaluatedsList: state.lists.data.evaluateds,
  groupsList: state.lists.data.groups,
  saveStatus: state.evaluateds.saveStatus,
  importStatus: state.evaluateds.importStatus,
  importRowErrors: state.evaluateds.importRowErrors,
  exportStatus: state.evaluateds.exportStatus,
  exportError: state.evaluateds.exportError,
});

const mapDispatchToProps = dispatch => ({
  searchEvaluatedsRequest: requestParams => dispatch(searchEvaluatedsRequest(requestParams)),
  updateFilterParams: filterParams => dispatch(updateFilterParams(filterParams)),
  changeFilterModalStatus: active => dispatch(changeFilterModalStatus(active)),
  activateInactivateEvaluatedsRequest: evaluateds => dispatch(activateInactivateEvaluatedsRequest(evaluateds)),
  clearEditEvaluatedStepper: () => dispatch(clearEditEvaluatedStepper()),
  setEditEvaluated: evaluated => dispatch(setEditEvaluated(evaluated)),
  importEvaluatedsRequest: importFile => dispatch(importEvaluatedsRequest(importFile)),
  clearImportStatus: () => dispatch(clearImportStatus()),
  listsDataRequest: requestParams => dispatch(listsDataRequest(requestParams)),
  exportEvaluatedsRequest: payload => dispatch(exportEvaluatedsRequest(payload)),
  clearExportStatus: () => dispatch(clearExportStatus()),
});

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(EvaluatedsScreen),
);
