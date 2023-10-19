import { ACTION_PLAN_STATUSES } from '../helpers/consts';

export const light = {
  primary: '#7540EE',
  primaryTranslucent: '#F3EBFC',
  primaryDark: '#7700ff',
  primaryLight: '#F7F5FB',
  white: '#ffffff',
  contrast: '#f5f6fa',
  disabled: '#d9dadf',
  selected: '#f5f5f5',
  shadow: '#e5e9f2',
  gray: {
    default: '#838383',
    dark: '#33383B',
    light: '#B9B9B9',
    border: '#dcdcdc',
    gray: '#999999',
  },
  info: '#320056',
  success: '#45D0A1',
  error: {
    light: '#F5E0E0',
    dark: '#CD6566',
  },
  warn: '#FE9E4E',
  green: {
    light: '#45d0a133',
    dark: '#33B287',
  },
  greenDark: '#33B287',
  greenLight: '#45D0A1',
  orangeDark: '#FF7E80',
  orangeLight: '#FF9A6B',
  grayLight: '#E0E0E0',
};

export const dark = {};

export const text = {
  primary: '#333333',
  contrast: '#ffffff',
};

export const actionPlanColors = {
  [ACTION_PLAN_STATUSES.PENDING.name]: '#65B6E9',
  [ACTION_PLAN_STATUSES.LATE.name]: '#CD6566',
  [ACTION_PLAN_STATUSES.IN_PROGRESS.name]: '#E7BD1A',
  [ACTION_PLAN_STATUSES.CONCLUDED.name]: '#45D0A1',
  [ACTION_PLAN_STATUSES.CANCELED.name]: '#999999',
};

export default null;
