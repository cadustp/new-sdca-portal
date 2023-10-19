import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
  setLanguageRequest,
  setLanguage,
  clearLanguageErrors,
} from '../../redux/locale/actions';

import LanguagePicker from './LanguagePicker';

const mapStateToProps = state => ({
  language: state.locale.language,
  error: state.locale.error,
  errorMessage: state.locale.errorMessage,
  isLoading: state.locale.isLoading,
});

const mapDispatchToProps = dispatch => ({
  setLanguageRequest: language => dispatch(setLanguageRequest(language)),
  setLanguage: language => dispatch(setLanguage(language)),
  clearLanguageErrors: () => dispatch(clearLanguageErrors()),
});

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(LanguagePicker),
);
