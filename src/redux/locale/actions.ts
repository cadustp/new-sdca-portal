import { action } from 'typesafe-actions';
import { localeTypes } from './types';

export const setLanguage = payload => action(localeTypes.SET_LANGUAGE, payload);
export const setLanguageRequest = payload => action(localeTypes.SET_LANGUAGE_REQUEST, payload);
export const setLanguageResponse = response => action(localeTypes.SET_LANGUAGE_RESPONSE, response);
export const clearLanguageErrors = () => action(localeTypes.CLEAR_LANGUAGE_ERRORS);
