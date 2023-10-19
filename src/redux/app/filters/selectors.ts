// eslint-disable-next-line import/prefer-default-export
export const getForms = state => {
  const { includeTraining } = state.formReducer;
  return includeTraining
    ? state.formReducer.forms
    : state.formReducer.notTraining.forms;
};
