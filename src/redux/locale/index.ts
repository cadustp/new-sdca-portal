import { Reducer } from 'redux';
import { localeTypes, LocaleState } from './types';

const INITIAL_STATE: LocaleState = {
  language: navigator.language === 'pt-BR'
    ? navigator.language
    : navigator.language.split('-')[0],
  isLoading: false,
  error: false,
  errorMessage: '',
};

const reducer: Reducer<LocaleState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case localeTypes.SET_LANGUAGE:
      return {
        ...state,
        language: action.payload || state.language,
      };
    case localeTypes.SET_LANGUAGE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case localeTypes.SET_LANGUAGE_RESPONSE:
      return {
        ...state,
        language: action.payload.error ? state.language : action.payload.language,
        error: action.payload.error ?? false,
        errorMessage: action.payload.errorMessage ?? '',
        isLoading: false,
      };
    case localeTypes.CLEAR_LANGUAGE_ERRORS:
      return {
        ...state,
        error: false,
        errorMessage: '',
      };
    default:
      return state;
  }
};

export default reducer;
