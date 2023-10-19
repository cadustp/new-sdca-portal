import { action } from 'typesafe-actions';
import { remindersSideFilterTypes } from './types';

export const updateRemindersFilter = (payload) =>
  action(remindersSideFilterTypes.UPDATE_REMINDERS_FILTER, payload);
export const clearRemindersFilters = () =>
  action(remindersSideFilterTypes.CLEAR_REMINDERS_FILTER);
