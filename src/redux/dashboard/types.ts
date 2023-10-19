export enum DashboardTypes {
  DASHBOARD_DATA_REQUEST = 'DASHBOARD_DATA_REQUEST',
  DASHBOARD_DATA_REQUEST_RESPONSE = 'DASHBOARD_DATA_REQUEST_RESPONSE',
};

export interface DashboardState {
  isLoading: boolean,
  failure: boolean,
}
