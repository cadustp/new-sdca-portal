export enum localeTypes {
  SET_LANGUAGE = 'SET_LANGUAGE',
  SET_LANGUAGE_REQUEST = 'SET_LANGUAGE_REQUEST',
  SET_LANGUAGE_RESPONSE = 'SET_LANGUAGE_RESPONSE',
  CLEAR_LANGUAGE_ERRORS = 'CLEAR_LANGUAGE_ERRORS',
}

type LocaleInfo = {
  language: string,
};

export interface LocaleState {
  language: string,
  isLoading: boolean,
  error: boolean,
  errorMessage: string
}
