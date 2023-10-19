import { Reducer } from 'redux';
import { digitalContentsTypes, DigitalContentsState } from './types';

const INITIAL_STATE: DigitalContentsState = {
  isLoading: false,
  contents: [],
  error: '',
  deleteStatus: '',
  deleteError: '',
  saveStatus: '',
  saveError: '',
  createModal: {
    isOpen: false,
    content: [],
  },
};

const reducer: Reducer<DigitalContentsState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case digitalContentsTypes.SEARCH_DIGITAL_CONTENTS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case digitalContentsTypes.SEARCH_DIGITAL_CONTENTS_RESPONSE:
      return {
        ...state,
        contents: action.payload.data ?? [],
        isLoading: false,
        error: action.payload.error ?? '',
      };
    case digitalContentsTypes.DELETE_CONTENT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case digitalContentsTypes.DELETE_CONTENT_RESPONSE:
      return {
        ...state,
        contents: action.payload.updatedContents,
        deleteStatus: action.payload.deleteStatus,
        deleteError: action.payload.deleteError,
        isLoading: false,
      };
    case digitalContentsTypes.CLEAR_DELETE_STATUS:
      return {
        ...state,
        deleteStatus: INITIAL_STATE.deleteStatus,
        deleteError: INITIAL_STATE.deleteError,
      };
    case digitalContentsTypes.OPEN_DIGITAL_CREATE_MODAL:
      return {
        ...state,
        createModal: {
          isOpen: true,
          content: {
            ...state.createModal.content,
            id: action.payload?.id,
            name: action.payload?.name,
            description: action.payload?.description,
            url: action.payload?.url,
            users: action.payload?.users,
          },
        },
      };
    case digitalContentsTypes.CLEAR_CREATE_MODAL:
      return {
        ...state,
        createModal: INITIAL_STATE.createModal,
      };
    case digitalContentsTypes.CLEAR_CREATE_STATUS:
      return {
        ...state,
        saveStatus: INITIAL_STATE.saveStatus,
        saveError: INITIAL_STATE.saveError,
      };
    case digitalContentsTypes.SAVE_CONTENT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case digitalContentsTypes.SAVE_CONTENT_RESPONSE:
      return {
        ...state,
        saveStatus: action.payload.saveStatus,
        saveError: action.payload.saveError,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default reducer;
