import { Reducer } from 'redux';
import { CompanyState, CompanyTypes } from './types';

const INITIAL_STATE: CompanyState = {
  company: {
    id: 0,
    name: '',
    language: 0,
    domain: '',
    logo: '',
    token: '',
  },
  settings: {
    qualityAvg: {},
    qualityHigh: {},
    adherenceAvg: {},
    adherenceHigh: {},
    reescheduleLimit: {},
    appCreate: {},
    appReeschedule: {},
    appCancel: {},
    allEvaluatorsCreate: {},
    reescheduleLow: {},
    reescheduleHigh: {},
    reescheduleAttached: {},
    sundayReeschedule: {},
    saturdayReeschedule: {},
    evaluatedEmail: {},
    evaluatorEmail: {},
  },
  failure: false,
  isLoading: false,
  saveStatus: '',
  saveError: '',
};

const reducer: Reducer<CompanyState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CompanyTypes.SAVE_COMPANY_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case CompanyTypes.SAVE_COMPANY_REQUEST_RESPONSE:
      return {
        ...state,
        isLoading: false,
        saveStatus: action.payload.saveStatus,
        saveError: action.payload.saveError,
      };
    case CompanyTypes.COMPANY_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case CompanyTypes.COMPANY_DATA_REQUEST_RESPONSE:
      return {
        ...state,
        isLoading: false,
        company: action.payload.company,
        settings: action.payload.settings,
        failure: action.payload.failure,
      };
    case CompanyTypes.CLEAR_COMMPANY_DATA:
      return {
        ...state,
        company: INITIAL_STATE.company,
        settings: INITIAL_STATE.settings,
        saveStatus: INITIAL_STATE.saveStatus,
        saveError: INITIAL_STATE.saveError,
      };
    default:
      return state;
  }
};

export default reducer;
