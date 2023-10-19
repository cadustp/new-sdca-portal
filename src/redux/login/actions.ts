import { action } from 'typesafe-actions';
import { loginTypes } from './types';

export const doLoginRequest = payload => action(loginTypes.DO_LOGIN_REQUEST, payload);
export const doLoginResponse = payload => action(loginTypes.DO_LOGIN_RESPONSE, payload);
export const resetInstructionsRequest = payload => action(loginTypes.RESET_INSTRUCTIONS_REQUEST, payload);
export const resetInstructionsResponse = payload => action(loginTypes.RESET_INSTRUCTIONS_RESPONSE, payload);
export const updatePasswordRequest = payload => action(loginTypes.UPDATE_PASSWORD_REQUEST, payload);
export const updatePasswordResponse = payload => action(loginTypes.UPDATE_PASSWORD_RESPONSE, payload);
export const saveLoggedUser = payload => action(loginTypes.SAVE_LOGGED_USER, payload);
export const doLogout = payload => action(loginTypes.DO_LOGOUT, payload);
export const clearStatus = () => action(loginTypes.CLEAR_STATUS);
