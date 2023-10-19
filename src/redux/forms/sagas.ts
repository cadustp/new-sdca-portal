import {
  takeLatest, put, call, select,
} from 'redux-saga/effects';
import { AnyAction } from 'redux';
import { v4 as uuid } from 'uuid';
import apiService from '../../services/apiService';
import { RESPONSE_STATUS, SELECTION_TYPES, SHARE_MODE } from '../../helpers/consts';
import { sortOrderAscending } from '../../helpers/utils';

import {
  Answer, AnswerOptionErrors, formsTypes, Question, QuestionErrors, newOptionTemplate,
} from './types';
import {
  loadAllFormsResponse,
  deleteFormResponse,
  loadFormResponse,
  loadAllFormsRequest,
  clearFormSettings,
  setSaveFormErrors,
  saveFormResponse,
  editQuestion,
  editAnswerType,
  editOption,
  loadAvailableUsersResponse,
} from './actions';
import { captureEvent } from '../../analytics';
import {
  reduceErrors, stepValidator, validatesAnswerError, validatesQuestionError,
} from '../../helpers/validation';
import { SharingFormDataUserRoute } from '../../services/routesService';

const mapAnswers = answersOptions => {
  const mappedAnswers = answersOptions.map(questionOption => ({
    id: questionOption.id,
    answer: questionOption.option_text,
    weight: questionOption.weight,
    order: questionOption.order,
    shouldDismiss: questionOption.should_dismiss,
    is_knockout_form: questionOption.is_knock_out_form,
    is_knockout_step: questionOption.is_knock_out_step,
    isCommentRequired: questionOption.is_comment_required,
    isImageRequired: questionOption.is_image_required,
    isPlanRequired: questionOption.is_plan_required,
    key: questionOption.id,
    errors: {},
  })).sort(sortOrderAscending);
  return mappedAnswers;
};

const mapQuestions = questions => {
  const mappedQuestions = questions.map(question => ({
    question: question.question,
    key: question.id,
    id: question.id,
    order: question.order,
    observations: question.description || '',
    selectionType: question.selection_type,
    points: question.weight,
    errors: {},
    answerOptions: mapAnswers(question.question_options),
  })).sort(sortOrderAscending);
  return mappedQuestions;
};

const mapSteps = steps => {
  const mappedSteps = steps.map(step => ({
    id: step.id,
    title: step.name,
    key: step.id,
    order: step.order,
    errors: {},
    questions: mapQuestions(step.questions),
  }));
  return mappedSteps;
};

const mapForm = formData => {
  const form = {
    id: formData.id ?? undefined,
    name: formData.name,
    conditionTriggersObject: formData.condition_triggers_object,
    description: formData.description,
    attachments: formData.attachments,
    externalLink: formData.external_link,
    attachedForm: formData.form_id,
    mandatoryApproval: formData.mandatory_approval,
    evaluatedRequired: formData.has_required_valuated,
    calcResult: formData.has_final_score,
    geolocation: formData.geolocation_required,
    sharedUsers: formData.users_with_access,
    publicLink: {
      descriptionRequired: formData.public_link_setting?.description_required,
      uuid: formData?.public_link_setting.uuid,
      active: formData?.public_link_setting.active,
      authRequired: formData.public_link_setting?.authentication_required,
      afterMessage: formData.public_link_setting?.after_message,
      afterImageLink: formData.public_link_setting?.after_image_link,
      afterImageRedirect: formData.public_link_setting?.after_image_redirect,
      customDomain: formData.public_link_setting?.custom_domain,
      customPasswordRequired: formData.public_link_setting?.custom_password_required,
      customPassword: '',
    },
    version: formData.version,
    createdAt: '',
    steps: mapSteps(formData.steps),
    // TODO: Alterar aqui quando estiver definido como será a flag.
    shareMode: SHARE_MODE.SYSTEM_USERS,
  };
  return form;
};

const mapAnswerOptionsErrors = (answerOptions, questionErrors) => {
  const mappedAnswerOptions = answerOptions.map(
    (answerOption, answerOptionIndex) => {
      const answerOptionsErrors = questionErrors.answerOptions?.[answerOptionIndex] || ({} as AnswerOptionErrors);

      return {
        ...answerOption,
        errors: answerOptionsErrors,
      };
    },
  );
  return mappedAnswerOptions;
};

const mapQuestionsErrors = (questions, stepErrors) => {
  const mappedQuestions = questions.map(
    (question, questionIndex) => {
      const questionErrors = stepErrors.questions?.[questionIndex] || ({} as QuestionErrors);
      question.answerOptions = mapAnswerOptionsErrors(question.answerOptions, questionErrors);

      return {
        ...question,
        errors: questionErrors,
      };
    },
  );
  return mappedQuestions;
};

const mapStepErrors = (steps, errors) => {
  const mappedSteps = steps.map(
    (step, stepIndex) => {
      const stepErrors = errors[stepIndex];
      step.questions = mapQuestionsErrors(step.questions, stepErrors);

      return {
        ...step,
        errors: stepErrors,
      };
    },
  );
  return mappedSteps;
};

const setValidationErrors = (form, errors) => {
  const formSteps = mapStepErrors(form.steps, errors);
  return formSteps;
};

const publicLinkObject = form => {
  if (!form?.publicLink?.active) return null;

  return {
    description_required: form?.publicLink.descriptionRequired,
    uuid: form?.publicLink.uuid,
    active: form?.publicLink.active,
    after_message: form?.publicLink.afterMessage,
    after_image_link: form?.publicLink.afterImageLink,
    after_image_redirect: form?.publicLink.afterImageRedirect,
    custom_domain: form?.publicLink.customDomain,
    authentication_required: form?.publicLink.authRequired,
    custom_password_required: form?.publicLink.customPasswordRequired,
    custom_password: form?.publicLink.customPassword,
  };
};

const formatForm = form => {
  const mappedForm = ({
    id: form.id ?? undefined,
    name: form.name,
    description: form.description,
    condition_triggers_object: JSON.stringify(form.conditionTriggersObject),
    has_final_score: form.calcResult,
    mandatory_approval: form.mandatoryApproval,
    has_required_valuated: form.evaluatedRequired,
    geolocation_required: form.geolocation,
    attachments: form.attachments,
    users_with_access: form.shareMode === SHARE_MODE.SYSTEM_USERS ? form.sharedUsers?.map(user => user.id) : [],
    form_id: form.attachedForm,
    external_link: form.externalLink,
    version: form.version,
    public_link: form.shareMode === SHARE_MODE.PUBLIC_LINK ? publicLinkObject(form) : null,
    steps: form.steps?.map((step, stepIndex) => ({
      id: step.id ?? undefined,
      name: step.title,
      order: stepIndex + 1,
      questions: step.questions?.map((question: Question, questionIndex) => ({
        id: question.id ?? undefined,
        order: questionIndex + 1,
        question: question.question,
        selection_type: question.selectionType,
        description: question.observations.length
          ? question.observations
          : null,
        weight: Number(question.points),
        question_options: question.answerOptions?.map(
          (answerOption: Answer, index) => ({
            order: index + 1,
            id: answerOption.id ?? undefined,
            weight: Number(answerOption.weight),
            should_dismiss: answerOption.shouldDismiss,
            is_knock_out_form: answerOption.is_knockout_form,
            is_knock_out_step: answerOption.is_knockout_step,
            option_text: answerOption.answer,
            is_comment_required: answerOption.isCommentRequired,
            is_image_required: answerOption.isImageRequired,
            is_plan_required: answerOption.isPlanRequired,
          }),
        ),
      })),
    })),
  });
  return mappedForm;
};

export function* loadAllFormsRequestSagas({
  payload,
}: AnyAction) {
  try {
    const url = '/forms/active';
    const { data } = yield call(apiService.get, url);

    yield put(loadAllFormsResponse({
      forms: data,
    }));
    return true;
  } catch (error) {
    yield put(loadAllFormsResponse({
      errorMessage: error.response.data.message,
    }));
  }
}

export function* loadForm({
  payload,
}: AnyAction) {
  try {
    const url = `/forms/${payload.formId}`;
    const { data } = yield call(apiService.get, url);

    const form = mapForm(data);
    yield put(loadFormResponse({ form, status: RESPONSE_STATUS.SUCCESS }));
  } catch (error) {
    yield put(loadFormResponse({ status: RESPONSE_STATUS.FAILURE }));
  }
}

export function* deleteFormRequest({
  payload,
}: AnyAction) {
  try {
    if (payload) {
      const url = '/forms/delete';
      const body = { data: { ids: [payload] } };
      const { data } = yield call(apiService.post, url, body);

      yield put(loadAllFormsRequest());
    }
    yield put(clearFormSettings());
    yield put(deleteFormResponse({ status: RESPONSE_STATUS.SUCCESS }));
    captureEvent('confirmDeleteForms', { status: 'success' });
    return true;
  } catch (error) {
    yield put(deleteFormResponse({
      status: RESPONSE_STATUS.FAILURE,
      error: error.message,
    }));
    captureEvent('confirmDeleteForms', { status: 'error', error: error.message });
  }
}

function* setAttachmentsRequest(formId, formattedForm) {
  const formData = new FormData();
  formattedForm.attachments.forEach(attachment => {
    const fileUrl = attachment.url;
    formData.append('urls[]', JSON.stringify({ url: fileUrl, file_name: attachment.file.name }));
    if (!fileUrl.includes('s3.us-west-2.amazonaws.com')) {
      formData.append(`data[${fileUrl}]`, attachment.file, attachment.file.name);
    };
  });
  const url = `forms/${formId}/set_attachments`;
  yield call(apiService.put, url, formData);
}

function* saveFormRequest() {
  try {
    const form = yield select(state => state.forms.form);
    const formattedForm = formatForm(form);
    const url = form.id ? `/forms/${form.id}` : '/forms';
    const { status, data } = yield call(form.id ? apiService.put : apiService.post, url, { data: formattedForm });
    if (status === 200) { yield setAttachmentsRequest(data?.id, formattedForm); };

    yield put(saveFormResponse({ status: RESPONSE_STATUS.SUCCESS, title: data?.name }));
  } catch (e) {
    yield put(saveFormResponse({ status: RESPONSE_STATUS.FAILURE, error: e.message }));
  }
}

export function* saveForm({
  payload,
}: AnyAction) {
  try {
    const form = yield select(state => state.forms.form);
    const validation = reduceErrors(form.steps, form.calcResult, stepValidator);
    if (validation.errorCount > 0) {
      captureEvent(form?.id ? 'saveEditForm' : 'saveCreateForm', { status: 'error', error: 'validationErrors' });
      const steps = setValidationErrors(form, validation.errors);
      yield put(setSaveFormErrors({ steps }));
    } else {
      yield call(saveFormRequest);
    }
  } catch (error) {
    yield put(loadFormResponse({ status: RESPONSE_STATUS.FAILURE }));
  }
}

export function* editQuestionField({
  payload: {
    stepIndex, questionIndex, field, value,
  },
}: AnyAction) {
  const form = JSON.parse(JSON.stringify(yield select(state => state.forms.form)));
  const question = form.steps[stepIndex].questions[questionIndex];

  if (question[field] === value) return;
  question[field] = value;
  const error = validatesQuestionError(question, form.calcResult, field);
  question.errors[field] = error;

  yield put(
    editQuestion({ steps: form.steps }),
  );
}

export function* selectAnswerType({
  payload: {
    answerType,
    field,
  },
}: AnyAction) {
  const form = JSON.parse(JSON.stringify(yield select(state => state.forms.form)));
  const { stepIndex, questionIndex } = yield select(state => state.forms.answerType);
  const question = form.steps[stepIndex].questions[questionIndex];

  if (question[field] === answerType) return;
  question[field] = answerType;

  const error = validatesQuestionError(question, form.calcScore, field);
  const removeOptions = ![SELECTION_TYPES.SINGLE, SELECTION_TYPES.MULTI].includes(answerType);
  question.errors[field] = error;

  if (removeOptions) question.answerOptions = [];
  else if (!removeOptions && !question.answerOptions.length) {
    question.answerOptions = new Array(3).fill(newOptionTemplate);
  }

  yield put(
    editAnswerType({ steps: form.steps }),
  );
}

export function* editAnswerOption({
  payload: {
    stepIndex, questionIndex, optionIndex, field, value,
  },
}: AnyAction) {
  const form = JSON.parse(JSON.stringify(yield select(state => state.forms.form)));
  const question = form.steps[stepIndex].questions[questionIndex];
  const answerOption = question.answerOptions[optionIndex];

  if (answerOption[field] === value) return;
  answerOption[field] = value;

  const error = validatesAnswerError(answerOption, form.calcResult, field);
  answerOption.errors[field] = error;

  yield put(
    editOption({ steps: form.steps }),
  );
}

export function* duplicateForm({
  payload,
}: AnyAction) {
  try {
    const url = `/forms/${payload.formId}`;
    const { data } = yield call(apiService.get, url);

    const form = mapForm(data);

    const duplicatedForm = ({
      ...form,
      id: undefined,
      name: `${form.name} - Clone`,
      shareMode: '',
      sharedUsers: [],
      steps: form.steps.map(step => ({
        ...step,
        id: undefined,
        key: `question-${uuid()}`,
        order: undefined,
        questions: step.questions.map(question => ({
          ...question,
          key: `question-${uuid()}`,
          id: undefined,
          answerOptions: question.answerOptions.map(answerOption => ({
            ...answerOption, key: `question-${uuid()}`, id: undefined,
          })),
        })),
      })),
    });
    yield put(loadFormResponse({ form: duplicatedForm, status: RESPONSE_STATUS.SUCCESS, isAClone: true }));
  } catch (error) {
    yield put(loadFormResponse({ status: RESPONSE_STATUS.FAILURE, error: error.message }));
  }
}

export function* loadAvailableUsers() {
  try {
    const userId = yield select(state => state.login.information.id);

    const response = yield call(apiService.get, SharingFormDataUserRoute(userId));

    const users = response?.data?.users_to_share.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
    }));

    yield put(loadAvailableUsersResponse({ users, failure: false }));
  } catch (e) {
    yield put(loadAvailableUsersResponse({ users: [], failure: true }));
  }
}

export default [
  takeLatest(
    formsTypes.LOAD_ALL_FORMS_REQUEST,
    loadAllFormsRequestSagas,
  ),
  takeLatest(
    formsTypes.LOAD_FORM,
    loadForm,
  ),
  takeLatest(
    formsTypes.DELETE_FORM_REQUEST,
    deleteFormRequest,
  ),
  takeLatest(
    formsTypes.SAVE_FORM,
    saveForm,
  ),
  takeLatest(
    formsTypes.EDIT_QUESTION_FIELD,
    editQuestionField,
  ),
  takeLatest(
    formsTypes.SELECT_ANSWER_TYPE,
    selectAnswerType,
  ),
  takeLatest(
    formsTypes.EDIT_ANSWER_OPTION,
    editAnswerOption,
  ),
  takeLatest(
    formsTypes.DUPLICATE_FORM,
    duplicateForm,
  ),
  takeLatest(
    formsTypes.LOAD_AVAILABLE_USERS,
    loadAvailableUsers,
  ),
];
