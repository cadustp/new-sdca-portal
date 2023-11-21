import { connect } from 'react-redux';
import {
  doLoginRequest,
  clearStatus,
  resetInstructionsRequest,
  updatePasswordRequest,
} from '../../../redux/login/actions';
import RecoverScreen from './RecoverScreen';

const mapStateToProps = (state: any) => ({
  isLoading: state.login.isLoading || state.login.loginloading,
  status: state.login.status,
  authError: state.login.authError,
});

const mapDispatchToProps = (dispatch: any) => ({
  doLoginRequest: (payload: any) => dispatch(doLoginRequest(payload)),
  resetInstructionsRequest: (payload: any) => dispatch(resetInstructionsRequest(payload)),
  updatePasswordRequest: (payload: any) => dispatch(updatePasswordRequest(payload)),
  clearStatus: () => dispatch(clearStatus()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecoverScreen);
