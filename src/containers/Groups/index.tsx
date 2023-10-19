import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
  searchGroupsRequest,
  importGroupsRequest,
  saveGroupRequest,
  clearImportStatus,
  updateFilterParams,
  changeFilterModalStatus,
  openCreateModal,
  clearCreateModal,
  clearCreateStatus,
  listAllGroupsRequest,
  deleteGroupRequest,
  clearDeleteStatus,
  exportGroupsRequest,
  clearExportStatus,
} from '../../redux/groups/actions';
import {
  listsDataRequest,
} from '../../redux/lists/actions';

import GroupsScreen from './GroupsScreen';

const mapStateToProps = state => ({
  groups: state.groups.groups,
  isLoading: state.groups.isLoading,
  loadingLists: state.lists.isLoading,
  failure: state.groups.failure,
  importStatus: state.groups.importStatus,
  importRowErrors: state.groups.importRowErrors,
  filterParams: state.groups.filterParams,
  filterModalIsOpen: state.groups.filterModalIsOpen,
  filterGroups: state.lists.data.groups,
  filterMembers: [...state.lists.data.evaluators, ...state.lists.data.evaluateds],
  createModal: state.groups.createModal,
  saveStatus: state.groups.saveStatus,
  saveErrors: state.groups.saveErrors,
  deleteStatus: state.groups.deleteStatus,
  deleteError: state.groups.deleteError,
  allGroups: state.groups.allGroups,
  exportObject: state.groups.exportObject,
  exportStatus: state.groups.exportStatus,
  exportError: state.groups.exportError,
});

const mapDispatchToProps = dispatch => ({
  searchGroupsRequest: requestParams => dispatch(searchGroupsRequest(requestParams)),
  importGroupsRequest: importFile => dispatch(importGroupsRequest(importFile)),
  saveGroupRequest: payload => dispatch(saveGroupRequest(payload)),
  deleteGroupRequest: payload => dispatch(deleteGroupRequest(payload)),
  clearDeleteStatus: () => dispatch(clearDeleteStatus()),
  clearImportStatus: () => dispatch(clearImportStatus()),
  changeFilterModalStatus: active => dispatch(changeFilterModalStatus(active)),
  updateFilterParams: filterParams => dispatch(updateFilterParams(filterParams)),
  openCreateModal: groupID => dispatch(openCreateModal(groupID)),
  clearCreateModal: () => dispatch(clearCreateModal()),
  clearCreateStatus: () => dispatch(clearCreateStatus()),
  listAllGroupsRequest: () => dispatch(listAllGroupsRequest()),
  listsDataRequest: requestParams => dispatch(listsDataRequest(requestParams)),
  exportGroupsRequest: payload => dispatch(exportGroupsRequest(payload)),
  clearExportStatus: () => dispatch(clearExportStatus()),
});

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(GroupsScreen),
);
