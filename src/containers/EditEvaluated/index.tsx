import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
  saveEvaluatedRequest,
  clearEditEvaluatedStepper,
  clearEditEvaluated,
} from '../../redux/evaluateds/actions';
import { listAllGroupsRequest } from '../../redux/groups/actions';

import EditEvaluatedScreen from './EditEvaluatedScreen';

const mapStateToProps = state => ({
  isLoading: state.evaluateds.isLoading,
  saveStatus: state.evaluateds.saveStatus,
  saveError: state.evaluateds.saveError,
  allGroups: state.groups.allGroups,
  evaluated: state.evaluateds.evaluated,
});

const mapDispatchToProps = dispatch => ({
  saveEvaluatedRequest: payload => dispatch(saveEvaluatedRequest(payload)),
  listAllGroupsRequest: () => dispatch(listAllGroupsRequest()),
  clearEditEvaluatedStepper: () => dispatch(clearEditEvaluatedStepper()),
  clearEditEvaluated: () => dispatch(clearEditEvaluated()),
});

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(EditEvaluatedScreen),
);
