import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { withRouter } from '../../../helpers/withRouter';
import { fetchQualityByGroups } from '../../../redux/actions/quality-actions';
import { dashboardDataRequest } from '../../../redux/dashboard/actions.ts';
// eslint-disable-next-line import/extensions
import { setDatesFilter } from '../../../redux/app/filters/duck';
import HomeDashboard from './HomeDashboard';

const mapStateToProps = state => ({
  user: state.login.information,
  status: state.statusReducer.data,
  formsIds: state.formReducer.ids,
  groups: state.groupReducer.data,
  adherence: state.adherenceReducer.data,
  quality: state.qualityReducer,
  startDate: state.filters.date.start,
  endDate: state.filters.date.end,
  loading: state.adherenceReducer.loading,
  selectedGroups: state.filters.data.groups,
  selectedForms: state.filters.data.forms,
  selectedEmployees: state.filters.data.employees,
  isLoading: state.dashboard.isLoading,
});

const mapDispatchToProps = dispatch => ({
  dashboardDataRequest: () => dispatch(dashboardDataRequest()),
  qualityByGroups: body => dispatch(fetchQualityByGroups({ body })),
  setDates: ({ start, end }) => dispatch(setDatesFilter({ start, end })),
});

export default injectIntl(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeDashboard))
);
