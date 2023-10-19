import { action } from 'typesafe-actions';
import { digitalContentsTypes } from './types';

export const searchDigitalContentsRequest = payload => action(
  digitalContentsTypes.SEARCH_DIGITAL_CONTENTS_REQUEST, payload,
);
export const searchDigitalContentsResponse = response => action(
  digitalContentsTypes.SEARCH_DIGITAL_CONTENTS_RESPONSE, response,
);
export const deleteContentRequest = payload => action(
  digitalContentsTypes.DELETE_CONTENT_REQUEST, payload,
);
export const deleteContentResponse = response => action(
  digitalContentsTypes.DELETE_CONTENT_RESPONSE, response,
);
export const clearDeleteStatus = () => action(
  digitalContentsTypes.CLEAR_DELETE_STATUS,
);
export const openCreateModal = content => action(
  digitalContentsTypes.OPEN_DIGITAL_CREATE_MODAL, content,
);
export const clearCreateModal = () => action(
  digitalContentsTypes.CLEAR_CREATE_MODAL,
);
export const saveContentRequest = payload => action(
  digitalContentsTypes.SAVE_CONTENT_REQUEST, payload,
);
export const saveContentResponse = response => action(
  digitalContentsTypes.SAVE_CONTENT_RESPONSE, response,
);
export const clearCreateStatus = () => action(
  digitalContentsTypes.CLEAR_CREATE_STATUS,
);
