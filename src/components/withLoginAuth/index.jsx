import { connect } from 'react-redux';
import withLogInAuth from './withLoginAuth';
import {
  addUserCompany,
} from '../../redux/actions/company-actions';
import { setLanguage } from '../../redux/locale/actions.ts';
import { saveLoggedUser, doLogout } from '../../redux/login/actions.ts';

const mapStateToProps = state => ({
  user: state.login.information,
});

const mapDispatchToProps = dispatch => ({
  saveLoggedUser: user => dispatch(saveLoggedUser(user)),
  addUserCompany: company => dispatch(addUserCompany(company)),
  setLanguage: language => dispatch(setLanguage(language)),
  doLogout: payload => dispatch(doLogout(payload)),
});

export default Component => connect(
  mapStateToProps,
  mapDispatchToProps
)(withLogInAuth(Component));
