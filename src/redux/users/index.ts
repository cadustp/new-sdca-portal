import { Reducer } from 'redux';
import { UsersState, usersTypes } from './types';
import { ORDER_TYPES } from '../../helpers/consts';

const INITIAL_STATE: UsersState = {
  users: {
    data: [],
    pagination: {
      total: 0,
      links: [],
    },
  },
  isLoading: false,
  exportObject: new Blob(),
  failure: false,
  activateInactivateFailure: null,
  filterModalIsOpen: false,
  filterParams: {
    text: '',
    names: [],
    emails: [],
    groups: [],
    typesOfUsers: [],
    startDate: '',
    endDate: '',
    active: true,
    sort: ORDER_TYPES.ALPHABETICAL_ASCENDING,
  },
  importStatus: '',
  importRowErrors: [],
  exportStatus: '',
  exportError: '',
  saveStatus: '',
  saveError: '',
  allAdmins: [],
  adminslistStatus: '',
  user: {
    id: 0,
    name: '',
    email: '',
    types: [],
    group: 0,
    register: '',
    language: '',
    responsible: 0,
    othersResponsibles: [],
    enableSendEmail: true,
    hasTemporaryAccess: false,
  },
};

const reducer: Reducer<UsersState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case usersTypes.SEARCH_USERS_REQUEST:
      return {
        ...state,
        isLoading: true,
        activateInactivateFailure: INITIAL_STATE.activateInactivateFailure,
      };
    case usersTypes.SEARCH_FIRST_USERS_REQUEST_SUCCESS:
      return {
        ...state,
        users: {
          data: action.payload.data,
          pagination: action.payload.pagination,
        },
        isLoading: false,
        failure: false,
      };
    case usersTypes.SEARCH_USERS_REQUEST_SUCCESS:
      return {
        ...state,
        users: {
          data: [...state.users.data, ...action.payload.data],
          pagination: action.payload.pagination,
        },
        isLoading: false,
        failure: false,
      };
    case usersTypes.SEARCH_USERS_REQUEST_FAILURE:
      return {
        ...state,
        isLoading: false,
        failure: true,
      };
    case usersTypes.CHANGE_USER_FILTER_MODAL_STATUS:
      return {
        ...state,
        filterModalIsOpen: action.payload,
      };
    case usersTypes.UPDATE_USER_FILTER_PARAMS:
      return {
        ...state,
        isLoading: true,
        filterModalIsOpen: false,
        filterParams: action.payload,
      };
    case usersTypes.IMPORT_USERS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case usersTypes.IMPORT_USERS_REQUEST_RESPONSE:
      return {
        ...state,
        importStatus: action.payload.importStatus,
        importRowErrors: action.payload.rowErrors,
        isLoading: false,
      };
    case usersTypes.CLEAR_IMPORT_STATUS:
      return {
        ...state,
        importStatus: '',
        importRowErrors: [],
      };
    case usersTypes.ACTIVATE_INACTIVATE_USERS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case usersTypes.ACTIVATE_INACTIVATE_USERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        failure: false,
        activateInactivateFailure: false,
      };
    case usersTypes.ACTIVATE_INACTIVATE_USERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        failure: true,
        activateInactivateFailure: true,
      };
    case usersTypes.SAVE_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case usersTypes.SAVE_USER_REQUEST_RESPONSE:
      return {
        ...state,
        saveStatus: action.payload.saveStatus,
        saveError: action.payload.saveError,
        isLoading: false,
      };
    case usersTypes.LIST_ADMINS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case usersTypes.LIST_ADMINS_REQUEST_RESPONSE:
      return {
        ...state,
        allAdmins: action.payload.allAdmins,
        adminslistStatus: action.payload.adminslistStatus,
        isLoading: false,
      };
    case usersTypes.CLEAR_EDIT_STEPPER:
      return {
        ...state,
        saveStatus: INITIAL_STATE.saveStatus,
        saveError: INITIAL_STATE.saveError,
        adminslistStatus: INITIAL_STATE.adminslistStatus,
      };
    case usersTypes.SET_EDIT_USER:
      return {
        ...state,
        user: {
          ...state.user,
          id: action.payload.id,
          name: action.payload.name,
          email: action.payload.email,
          types: action.payload.types,
          group: action.payload.group.id,
          register: action.payload.register,
          language: action.payload.language,
          responsible: action.payload.responsible_admin?.id,
          othersResponsibles: action.payload.other_responsible_admin,
          enableSendEmail: action.payload.enable_send_email_app_user_code,
          hasTemporaryAccess: action.payload.has_temporary_access,
        },
      };
    case usersTypes.CLEAR_EDIT_USER:
      return {
        ...state,
        user: INITIAL_STATE.user,
      };
    case usersTypes.EXPORT_USERS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case usersTypes.EXPORT_USERS_RESPONSE:
      return {
        ...state,
        exportObject: action.payload.exportObject || new Blob(),
        exportStatus: action.payload.exportStatus,
        exportError: action.payload.exportError,
        isLoading: false,
      };
    case usersTypes.CLEAR_EXPORT_STATUS:
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
