import { action } from 'typesafe-actions';
import { ListsTypes } from './types';

export const listsDataRequest = requestParams => action(ListsTypes.LISTS_DATA_REQUEST, requestParams);
export const listsDataRequesResponse = response => action(
  ListsTypes.LISTS_DATA_REQUEST_RESPONSE, response,
);
export const planUsersRequest = () => action(ListsTypes.PLAN_USERS_REQUEST);
export const planUsersResponse = response => action(
  ListsTypes.PLAN_USERS_RESPONSE, response,
);
