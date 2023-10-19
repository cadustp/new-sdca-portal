import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import FormsScreen from './FormsScreen';
import {
  handleCreationModal,
  loadAllFormsRequest,
  handleDeleteModal,
  deleteFormRequest,
  clearDeleteFormStatus,
  clearSaveFormStatus,
  duplicateForm,
} from '../../redux/forms/actions';

const mapStateToProps = state => ({
  forms: state.forms.list,
  loading: state.forms.loading,
  error: state.forms.error,
  openDelete: state.forms.delete.show,
  deleteError: state.forms.delete.error,
  deleteStatus: state.forms.delete.status,
  formTitle: state.forms.creation.title,
  saveStatus: state.forms.creation.status,
  isAClone: state.forms.creation.isAClone,
});

const mapDispatchToProps = dispatch => ({
  loadAllFormsRequest: () => dispatch(loadAllFormsRequest()),
  handleCreationModal: () => dispatch(handleCreationModal()),
  handleDeleteModal: () => dispatch(handleDeleteModal()),
  deleteFormRequest: payload => dispatch(deleteFormRequest(payload)),
  clearDeleteFormStatus: () => dispatch(clearDeleteFormStatus()),
  clearSaveFormStatus: payload => dispatch(clearSaveFormStatus(payload)),
  duplicateForm: payload => dispatch(duplicateForm(payload)),
});

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(FormsScreen),
);
