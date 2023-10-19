import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import {
  closeExportModal,
  closeSnackbar,
  openExportModal,
  openSnackbar,
  updateFilterParams,
  setEmptyStateTrue,
  updateInputText,
  fetchReports,
  fetchReportsWithPagination,
} from '../../redux/actions/reports-actions';
import {
  listsDataRequest,
} from '../../redux/lists/actions';
import { 
  exportAnswersRequest,
  clearExportStatus, 
  exportScheduleRequest} from "../../redux/report/actions";
import ReportsScreen from './ReportsScreen';

const mapStateToProps = state => ({
  reports: state.reportsReducer.reports,
  exportObject: state.report.exportObject,
  exportStatus: state.report.exportStatus,
  loadingReport: state.report.isLoading,
  exportPeriods: state.reportsReducer.exportPeriods,
  exportModalOpened: state.reportsReducer.exportModalOpened,
  failure: state.reportsReducer.failure,
  searchLoading: state.reportsReducer.searchLoading,
  loadingLists: state.lists.isLoading,
  noSearches: state.reportsReducer.noSearches,
  infiniteLoading: state.reportsReducer.infiniteLoading,
  snackbarState: state.reportsReducer.snackbarState,
  sideFilterParams: state.reportsReducer.sideFilterParams,
  inputText: state.reportsReducer.inputText,
  exportReportTypes: state.reportsReducer.exportReportTypes,
  forms: state.lists.data.forms,
  groups: state.lists.data.groups,
  appUsers: state.lists.data.evaluators,
  valuatedUsers: state.lists.data.evaluateds,
});

const mapDispatchToProps = dispatch => ({
  listsDataRequest: requestParams => dispatch(listsDataRequest(requestParams)),
  exportScheduleRequest: payload => dispatch(exportScheduleRequest(payload)),
  exportAnswersRequest: payload => dispatch(exportAnswersRequest(payload)),
  clearExportStatus: () => dispatch(clearExportStatus()),
  handleCloseExportModal: () => dispatch(closeExportModal()),
  handleCloseSnackbarAction: (...args) => dispatch(closeSnackbar(...args)),
  handleInputTextChange: (...args) => dispatch(updateInputText(...args)),
  handleOpenExportModal: () => dispatch(openExportModal()),
  handleOpenSnackbarAction: (...args) => dispatch(openSnackbar(...args)),
  handleUpdateFilterParams: (...args) => dispatch(updateFilterParams(dispatch, ...args)),
  handleSetEmptyStateTrue: () => dispatch(setEmptyStateTrue()),
  handleFetchReports: requestParams => {
    const { page } = requestParams;
    if (page === 1) {
      dispatch(fetchReports(requestParams));
    } else {
      dispatch(fetchReportsWithPagination(requestParams));
    }
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(ReportsScreen));
