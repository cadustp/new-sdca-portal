import { connect } from 'react-redux';
import Header from './Header';
import { doLogout } from '../../redux/login/actions';
import { 
  getFeaturesRequest, 
  updateFeaturesRequest
} from '../../redux/features/actions';

const mapStateToProps = state => ({
  user: state.login.information,
  features: state.features.features,
  loadingFeatures: state.features.isLoading
});

const mapDispatchToProps = dispatch => ({
  getFeaturesRequest: () => dispatch(getFeaturesRequest()),
  updateFeaturesRequest: payload => dispatch(updateFeaturesRequest(payload)),
  doLogout: payload => dispatch(doLogout(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
