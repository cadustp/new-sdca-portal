import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
  doLoginRequest,
  clearStatus,
  resetInstructionsRequest,
  updatePasswordRequest,
} from '../../redux/login/actions';
// import LoginScreen from './LoginScreen';
import ClerkLoginScreen from './ClerkLoginScreen';

const mapStateToProps = state => ({
  isLoading: state.login.isLoading || state.login.loginloading,
  status: state.login.status,
  authError: state.login.authError,
});

const mapDispatchToProps = dispatch => ({
  doLoginRequest: payload => dispatch(doLoginRequest(payload)),
  resetInstructionsRequest: payload => dispatch(resetInstructionsRequest(payload)),
  updatePasswordRequest: payload => dispatch(updatePasswordRequest(payload)),
  clearStatus: () => dispatch(clearStatus()),
});

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(ClerkLoginScreen),
);
