import { action } from 'typesafe-actions';
import { appUserReminderTypes } from './types';

export const searchAppUserRemindersRequest = requestParams =>
  action(appUserReminderTypes.SEARCH_APP_USER_REMINDERS_REQUEST, requestParams);
export const searchAppUserRemindersRequestSuccess = ({
  payload: data,
  pagination,
}) =>
  action(appUserReminderTypes.SEARCH_APP_USER_REMINDERS_SUCCESS, {
    data,
    pagination,
  });
export const searchAppUserRemindersFailure = () =>
  action(appUserReminderTypes.SEARCH_APP_USER_REMINDERS_FAILURE);
export const openSnackbar = snackbar => 
  action(appUserReminderTypes.OPEN_SNACKBAR, {payload: snackbar});
export const closeSnackbar = () => 
  action(appUserReminderTypes.CLOSE_SNACKBAR);
export const searchFirstPageAppUserRemindersRequestSuccess = ({
  payload: data,
 pagination,
}) =>
  action(appUserReminderTypes.SEARCH_FIRST_PAGE_APP_USER_REMINDERS_SUCCESS, {
    data,
    pagination,
  });

export const fetchRemindersWithLocation = ({ body }) => ({
  type: appUserReminderTypes.GET_REMINDERS_LOCATIONS,
  payload: { body },
});

export const setRemindersLocations = ({ list, showSnackBar }) => {
  return action(appUserReminderTypes.SET_REMINDERS_LOCATIONS, { list, showSnackBar });
};
