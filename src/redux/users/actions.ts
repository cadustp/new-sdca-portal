import { action } from 'typesafe-actions';
import { usersTypes } from './types';

export const searchUsersRequest = requestParams => action(usersTypes.SEARCH_USERS_REQUEST, requestParams);
export const searchUsersRequestSuccess = ({
  payload: data, pagination,
}) => action(usersTypes.SEARCH_USERS_REQUEST_SUCCESS, {
  data, pagination,
});
export const searchFirstUsersRequestSuccess = ({
  payload: data, pagination,
}) => action(usersTypes.SEARCH_FIRST_USERS_REQUEST_SUCCESS, {
  data, pagination,
});
export const searchUsersRequestFailure = () => action(usersTypes.SEARCH_USERS_REQUEST_FAILURE);
export const saveUserRequest = payload => action(usersTypes.SAVE_USER_REQUEST, payload);
export const saveUserRequestResponse = response => action(usersTypes.SAVE_USER_REQUEST_RESPONSE, response);
export const listAdminsRequest = () => action(usersTypes.LIST_ADMINS_REQUEST);
export const listAdminsRequestResponse = response => action(usersTypes.LIST_ADMINS_REQUEST_RESPONSE, response);
export const clearEditStepper = () => action(usersTypes.CLEAR_EDIT_STEPPER);
export const updateFilterParams = payload => action(usersTypes.UPDATE_USER_FILTER_PARAMS, payload);
export const changeFilterModalStatus = active => action(usersTypes.CHANGE_USER_FILTER_MODAL_STATUS, active);
export const importUsersRequest = importFile => action(usersTypes.IMPORT_USERS_REQUEST, importFile);
export const importUsersRequestResponse = importStatus => action(usersTypes.IMPORT_USERS_REQUEST_RESPONSE, importStatus);
export const clearImportStatus = () => action(usersTypes.CLEAR_IMPORT_STATUS);
export const setEditUser = user => action(usersTypes.SET_EDIT_USER, user);
export const clearEditUser = () => action(usersTypes.CLEAR_EDIT_USER);

export const activateInactivateUsersRequest = payload => action(usersTypes.ACTIVATE_INACTIVATE_USERS_REQUEST, payload);
export const activateInactivateUsersSuccess = () => action(usersTypes.ACTIVATE_INACTIVATE_USERS_SUCCESS);
export const activateInactivateUsersFailure = () => action(usersTypes.ACTIVATE_INACTIVATE_USERS_FAILURE);
export const exportUsersRequest = payload => action(usersTypes.EXPORT_USERS_REQUEST, payload);
export const exportUsersResponse = payload => action(usersTypes.EXPORT_USERS_RESPONSE, payload);
export const clearExportStatus = () => action(usersTypes.CLEAR_EXPORT_STATUS);
