import { Moment } from 'moment';

export enum plansSideFilterTypes {
  UPDATE_PLANS_FILTER = 'UPDATE_PLANS_FILTER',
  CLEAR_PLANS_FILTER = 'CLEAR_PLANS_FILTER',
}

export interface PlansSideFiltersState {
  sideFilterParams: {
    startRange: Moment,
    endRange: Moment,
    planUserIds: [],
    planUserGroupIds: [],
    assetIds: [],
    assetGroupIds: [],
    appUserIds: [],
    appUserGroupIds: [],
  },
}
