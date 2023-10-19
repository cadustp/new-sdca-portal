import { action } from 'typesafe-actions';
import { evaluatedsTypes } from './types';

export const searchEvaluatedsRequest = requestParams => action(evaluatedsTypes.SEARCH_EVALUATEDS_REQUEST, requestParams);

export const searchEvaluatedsRequestSuccess = ({
  payload: data, pagination,
}) => action(evaluatedsTypes.SEARCH_EVALUATEDS_REQUEST_SUCCESS, {
  data, pagination,
});

export const searchFirstEvaluatedsRequestSuccess = ({
  payload: data, pagination,
}) => action(evaluatedsTypes.SEARCH_FIRST_EVALUATEDS_REQUEST_SUCCESS, {
  data, pagination,
});

export const searchEvaluatedsRequestFailure = () => action(evaluatedsTypes.SEARCH_EVALUATEDS_REQUEST_FAILURE);
export const updateFilterParams = payload => action(evaluatedsTypes.UPDATE_EVALUATED_FILTER_PARAMS, payload);
export const changeFilterModalStatus = active => action(evaluatedsTypes.CHANGE_EVALUATED_FILTER_MODAL_STATUS, active);
export const importEvaluatedsRequest = importFile => action(evaluatedsTypes.IMPORT_EVALUATEDS_REQUEST, importFile);
export const importEvaluatedsRequestResponse = importStatus => action(evaluatedsTypes.IMPORT_EVALUATEDS_REQUEST_RESPONSE, importStatus);
export const clearImportStatus = () => action(evaluatedsTypes.CLEAR_IMPORT_STATUS);

export const activateInactivateEvaluatedsRequest = payload => action(evaluatedsTypes.ACTIVATE_INACTIVATE_EVALUATEDS_REQUEST, payload);
export const activateInactivateEvaluatedsSuccess = () => action(evaluatedsTypes.ACTIVATE_INACTIVATE_EVALUATEDS_SUCCESS);
export const activateInactivateEvaluatedsFailure = () => action(evaluatedsTypes.ACTIVATE_INACTIVATE_EVALUATEDS_FAILURE);

export const saveEvaluatedRequest = payload => action(evaluatedsTypes.SAVE_EVALUATED_REQUEST, payload);
export const saveEvaluatedRequestResponse = response => action(evaluatedsTypes.SAVE_EVALUATED_REQUEST_RESPONSE, response);
export const setEditEvaluated = evaluated => action(evaluatedsTypes.SET_EDIT_EVALUATED, evaluated);
export const clearEditEvaluated = () => action(evaluatedsTypes.CLEAR_EDIT_EVALUATED);
export const clearEditEvaluatedStepper = () => action(evaluatedsTypes.CLEAR_EDIT_EVALUATED_STEPPER);
export const exportEvaluatedsRequest = payload => action(evaluatedsTypes.EXPORT_EVALUATEDS_REQUEST, payload);
export const exportEvaluatedsResponse = payload => action(evaluatedsTypes.EXPORT_EVALUATEDS_RESPONSE, payload);
export const clearExportStatus = () => action(evaluatedsTypes.CLEAR_EXPORT_STATUS);
