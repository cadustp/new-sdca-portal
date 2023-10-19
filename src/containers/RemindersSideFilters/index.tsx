import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import RemindersSideFiltersScreen from './RemindersSideFiltersScreen';
import {
  fetchReports,
  fetchReportsWithPagination,
  setEmptyStateTrue,
  clearSearchReports,
} from '../../redux/actions/reports-actions';

import {
  openSnackbar,
  searchAppUserRemindersRequest,
} from '../../redux/appUserReminders/actions';

import {
  clearRemindersFilters,
  updateRemindersFilter,
} from '../../redux/RemindersSideFilters/actions';

const mapStateToProps = state => (
  {
    statuses: state.reminderStatusesReducer.statuses,
    sideFilterParams: state.remindersSideFilters.sideFilterParams,
    inputText: state.appUserReminders.inputText,
  }
);

const mapDispatchToProps = dispatch => ({
  handleUpdateFilterReminders: args => dispatch(updateRemindersFilter(args)),
  handleClearFilterParams: () => dispatch(clearRemindersFilters()),
  handleOpenSnackbarAction: (...args) => dispatch(openSnackbar(args)),
  handleSetEmptyStateTrue: () => dispatch(setEmptyStateTrue()),
  handleFetchAppUserReminders: requestParams => dispatch(searchAppUserRemindersRequest(requestParams)),
  handleClearSearch: () => dispatch(clearSearchReports()),
  handleFetchReports: requestParams => {
    const { page } = requestParams;

    if (page === 1) {
      dispatch(fetchReports(requestParams));
    } else {
      dispatch(fetchReportsWithPagination(requestParams));
    }
  },
});

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(RemindersSideFiltersScreen),
);
