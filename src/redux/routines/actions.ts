import { action } from 'typesafe-actions';
import { routinesTypes } from './types';

export const loadAllRoutinesRequest = () => action(routinesTypes.LOAD_ALL_ROUTINES_REQUEST);
export const loadAllRoutinesResponse = response => action(routinesTypes.LOAD_ALL_ROUTINES_RESPONSE, response);
export const handleDeleteRoutineModal = () => action(routinesTypes.HANDLE_DELETE_ROUTINE_MODAL);
export const deleteRoutineRequest = payload => action(routinesTypes.DELETE_ROUTINE_REQUEST, payload);
export const deleteRoutineResponse = response => action(routinesTypes.DELETE_ROUTINE_RESPONSE, response);
export const clearDeleteRoutineStatus = () => action(routinesTypes.CLEAR_DELETE_ROUTINE_STATUS);
export const activatePauseRoutineRequest = payload => action(routinesTypes.ACTIVATE_PAUSE_ROUTINE_REQUEST, payload);
export const activatePauseRoutineResponse = response => action(routinesTypes.ACTIVATE_PAUSE_ROUTINE_RESPONSE, response);
export const clearErrorStatus = () => action(routinesTypes.CLEAR_ERROR_STATUS);
