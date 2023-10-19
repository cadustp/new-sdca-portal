export enum ListsTypes {
  LISTS_DATA_REQUEST = 'LISTS_DATA_REQUEST',
  LISTS_DATA_REQUEST_RESPONSE = 'LISTS_DATA_REQUEST_RESPONSE',
  PLAN_USERS_REQUEST = 'PLAN_USERS_REQUEST',
  PLAN_USERS_RESPONSE = 'PLAN_USERS_RESPONSE',
};

export interface ListsState {
  data: {
    groups: Array<any> | [],
    forms: Array<any> | [],
    evaluateds: Array<any> | [],
    evaluators: Array<any> | [],
    admins: Array<any> | [],
    planUsers: Array<any> | [],
  }
  isLoading: boolean,
  failure: boolean,
}
