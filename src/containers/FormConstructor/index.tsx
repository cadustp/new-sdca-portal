import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import FormConstructorScreen from './FormConstructorScreen';
import {
  loadForm,
  startNewForm,
  clearFormSettings,
  clearCloneWarning,
} from '../../redux/forms/actions';

const mapStateToProps = state => ({
  loading: state.forms.loading,
  steps: state.forms.form.steps,
  showSideBar: state.forms.creation.showSideBar,
  deleteStatus: state.forms.delete.status,
  saveStatus: state.forms.creation.status,
  isAClone: state.forms.creation.isAClone,
});

const mapDispatchToProps = dispatch => ({
  loadForm: formId => dispatch(loadForm({ formId })),
  startNewForm: () => dispatch(startNewForm()),
  clearFormSettings: () => dispatch(clearFormSettings()),
  clearCloneWarning: () => dispatch(clearCloneWarning()),
});

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(FormConstructorScreen),
);
