import { types } from '../actions/form-actions';
import { FORM_TYPE } from '../../assets/constants';

const initialState = {
  ids: [],
  labels: [],
  forms: [],
  includeTraining: true,
  notTraining: {
    ids: [],
    labels: [],
    forms: [],
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_USER_FORMS:
      return {
        ...state,
        ids: action.payload.ids,
        labels: action.payload.labels,
        forms: action.payload.forms,
        // eslint-disable-next-line no-use-before-define
        notTraining: filterOutTrainingForms(action.payload.forms),
      };
    case types.SET_TRAINING_FORMS_INCLUSION:
      return {
        ...state,
        includeTraining: action.payload.includeTraining,
      };
    default:
      return state;
  }
};

function filterOutTrainingForms(forms) {
  const labels = [];
  const ids = [];
  const notTrainingForms = forms.filter(
    form => form.form_type_id !== FORM_TYPE.TRAINING,
  );
  notTrainingForms.forEach((form) => {
    labels.push(form.name);
    ids.push(form.id);
  });
  return { forms: notTrainingForms, labels, ids };
}
