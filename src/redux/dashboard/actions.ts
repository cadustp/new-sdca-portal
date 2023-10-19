import { action } from 'typesafe-actions';
import { DashboardTypes } from './types';

export const dashboardDataRequest = () => action(DashboardTypes.DASHBOARD_DATA_REQUEST);
export const dashboardDataRequesResponse = response => action(
  DashboardTypes.DASHBOARD_DATA_REQUEST_RESPONSE, response,
);
