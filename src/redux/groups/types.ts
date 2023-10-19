export enum groupsTypes {
  SEARCH_GROUPS_REQUEST = 'SEARCH_GROUPS_REQUEST',
  SEARCH_FIRST_GROUPS_REQUEST_SUCCESS = 'SEARCH_FIRST_GROUPS_REQUEST_SUCCESS',
  SEARCH_GROUPS_REQUEST_SUCCESS = 'SEARCH_GROUPS_REQUEST_SUCCESS',
  SEARCH_GROUPS_REQUEST_FAILURE = 'SEARCH_GROUPS_REQUEST_FAILURE',
  UPDATE_GROUP_FILTER_PARAMS = 'UPDATE_GROUP_FILTER_PARAMS',
  CHANGE_FILTER_MODAL_STATUS = 'CHANGE_FILTER_MODAL_STATUS',
  IMPORT_GROUPS_REQUEST = 'IMPORT_GROUPS_REQUEST',
  IMPORT_GROUPS_REQUEST_RESPONSE = 'IMPORT_GROUPS_REQUEST_RESPONSE',
  CLEAR_IMPORT_STATUS = 'CLEAR_IMPORT_STATUS',
  OPEN_CREATE_MODAL = 'OPEN_CREATE_MODAL',
  CLEAR_CREATE_MODAL = 'CLEAR_CREATE_MODAL',
  CLEAR_CREATE_STATUS = 'CLEAR_CREATE_STATUS',
  SAVE_GROUP_REQUEST = 'SAVE_GROUP_REQUEST',
  SAVE_GROUP_REQUEST_RESPONSE = 'SAVE_GROUP_REQUEST_RESPONSE',
  LIST_ALL_GROUPS_REQUEST = 'LIST_ALL_GROUPS_REQUEST',
  LIST_ALL_GROUPS_REQUEST_RESPONSE = 'LIST_ALL_GROUPS_REQUEST_RESPONSE',
  DELETE_GROUP_REQUEST = 'DELETE_GROUP_REQUEST',
  DELETE_GROUP_REQUEST_RESPONSE = 'DELETE_GROUP_REQUEST_RESPONSE',
  CLEAR_DELETE_STATUS = 'CLEAR_DELETE_STATUS',
  EXPORT_GROUPS_REQUEST = 'EXPORT_GROUPS_REQUEST',
  EXPORT_GROUPS_RESPONSE = 'EXPORT_GROUPS_RESPONSE',
  CLEAR_EXPORT_STATUS = 'CLEAR_EXPORT_STATUS',
};
export interface Groups {
  id: number,
  name: string,
  parent: number,
  created_at: string,
  child_groups: Array<number> | [],
  members: Array<GroupMembers> | [],
};
export interface GroupMembers {
  id: number,
  type: string | null,
  name: string,
  email: string,
};
interface SingleFilterGroup {
  value: number,
  label: string,
  key: number,
};

interface SelectedGroupMember {
  label: string,
  key: number,
  value: number,
};

export interface filterParams {
  selectedStartDate: string,
  selectedEndDate: string,
  selectedParentGroups: Array<SingleFilterGroup>,
  selectedGroups: Array<SingleFilterGroup>,
  selectedGroupMembers: Array<SelectedGroupMember>,
  selectedSortType: string,
};

export interface createModal {
  isOpen: boolean,
  group: {
    id: number | null,
    name: string,
    parent: number | null,
    level: number | null,
    children: [],
  },
}

export interface GroupsState {
  groups: {
    data: Array<Groups> | [],
    pagination: [],
  }
  isLoading: boolean,
  failure: boolean,
  filterParams: filterParams,
  filterModalIsOpen: boolean,
  importStatus: string,
  importRowErrors: [],
  createModal: createModal,
  saveStatus: string,
  saveErrors: [],
  allGroups: [],
  listStatus: string,
  deleteStatus: string,
  deleteError: string,
  exportObject: Blob,
  exportStatus: string,
  exportError: string,
};
