import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
  saveCompanyRequest,
  companyDataRequest,
  clearCompanyData,
} from '../../redux/company/actions';

import EditCompanyScreen from './EditCompanyScreen';

const mapStateToProps = state => ({
  isLoading: state.company.isLoading,
  failure: state.company.failure,
  company: state.company.company,
  settings: state.company.settings,
  saveStatus: state.company.saveStatus,
  saveError: state.company.saveError,
});

const mapDispatchToProps = dispatch => ({
  saveCompanyRequest: payload => dispatch(saveCompanyRequest(payload)),
  companyDataRequest: () => dispatch(companyDataRequest()),
  clearCompanyData: () => dispatch(clearCompanyData()),
});

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(EditCompanyScreen),
);
