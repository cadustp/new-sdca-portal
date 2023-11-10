import { connect } from 'react-redux';
import { doLoginRequest } from '../../../redux/login/actions';
import ClerkLoginScreen from '../ClerkLoginScreen';

const mapDispatchToProps = (dispatch: any) => ({
  doLoginRequest: (payload: any) => dispatch(doLoginRequest(payload)),
});

export default connect(null, mapDispatchToProps)(ClerkLoginScreen);
