import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import Menu from './Menu';
import {
  handleToggleSideBar,
  handleDeleteModal,
  deleteFormRequest,
  clearDeleteFormStatus,
  saveForm,
  clearValidateErrors,
  clearSaveFormStatus,
} from '../../../redux/forms/actions';

const mapStateToProps = state => ({
  formId: state.forms.form.id,
  title: state.forms.form.name,
  version: state.forms.form.version,
  lastModified: state.forms.form.lastModified,
  openDelete: state.forms.delete.show,
  deleteError: state.forms.delete.error,
  deleteStatus: state.forms.delete.status,
  isSaving: state.forms.creation.loading,
  formErrors: state.forms.creation.formErrors,
  saveStatus: state.forms.creation.status,
  saveError: state.forms.creation.error,
});

const mapDispatchToProps = dispatch => ({
  handleToggleSideBar: () => dispatch(handleToggleSideBar()),
  handleDeleteModal: () => dispatch(handleDeleteModal()),
  deleteFormRequest: payload => dispatch(deleteFormRequest(payload)),
  clearDeleteFormStatus: () => dispatch(clearDeleteFormStatus()),
  saveForm: () => dispatch(saveForm()),
  clearValidateErrors: () => dispatch(clearValidateErrors()),
  clearSaveFormStatus: payload => dispatch(clearSaveFormStatus(payload)),
});

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(Menu),
);
