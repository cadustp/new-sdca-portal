import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import RoutinesScreen from './RoutinesScreen';
import {
  loadAllRoutinesRequest,
  handleDeleteRoutineModal,
  deleteRoutineRequest,
  clearDeleteRoutineStatus,
  activatePauseRoutineRequest,
  clearErrorStatus,
} from '../../redux/routines/actions';
import {
  setSelectedReminderId,
} from '../../redux/schedule/actions';

const mapStateToProps = state => ({
  routines: state.routines.list,
  loading: state.routines.loading,
  error: state.routines.error,
  errorMessage: state.routines.errorMessage,
  openDelete: state.routines.delete.show,
  deleteError: state.routines.delete.error,
  deleteStatus: state.routines.delete.status,
});

const mapDispatchToProps = dispatch => ({
  loadAllRoutinesRequest: () => dispatch(loadAllRoutinesRequest()),
  handleDeleteModal: () => dispatch(handleDeleteRoutineModal()),
  deleteRoutineRequest: payload => dispatch(deleteRoutineRequest(payload)),
  activatePauseRoutineRequest: payload => dispatch(activatePauseRoutineRequest(payload)),
  clearDeleteRoutineStatus: () => dispatch(clearDeleteRoutineStatus()),
  clearErrorStatus: () => dispatch(clearErrorStatus()),
  setSelectedRoutineId: payload => dispatch(setSelectedReminderId(payload)),
});

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(RoutinesScreen),
);
