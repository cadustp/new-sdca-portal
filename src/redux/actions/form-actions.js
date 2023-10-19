export const types = {
  ADD_USER_FORMS: 'ADD_USER_FORMS',
  SET_TRAINING_FORMS_INCLUSION: 'SET_TRAINING_FORMS_INCLUSION',
};

export const addUserForms = (data) => {
  const labels = [];
  const ids = [];
  const forms = data || [];
  forms.forEach((form) => {
    labels.push(form.name);
    ids.push(form.id);
  });
  return {
    type: types.ADD_USER_FORMS,
    payload: { labels, ids, forms },
  };
};

export const setTrainingFormsInclusion = include => ({
  type: types.SET_TRAINING_FORMS_INCLUSION,
  payload: {
    includeTraining: include,
  },
});
