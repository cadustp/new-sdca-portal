import { connect } from 'react-redux';
import { doLoginRequest } from '../../../redux/login/actions';
import SsoLogin from './SsoLogin';

const mapDispatchToProps = (dispatch: any) => ({
  doLoginRequest: (payload: any) => dispatch(doLoginRequest(payload)),
});

export default connect(null, mapDispatchToProps)(SsoLogin);
