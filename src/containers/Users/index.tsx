import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { TYPES_OF_USER } from '../../helpers/consts';
import {
  searchUsersRequest,
  updateFilterParams,
  changeFilterModalStatus,
  importUsersRequest,
  clearImportStatus,
  activateInactivateUsersRequest,
  clearEditStepper,
  setEditUser,
  exportUsersRequest,
  clearExportStatus,
} from '../../redux/users/actions';
import {
  listsDataRequest,
} from '../../redux/lists/actions';

import UsersScreen from './UsersScreen';

const mapStateToProps = state => ({
  isLoading: state.users?.isLoading,
  loadingLists: state.lists.isLoading,
  users: state.users?.users,
  failure: state.users?.failure,
  activateInactivateFailure: state.users?.activateInactivateFailure,
  filterModalIsOpen: state.users.filterModalIsOpen,
  filterParams: state.users.filterParams,
  exportObject: state.users.exportObject,
  usersList: [...state.lists.data.evaluators, ...state.lists.data.admins],
  emailsList: [...state.lists.data.evaluators, ...state.lists.data.admins],
  groupsList: state.lists.data.groups,
  typesOfUserList: TYPES_OF_USER.TYPES,
  importStatus: state.users.importStatus,
  importRowErrors: state.users.importRowErrors,
  saveStatus: state.users.saveStatus,
  exportStatus: state.users.exportStatus,
  exportError: state.users.exportError,
});

const mapDispatchToProps = dispatch => ({
  searchUsersRequest: requestParams => dispatch(searchUsersRequest(requestParams)),
  updateFilterParams: filterParams => dispatch(updateFilterParams(filterParams)),
  changeFilterModalStatus: active => dispatch(changeFilterModalStatus(active)),
  importUsersRequest: importFile => dispatch(importUsersRequest(importFile)),
  setEditUser: user => dispatch(setEditUser(user)),
  clearImportStatus: () => dispatch(clearImportStatus()),
  activateInactivateUsersRequest: users => dispatch(activateInactivateUsersRequest(users)),
  clearEditStepper: () => dispatch(clearEditStepper()),
  listsDataRequest: requestParams => dispatch(listsDataRequest(requestParams)),
  exportUsersRequest: payload => dispatch(exportUsersRequest(payload)),
  clearExportStatus: () => dispatch(clearExportStatus()),
});

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(UsersScreen),
);
