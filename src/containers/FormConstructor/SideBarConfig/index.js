import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import SideBarConfig from './SideBarConfig';
import {
  listsDataRequest,
} from '../../../redux/lists/actions';
import {
  handleToggleSideBar,
  setFormSettings,
  clearFormSettings,
  handleShareMode,
  loadAvailableUsers,
  clearLoadUsersStatus,
} from '../../../redux/forms/actions';

const mapStateToProps = state => ({
  open: state.forms.creation.show,
  showSideBar: state.forms.creation.showSideBar,
  forms: state.lists.data.forms,
  form: state.forms.form,
  shareMode: state.forms.form.shareMode,
  availableUsers: state.forms.creation.usersSharingTab.availableUsers,
  loadingLists: state.forms.creation.usersSharingTab.loading || state.lists.isLoading,
  loadFailure: state.forms.creation.usersSharingTab.failure || state.lists.failure,
});

const mapDispatchToProps = dispatch => ({
  onClose: () => dispatch(handleToggleSideBar()),
  listsDataRequest: requestParams => dispatch(listsDataRequest(requestParams)),
  setFormSettings: payload => dispatch(setFormSettings(payload)),
  clearFormSettings: () => dispatch(clearFormSettings()),
  handleShareMode: payload => dispatch(handleShareMode(payload)),
  loadAvailableUsers: () => dispatch(loadAvailableUsers()),
  clearLoadUsersStatus: (payload) => dispatch(clearLoadUsersStatus(payload)),
});

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(SideBarConfig),
);
