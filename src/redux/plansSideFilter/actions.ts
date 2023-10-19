import { action } from 'typesafe-actions';
import { plansSideFilterTypes } from './types';

export const updatePlansFilter = (payload) =>
  action(plansSideFilterTypes.UPDATE_PLANS_FILTER, payload);
export const clearPlansFilter = () =>
  action(plansSideFilterTypes.CLEAR_PLANS_FILTER);
