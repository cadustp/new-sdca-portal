import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import CreateModal from './CreateModal';
import {
  listsDataRequest,
} from '../../../redux/lists/actions';
import {
  handleCreationModal,
  setFormSettings,
  clearFormSettings,
  handleShareMode,
  loadAvailableUsers,
  clearLoadUsersStatus,
} from '../../../redux/forms/actions';

const mapStateToProps = state => ({
  open: state.forms.creation.show,
  forms: state.lists.data.forms,
  form: state.forms.form,
  shareMode: state.forms.form.shareMode,
  availableUsers: state.forms.creation.usersSharingTab.availableUsers,
  loadingLists: state.forms.creation.usersSharingTab.loading || state.lists.isLoading,
  loadFailure: state.forms.creation.usersSharingTab.failure || state.lists.failure,
});

const mapDispatchToProps = dispatch => ({
  onClose: () => dispatch(handleCreationModal()),
  listsDataRequest: requestParams => dispatch(listsDataRequest(requestParams)),
  setFormSettings: payload => dispatch(setFormSettings(payload)),
  clearFormSettings: () => dispatch(clearFormSettings()),
  handleShareMode: payload => dispatch(handleShareMode(payload)),
  loadAvailableUsers: () => dispatch(loadAvailableUsers()),
  clearLoadUsersStatus: (payload) => dispatch(clearLoadUsersStatus(payload)),
});

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(CreateModal),
);
