import { Moment } from 'moment-timezone';
import moment from '../../../timezones/moment';

export enum Types {
  SET_SELECTED_FILTER = 'filters/SET_SELECTED_FILTER',
  SET_FILTER_DIRTY = 'filters/SET_FILTER_DIRTY',
  SET_DATES = 'filters/SET_DATES',
  SET_PERIOD_DATES = 'filters/SET_PERIOD_DATE',
  CLEAR_FILTER = 'filters/CLEAR_FILTER',
}

export type DataFilters = {
  appUsers: Record<string, boolean>;
  employees: Record<string, boolean>;
  groups: Record<string, boolean>;
  forms: Record<string, boolean>;
  isFilterDirty: boolean;
};

type DatesFilter = {
  start: Moment | null;
  end: Moment | null;
};

export interface FilterInterface {
  data: DataFilters;
  date: DatesFilter;
  filterPeriod: DatesFilter;
}

const initialState: FilterInterface = {
  data: {
    appUsers: {},
    employees: {},
    groups: {},
    forms: {},
    isFilterDirty: false,
  },
  date: {
    start: moment()
      .locale('pt-br')
      .subtract(30, 'days'),
    end: moment().locale('pt-br'),
  },
  filterPeriod: {
    start: null,
    end: null,
  },
};

export default (
  state: typeof initialState = initialState,
  action: Action,
): typeof initialState => {
  switch (action.type) {
    case Types.SET_DATES:
      return {
        ...state,
        date: action.payload,
      };
    case Types.SET_PERIOD_DATES:
      return {
        ...state,
        filterPeriod: action.payload,
      };
    case Types.SET_SELECTED_FILTER:
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.filter]: action.payload.content,
        },
      };
    case Types.SET_FILTER_DIRTY:
      return {
        ...state,
        data: { ...state.data, isFilterDirty: true },
      };
    case Types.CLEAR_FILTER:
      return {
        ...state,
        filterPeriod: { ...state.filterPeriod, start: null, end: null },
      };
    default:
      return state;
  }
};

export type SetSelectedFilter = {
  filter: 'appUsers'| 'employees' | 'groups' | 'forms';
  content: Record<string, boolean>;
};

export const setSelectedFilter = ({ filter, content }: SetSelectedFilter) => ({
  type: Types.SET_SELECTED_FILTER,
  payload: { filter, content },
} as const);

export const setFilterDirty = () => ({
  type: Types.SET_FILTER_DIRTY,
} as const);

export const setDatesFilter = ({ start, end }: DatesFilter) => ({
  type: Types.SET_DATES,
  payload: { start, end },
} as const);

export const setFilterPeriodDate = ({ start, end }) => ({
  type: Types.SET_PERIOD_DATES,
  payload: { start, end },
} as const);

export const clearFilter = () => ({
  type: Types.CLEAR_FILTER,
} as const);

type Action = ReturnType<
| typeof setSelectedFilter
| typeof setDatesFilter
| typeof setFilterDirty
| typeof setFilterPeriodDate
| typeof clearFilter
>;
