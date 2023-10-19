import { Reducer } from 'redux';
import { GroupsState, groupsTypes } from './types';

const INITIAL_STATE: GroupsState = {
  groups: {
    data: [],
    pagination: [],
  },
  isLoading: false,
  failure: false,
  filterParams: {
    selectedStartDate: '',
    selectedEndDate: '',
    selectedParentGroups: [],
    selectedGroups: [],
    selectedGroupMembers: [],
    selectedSortType: 'ALPHABETICAL_ASCENDING',
  },
  filterModalIsOpen: false,
  importStatus: '',
  exportObject: new Blob(),
  exportStatus: '',
  exportError: '',
  importRowErrors: [],
  createModal: {
    isOpen: false,
    group: {
      id: null,
      name: '',
      parent: null,
      level: null,
      children: [],
    },
  },
  saveStatus: '',
  saveErrors: [],
  allGroups: [],
  listStatus: '',
  deleteStatus: '',
  deleteError: '',
};

const reducer: Reducer<GroupsState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case groupsTypes.SEARCH_GROUPS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case groupsTypes.SEARCH_FIRST_GROUPS_REQUEST_SUCCESS:
      return {
        ...state,
        groups: {
          data: action.payload.data,
          pagination: action.payload.pagination,
        },
        isLoading: false,
        failure: false,
      };
    case groupsTypes.SEARCH_GROUPS_REQUEST_SUCCESS:
      return {
        ...state,
        groups: {
          data: [...state.groups.data, ...action.payload.data],
          pagination: action.payload.pagination,
        },
        isLoading: false,
        failure: false,
      };
    case groupsTypes.SEARCH_GROUPS_REQUEST_FAILURE:
      return {
        ...state,
        isLoading: false,
        failure: true,
      };
    case groupsTypes.IMPORT_GROUPS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case groupsTypes.IMPORT_GROUPS_REQUEST_RESPONSE:
      return {
        ...state,
        importStatus: action.payload.importStatus,
        importRowErrors: action.payload.rowErrors,
        isLoading: false,
      };
    case groupsTypes.CLEAR_IMPORT_STATUS:
      return {
        ...state,
        importStatus: '',
        importRowErrors: [],
      };
    case groupsTypes.CHANGE_FILTER_MODAL_STATUS:
      return {
        ...state,
        filterModalIsOpen: action.payload,
      };
    case groupsTypes.UPDATE_GROUP_FILTER_PARAMS:
      return {
        ...state,
        isLoading: true,
        filterModalIsOpen: false,
        filterParams: action.payload,
      };
    case groupsTypes.OPEN_CREATE_MODAL:
      return {
        ...state,
        createModal: {
          isOpen: true,
          group: {
            id: action.payload?.id,
            name: action.payload?.name,
            parent: action.payload?.ancestry ? action.payload.ancestry.at(-1) : null,
            level: action.payload?.level,
            children: action.payload?.child_groups,
          },
        },
      };
    case groupsTypes.CLEAR_CREATE_MODAL:
      return {
        ...state,
        createModal: INITIAL_STATE.createModal,
      };
    case groupsTypes.CLEAR_CREATE_STATUS:
      return {
        ...state,
        saveStatus: INITIAL_STATE.saveStatus,
        saveErrors: INITIAL_STATE.saveErrors,
      };
    case groupsTypes.SAVE_GROUP_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case groupsTypes.SAVE_GROUP_REQUEST_RESPONSE:
      return {
        ...state,
        saveStatus: action.payload.saveStatus,
        saveErrors: action.payload.saveErrors,
        isLoading: false,
      };
    case groupsTypes.LIST_ALL_GROUPS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case groupsTypes.LIST_ALL_GROUPS_REQUEST_RESPONSE:
      return {
        ...state,
        allGroups: action.payload.allGroups,
        listStatus: action.payload.listStatus,
        isLoading: false,
      };
    case groupsTypes.DELETE_GROUP_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case groupsTypes.DELETE_GROUP_REQUEST_RESPONSE:
      return {
        ...state,
        deleteStatus: action.payload.deleteStatus,
        deleteError: action.payload.deleteError,
        isLoading: false,
      };
    case groupsTypes.CLEAR_DELETE_STATUS:
      return {
        ...state,
        deleteStatus: INITIAL_STATE.deleteStatus,
        deleteError: INITIAL_STATE.deleteError,
      };
    case groupsTypes.EXPORT_GROUPS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case groupsTypes.EXPORT_GROUPS_RESPONSE:
      return {
        ...state,
        exportObject: action.payload.exportObject || new Blob(),
        exportStatus: action.payload.exportStatus,
        exportError: action.payload.exportError,
        isLoading: false,
      };
    case groupsTypes.CLEAR_EXPORT_STATUS:
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
