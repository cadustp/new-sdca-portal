import { Reducer } from 'redux';
import { ListsState, ListsTypes } from './types';

const INITIAL_STATE: ListsState = {
  data: {
    groups: [],
    forms: [],
    evaluateds: [],
    evaluators: [],
    admins: [],
    planUsers: [],
  },
  failure: false,
  isLoading: false,
};

const reducer: Reducer<ListsState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ListsTypes.LISTS_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case ListsTypes.LISTS_DATA_REQUEST_RESPONSE:
      return {
        ...state,
        data: { ...state.data, ...action.payload.data },
        isLoading: false,
        failure: action.payload.failure,
      };
    case ListsTypes.PLAN_USERS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case ListsTypes.PLAN_USERS_RESPONSE:
      return {
        ...state,
        data: { ...state.data, planUsers: action.payload.data },
        isLoading: false,
        failure: action.payload.failure,
      };
    default:
      return state;
  }
};

export default reducer;
