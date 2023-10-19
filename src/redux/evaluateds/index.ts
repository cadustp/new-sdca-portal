import { Reducer } from 'redux';
import { ORDER_TYPES } from '../../helpers/consts';
import { EvaluatedsState, evaluatedsTypes } from './types';

const INITIAL_STATE: EvaluatedsState = {
  evaluateds: {
    data: [],
    pagination: {
      total: 0,
      links: [],
    },
  },
  isLoading: false,
  failure: false,
  exportObject: new Blob(),
  activateInactivateFailure: null,
  filterModalIsOpen: false,
  saveStatus: '',
  saveError: '',
  evaluated: {
    id: 0,
    name: '',
    email: '',
    group: { id: 0, name: '' },
    register: '',
    language: '',
    enableSendEmail: true,
  },
  filterParams: {
    text: '',
    names: [],
    emails: [],
    groups: [],
    startDate: '',
    endDate: '',
    active: true,
    sort: ORDER_TYPES.ALPHABETICAL_ASCENDING,
  },
  importStatus: '',
  importRowErrors: [],
  exportStatus: '',
  exportError: '',
};

const reducer: Reducer<EvaluatedsState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case evaluatedsTypes.SEARCH_EVALUATEDS_REQUEST:
      return {
        ...state,
        isLoading: true,
        activateInactivateFailure: null,
      };
    case evaluatedsTypes.SEARCH_FIRST_EVALUATEDS_REQUEST_SUCCESS:
      return {
        ...state,
        evaluateds: {
          data: action.payload.data,
          pagination: action.payload.pagination,
        },
        isLoading: false,
        failure: false,
      };
    case evaluatedsTypes.SEARCH_EVALUATEDS_REQUEST_SUCCESS:
      return {
        ...state,
        evaluateds: {
          data: [...state.evaluateds.data, ...action.payload.data],
          pagination: action.payload.pagination,
        },
        isLoading: false,
        failure: false,
      };
    case evaluatedsTypes.SEARCH_EVALUATEDS_REQUEST_FAILURE:
      return {
        ...state,
        isLoading: false,
        failure: true,
      };
    case evaluatedsTypes.CHANGE_EVALUATED_FILTER_MODAL_STATUS:
      return {
        ...state,
        filterModalIsOpen: action.payload,
      };
    case evaluatedsTypes.UPDATE_EVALUATED_FILTER_PARAMS:
      return {
        ...state,
        isLoading: true,
        filterModalIsOpen: false,
        filterParams: action.payload,
      };
    case evaluatedsTypes.IMPORT_EVALUATEDS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case evaluatedsTypes.IMPORT_EVALUATEDS_REQUEST_RESPONSE:
      return {
        ...state,
        importStatus: action.payload.importStatus,
        importRowErrors: action.payload.rowErrors,
        isLoading: false,
      };
    case evaluatedsTypes.CLEAR_IMPORT_STATUS:
      return {
        ...state,
        importStatus: '',
        importRowErrors: [],
      };
    case evaluatedsTypes.ACTIVATE_INACTIVATE_EVALUATEDS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case evaluatedsTypes.ACTIVATE_INACTIVATE_EVALUATEDS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        failure: false,
        activateInactivateFailure: false,
      };
    case evaluatedsTypes.ACTIVATE_INACTIVATE_EVALUATEDS_FAILURE:
      return {
        ...state,
        isLoading: false,
        failure: true,
        activateInactivateFailure: true,
      };
    case evaluatedsTypes.SAVE_EVALUATED_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case evaluatedsTypes.SAVE_EVALUATED_REQUEST_RESPONSE:
      return {
        ...state,
        saveStatus: action.payload.saveStatus,
        saveError: action.payload.saveError,
        isLoading: false,
      };
    case evaluatedsTypes.CLEAR_EDIT_EVALUATED_STEPPER:
      return {
        ...state,
        saveStatus: INITIAL_STATE.saveStatus,
        saveError: INITIAL_STATE.saveError,
      };
    case evaluatedsTypes.SET_EDIT_EVALUATED:
      return {
        ...state,
        evaluated: {
          ...state.evaluated,
          id: action.payload.id,
          name: action.payload.name,
          email: action.payload.email,
          group: action.payload.group.id,
          register: action.payload.register,
          language: action.payload.language,
          enableSendEmail: action.payload.enable_send_email_app_user_code,
        },
      };
    case evaluatedsTypes.CLEAR_EDIT_EVALUATED:
      return {
        ...state,
        evaluated: INITIAL_STATE.evaluated,
      };
    case evaluatedsTypes.EXPORT_EVALUATEDS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case evaluatedsTypes.EXPORT_EVALUATEDS_RESPONSE:
      return {
        ...state,
        exportObject: action.payload.exportObject || new Blob(),
        exportStatus: action.payload.exportStatus,
        exportError: action.payload.exportError,
        isLoading: false,
      };
    case evaluatedsTypes.CLEAR_EXPORT_STATUS:
      return {
        ...state,
        exportObject: new Blob(),
        exportStatus: INITIAL_STATE.exportStatus,
        exportError: INITIAL_STATE.exportError,
      };
    default:
      return state;
  }
};

export default reducer;
