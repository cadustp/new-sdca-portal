export enum digitalContentsTypes {
  SEARCH_DIGITAL_CONTENTS_REQUEST = 'SEARCH_DIGITAL_CONTENTS_REQUEST',
  SEARCH_DIGITAL_CONTENTS_RESPONSE = 'SEARCH_DIGITAL_CONTENTS_RESPONSE',
  DELETE_CONTENT_REQUEST = 'DELETE_CONTENT_REQUEST',
  DELETE_CONTENT_RESPONSE = 'DELETE_CONTENT_RESPONSE',
  CLEAR_DELETE_STATUS = 'CLEAR_DELETE_STATUS',
  OPEN_DIGITAL_CREATE_MODAL = 'OPEN_DIGITAL_CREATE_MODAL',
  CLEAR_CREATE_MODAL = 'CLEAR_CREATE_MODAL',
  SAVE_CONTENT_REQUEST = 'SAVE_CONTENT_REQUEST',
  SAVE_CONTENT_RESPONSE = 'SAVE_CONTENT_RESPONSE',
  CLEAR_CREATE_STATUS = 'CLEAR_CREATE_STATUS',
}

export interface Contents {
  id: number,
  name: string,
  description: string,
  type: string,
  url: string,
  users: Array<any>,
  updated: string,
};

export interface createModal {
  isOpen: boolean,
  content: Array<Contents>
}

export interface DigitalContentsState {
  isLoading: boolean,
  error: string,
  contents: Array<Contents> | [],
  deleteStatus: string,
  deleteError: string,
  createModal: createModal,
  saveStatus: string,
  saveError: string,
}
