import { action } from 'typesafe-actions';
import { groupsTypes } from './types';

export const searchGroupsRequest = requestParams => action(groupsTypes.SEARCH_GROUPS_REQUEST, requestParams);
export const searchGroupsRequestSuccess = ({
  payload: data, pagination,
}) => action(groupsTypes.SEARCH_GROUPS_REQUEST_SUCCESS, {
  data, pagination,
});
export const searchFirstGroupsRequestSuccess = ({
  payload: data, pagination,
}) => action(groupsTypes.SEARCH_FIRST_GROUPS_REQUEST_SUCCESS, {
  data, pagination,
});
export const searchGroupsRequestFailure = () => action(groupsTypes.SEARCH_GROUPS_REQUEST_FAILURE);

export const updateFilterParams = payload => action(groupsTypes.UPDATE_GROUP_FILTER_PARAMS, payload);
export const changeFilterModalStatus = active => action(groupsTypes.CHANGE_FILTER_MODAL_STATUS, active);

export const importGroupsRequest = importFile => action(groupsTypes.IMPORT_GROUPS_REQUEST, importFile);
export const importGroupsRequestResponse = importStatus => action(groupsTypes.IMPORT_GROUPS_REQUEST_RESPONSE, importStatus);
export const clearImportStatus = () => action(groupsTypes.CLEAR_IMPORT_STATUS);
export const openCreateModal = group => action(groupsTypes.OPEN_CREATE_MODAL, group);
export const clearCreateModal = () => action(groupsTypes.CLEAR_CREATE_MODAL);
export const clearCreateStatus = () => action(groupsTypes.CLEAR_CREATE_STATUS);
export const clearDeleteStatus = () => action(groupsTypes.CLEAR_DELETE_STATUS);
export const saveGroupRequest = payload => action(groupsTypes.SAVE_GROUP_REQUEST, payload);
export const saveGroupRequestResponse = response => action(groupsTypes.SAVE_GROUP_REQUEST_RESPONSE, response);
export const deleteGroupRequest = payload => action(groupsTypes.DELETE_GROUP_REQUEST, payload);
export const deleteGroupRequestResponse = response => action(groupsTypes.DELETE_GROUP_REQUEST_RESPONSE, response);
export const listAllGroupsRequest = () => action(groupsTypes.LIST_ALL_GROUPS_REQUEST);
export const listAllGroupsRequestResponse = response => action(groupsTypes.LIST_ALL_GROUPS_REQUEST_RESPONSE, response);
export const exportGroupsRequest = payload => action(groupsTypes.EXPORT_GROUPS_REQUEST, payload);
export const exportGroupsResponse = payload => action(groupsTypes.EXPORT_GROUPS_RESPONSE, payload);
export const clearExportStatus = () => action(groupsTypes.CLEAR_EXPORT_STATUS);
