import { types } from '../actions/locale-actions';

const initialState = {
  language:
    navigator.language === 'pt-BR'
      ? navigator.language
      : navigator.language.split('-')[0],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_LANGUAGE:
      return {
        language: action.payload.language || state.language,
      };
    default:
      return state;
  }
};
