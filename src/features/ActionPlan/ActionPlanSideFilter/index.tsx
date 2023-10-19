import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import ActionPlanSideFilter from './ActionPlanSideFilter';

import {
  clearPlansFilter,
  updatePlansFilter,
} from '../../../redux/plansSideFilter/actions';

const mapStateToProps = state => ({
  sideFilterParams: state.plansSideFilters.sideFilterParams,
});

const mapDispatchToProps = dispatch => ({
  handleUpdateFilters: args => dispatch(updatePlansFilter(args)),
  handleClearFilterParams: () => dispatch(clearPlansFilter()),
});

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(ActionPlanSideFilter),
);
