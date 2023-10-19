export enum evaluatedsTypes {
  SEARCH_EVALUATEDS_REQUEST = 'SEARCH_EVALUATEDS_REQUEST',
  SEARCH_FIRST_EVALUATEDS_REQUEST_SUCCESS = 'SEARCH_FIRST_EVALUATEDS_REQUEST_SUCCESS',
  SEARCH_EVALUATEDS_REQUEST_SUCCESS = 'SEARCH_EVALUATEDS_REQUEST_SUCCESS',
  SEARCH_EVALUATEDS_REQUEST_FAILURE = 'SEARCH_EVALUATEDS_REQUEST_FAILURE',
  UPDATE_EVALUATED_FILTER_PARAMS = 'UPDATE_EVALUATED_FILTER_PARAMS',
  CHANGE_EVALUATED_FILTER_MODAL_STATUS = 'CHANGE_EVALUATED_FILTER_MODAL_STATUS',
  IMPORT_EVALUATEDS_REQUEST = 'IMPORT_EVALUATEDS_REQUEST',
  IMPORT_EVALUATEDS_REQUEST_RESPONSE = 'IMPORT_EVALUATEDS_REQUEST_RESPONSE',
  CLEAR_IMPORT_STATUS = 'CLEAR_IMPORT_STATUS',
  ACTIVATE_INACTIVATE_EVALUATEDS_REQUEST = 'ACTIVATE_INACTIVATE_EVALUATEDS_REQUEST',
  ACTIVATE_INACTIVATE_EVALUATEDS_SUCCESS = 'ACTIVATE_INACTIVATE_EVALUATEDS_SUCCESS',
  ACTIVATE_INACTIVATE_EVALUATEDS_FAILURE = 'ACTIVATE_INACTIVATE_EVALUATEDS_FAILURE',
  SAVE_EVALUATED_REQUEST = 'SAVE_EVALUATED_REQUEST',
  SAVE_EVALUATED_REQUEST_RESPONSE = 'SAVE_EVALUATED_REQUEST_RESPONSE',
  CLEAR_EDIT_EVALUATED_STEPPER = 'CLEAR_EDIT_EVALUATED_STEPPER',
  SET_EDIT_EVALUATED = 'SET_EDIT_EVALUATED',
  CLEAR_EDIT_EVALUATED = 'CLEAR_EDIT_EVALUATED',
  EXPORT_EVALUATEDS_REQUEST = 'EXPORT_EVALUATEDS_REQUEST',
  EXPORT_EVALUATEDS_RESPONSE = 'EXPORT_EVALUATEDS_RESPONSE',
  CLEAR_EXPORT_STATUS = 'CLEAR_EXPORT_STATUS',
}

type EvaluatedTypeInfo = {
  id: number,
  name: string,
  active: boolean
};

type GroupInfo = {
  id: number,
  name: string
};

export interface Evaluated {
  id: number,
  name: string,
  email: string,
  group: GroupInfo,
  language: string,
  register: string,
  enableSendEmail: boolean,
}

interface SingleFilterInfo {
  value: number,
  label: string,
  key: number,
};

export interface filterParams {
  text: string;
  names: Array<SingleFilterInfo>,
  emails: Array<SingleFilterInfo>,
  groups: Array<SingleFilterInfo>,
  startDate: string,
  endDate: string,
  active: boolean,
  sort: string,
};

export interface EvaluatedsState {
  evaluateds: {
    data: Array<Evaluated> | [],
    pagination: {
      total: number,
      links: [],
    },
  }
  exportObject: Blob,
  isLoading: boolean,
  failure: boolean,
  activateInactivateFailure: boolean | null,
  filterParams: filterParams,
  filterModalIsOpen: boolean,
  importStatus: string,
  importRowErrors: [],
  evaluated: Evaluated,
  saveStatus: string,
  saveError: string,
  exportStatus: string,
  exportError: string,
}
