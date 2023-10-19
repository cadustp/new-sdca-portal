export enum usersTypes {
  SEARCH_USERS_REQUEST = 'SEARCH_USERS_REQUEST',
  SEARCH_FIRST_USERS_REQUEST_SUCCESS = 'SEARCH_FIRST_USERS_REQUEST_SUCCESS',
  SEARCH_USERS_REQUEST_SUCCESS = 'SEARCH_USERS_REQUEST_SUCCESS',
  SEARCH_USERS_REQUEST_FAILURE = 'SEARCH_USERS_REQUEST_FAILURE',
  UPDATE_USER_FILTER_PARAMS = 'UPDATE_USER_FILTER_PARAMS',
  CHANGE_USER_FILTER_MODAL_STATUS = 'CHANGE_USER_FILTER_MODAL_STATUS',
  IMPORT_USERS_REQUEST = 'IMPORT_USERS_REQUEST',
  IMPORT_USERS_REQUEST_RESPONSE = 'IMPORT_USERS_REQUEST_RESPONSE',
  CLEAR_IMPORT_STATUS = 'CLEAR_IMPORT_STATUS',
  ACTIVATE_INACTIVATE_USERS_REQUEST = 'ACTIVATE_INACTIVATE_USERS_REQUEST',
  ACTIVATE_INACTIVATE_USERS_SUCCESS = 'ACTIVATE_INACTIVATE_USERS_SUCCESS',
  ACTIVATE_INACTIVATE_USERS_FAILURE = 'ACTIVATE_INACTIVATE_USERS_FAILURE',
  SAVE_USER_REQUEST = 'SAVE_USER_REQUEST',
  SAVE_USER_REQUEST_RESPONSE = 'SAVE_USER_REQUEST_RESPONSE',
  LIST_ADMINS_REQUEST = 'LIST_ADMINS_REQUEST',
  LIST_ADMINS_REQUEST_RESPONSE = 'LIST_ADMINS_REQUEST_RESPONSE',
  CLEAR_EDIT_STEPPER = 'CLEAR_EDIT_STEPPER',
  SET_EDIT_USER = 'SET_EDIT_USER',
  CLEAR_EDIT_USER = 'CLEAR_EDIT_USER',
  EXPORT_USERS_REQUEST = 'EXPORT_USERS_REQUEST',
  EXPORT_USERS_RESPONSE = 'EXPORT_USERS_RESPONSE',
  CLEAR_EXPORT_STATUS = 'CLEAR_EXPORT_STATUS',
}

type UserTypeInfo = {
  id: number,
  name: string,
  active: boolean
};

type GroupInfo = {
  id: number,
  name: string
};

type MembersInfo = {
  id: number,
  name: string
};

export interface User {
  id: number,
  name: string,
  email: string,
  types: Array<UserTypeInfo>,
  group: GroupInfo,
  register: string,
  language: string,
  responsible_admin: Array<MembersInfo>,
  other_responsible_admin: Array<MembersInfo>,
  active: boolean
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
  typesOfUsers: Array<SingleFilterInfo>,
  startDate: string,
  endDate: string,
  active: boolean,
  sort: string,
};

export interface UsersState {
  users: {
    data: Array<User> | [],
    pagination: {
      total: number,
      links: [],
    },
  }
  isLoading: boolean,
  failure: boolean,
  exportObject: Blob,
  activateInactivateFailure: boolean | null,
  filterParams: filterParams,
  filterModalIsOpen: boolean,
  importStatus: string,
  importRowErrors: [],
  saveStatus: string,
  saveError: string,
  allAdmins: [],
  adminslistStatus: string
  user: {
    id: number,
    name: string,
    email: string,
    types: Array<UserTypeInfo>,
    group: number,
    register: string,
    language: string,
    responsible: number,
    othersResponsibles: Array<MembersInfo>,
    enableSendEmail: boolean,
    hasTemporaryAccess: boolean
  },
  exportStatus: string,
  exportError: string,
}
