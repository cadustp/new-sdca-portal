export const types = {
  SET_LANGUAGE: 'SET_LANGUAGE',
};

export const setLanguage = (language) => {
  const action = {
    type: types.SET_LANGUAGE,
    payload: {
      language: null,
    },
  };

  const lowerCaseLang = language && language.toLowerCase();
  if (lowerCaseLang) {
    action.payload.language = lowerCaseLang === 'pt-br' ? lowerCaseLang : lowerCaseLang.split('-')[0];
  }

  return action;
};
