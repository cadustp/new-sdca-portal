import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
  saveUserRequest,
  listAdminsRequest,
  clearEditStepper,
  clearEditUser,
} from '../../redux/users/actions';
import {
  listAllGroupsRequest,
} from '../../redux/groups/actions';

import UserCreationScreen from './EditUserScreen';

const mapStateToProps = state => ({
  isLoading: state.users.isLoading,
  saveStatus: state.users.saveStatus,
  saveError: state.users.saveError,
  allGroups: state.groups.allGroups,
  allAdmins: state.users.allAdmins,
  user: state.users.user,
});

const mapDispatchToProps = dispatch => ({
  saveUserRequest: payload => dispatch(saveUserRequest(payload)),
  listAllGroupsRequest: () => dispatch(listAllGroupsRequest()),
  listAdminsRequest: () => dispatch(listAdminsRequest()),
  clearEditStepper: () => dispatch(clearEditStepper()),
  clearEditUser: () => dispatch(clearEditUser()),
});

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(UserCreationScreen),
);
