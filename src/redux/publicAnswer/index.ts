import { Reducer } from 'redux';
import { isEmpty } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { PublicAnswerState, publicAnswerTypes, FormObject } from './types';
import { TAnswer, TQuestion } from '../../types/reminder';
import { AnswerKnockedOutPayload } from '../answerReminder/types';

const INITIAL_STATE: PublicAnswerState = {
  form: FormObject,
  isLoading: false,
  status: '',
  message: '',
  formActive: false,
  planUsers: [],
  afterMessage: '',
  afterImageLink: '',
  afterImageRedirect: '',
  isAccomplished: false,
  isAuthenticated: false,
  customPasswordRequired: false,
  requireAuth: false,
  userId: 0,
  loadingError: '',
};

const haveMissedAssociation = (answer_extra_options, answer) => (!answer.observation && answer_extra_options?.is_comment_required)
  || (!answer.plan && answer_extra_options?.is_plan_required)
  || (!answer.images && answer_extra_options?.is_image_required);

const hasAnyKnockoutAnswerOnStep = step => {
  const allSelectedOptions = step.questions
    .filter(question => ['multi', 'single'].includes(question.selection_type))
    .map(question => question.answer.selected_options)
    .flat();
  const allSelectedAnswerOptions = step.questions
    .map(question => question.answer_options.filter(
      answer_option => answer_option.is_knock_out_form === true
          && allSelectedOptions.includes(answer_option.id),
    ))
    .flat();
  return allSelectedAnswerOptions.length <= 0;
};

const hasNotAnyKnockedOutResponse = steps => {
  let hasFormKnockoutChecked = true;
  steps.forEach(step => {
    if (hasFormKnockoutChecked === false) {
      return;
    }
    hasFormKnockoutChecked = hasFormKnockoutChecked && hasAnyKnockoutAnswerOnStep(step);
  });
  return hasFormKnockoutChecked;
};

const removeFormKnockout = (form, steps) => {
  delete form.hasKnockedOutQuestions;
  steps.forEach(step => {
    step.questions.forEach(question => {
      if (!step.hasKnockedOutQuestions && question.answer.knocked_out) { question.answer = {}; };
    });
  });
};

const updateAnswers = (payload, answerType, steps, form, userIsAuthenticated) => {
  const { answerQuestion } = payload;
  switch (answerType) {
    case 'select':
      answerQuestion.answer.selected_options = [
        ...payload.selectedOptions,
      ];
      if (!isEmpty(answerQuestion.answer.selected_options)) {
        let isPlanRequired = false;
        let isImageRequired = false;
        let isCommentRequired = false;
        answerQuestion.answer_options
          .forEach(option => {
            if (payload.selectedOptions.includes(option.id)) {
              isImageRequired = isImageRequired || option.is_image_required;
              isCommentRequired = isCommentRequired || option.is_comment_required;
              if (userIsAuthenticated) isPlanRequired = isPlanRequired || option.is_plan_required;
            };
          });
        answerQuestion.answer_extra_options = {
          is_comment_required: isCommentRequired,
          is_plan_required: isPlanRequired,
          is_image_required: isImageRequired,
        };
      }
      answerQuestion.missing_association = haveMissedAssociation(answerQuestion.answer_extra_options, answerQuestion.answer);
      answerQuestion.answer.dismissed = payload.shouldDismiss;
      if (form.hasKnockedOutQuestions && hasNotAnyKnockedOutResponse(steps)) { removeFormKnockout(form, steps); }
      break;
    case 'text':
      answerQuestion.answer.free_text = payload.valueTextArea;
      break;
    case 'numeric':
      answerQuestion.answer.custom_value = payload.valueNumber;
      break;
    case 'date':
      if (payload.valueDate !== '') {
        answerQuestion.answer.custom_date = payload.valueDate;
      } else {
        answerQuestion.answer = {} as TAnswer;
      }
      break;
    case 'image':
      answerQuestion.answer.uuid = `${answerQuestion.id}${uuidv4()}`;
      answerQuestion.answer.images = payload.images;
      answerQuestion.missing_association = haveMissedAssociation(answerQuestion.answer_extra_options, answerQuestion.answer);
      break;
    default:
      break;
  }
  answerQuestion.missing_answer = false;
};

const checkIfQuestionCanBeKnockedOut = (
  question: TQuestion,
  knockOutQuestion: TQuestion,
) => {
  if (question.step_number === null || question.order === null) {
    return false;
  }
  return (
    question.step_number > knockOutQuestion.step_number
      || (question.step_number === knockOutQuestion.step_number
        && question.order > knockOutQuestion.order)
  );
};

const knockOutForm = (payload, form) => {
  const { answerQuestion } = payload;
  form.hasKnockedOutQuestions = true;
  form.steps.forEach(step => {
    step.questions
      .filter(question => checkIfQuestionCanBeKnockedOut(question, answerQuestion))
      .forEach(question => {
        step.hasKnockedOutQuestions = false;
        question.answer = { ...AnswerKnockedOutPayload };
      });
  });
};

const setIfSomeAnswerIsEmpty = questions => {
  questions.forEach(question => {
    if (!question.answer || isEmpty(question.answer)) {
      question.missing_answer = true;
    }
  });
};

const setObservation = (answerQuestion, payload) => {
  answerQuestion.answer.observation = payload.observation;
  if (['multi', 'single'].includes(answerQuestion.selection_type)) {
    answerQuestion.missing_association = haveMissedAssociation(
      answerQuestion.answer_extra_options, answerQuestion.answer,
    );
  };
};

const reducer: Reducer<PublicAnswerState> = (state = INITIAL_STATE, action) => {
  const { form } = state;
  const { steps } = state.form;
  switch (action.type) {
    case publicAnswerTypes.LOAD_AUTHENTICATION_REQUIRED_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case publicAnswerTypes.LOAD_FORM_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case publicAnswerTypes.LOAD_FORM_RESPONSE:
      return {
        ...state,
        form: action.payload.form,
        formActive: action?.payload?.formActive ?? true,
        requireAuth: action.payload.requireAuth ?? state.requireAuth,
        customPasswordRequired: action.payload.customPasswordRequired ?? state.customPasswordRequired,
        isAuthenticated: action.payload.isAuthenticated,
        userId: action.payload.userId ?? state.userId,
        loadingError: action.payload.loadingError ?? state.loadingError,
        isLoading: false,
      };
    case publicAnswerTypes.UPDATE_FORM_ANSWERS: {
      const { answerType } = action.payload;
      const userIsAuthenticated = (action.payload.requireAuth ?? state.requireAuth) && (action.payload.isAuthenticated ?? state.isAuthenticated);
      updateAnswers(action.payload, answerType, steps, form, userIsAuthenticated);
      return {
        ...state,
        form: {
          ...state.form,
          steps,
        },
        isLoading: false,
      };
    }
    case publicAnswerTypes.PUBLIC_KNOCKOUT_STEP:
      return {
        ...state,
        form: {
          ...state.form,
          steps,
        },
        isLoading: false,
      };
    case publicAnswerTypes.PUBLIC_LINK_PLAN_USERS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case publicAnswerTypes.PUBLIC_LINK_PLAN_USERS_RESPONSE:
      const { users } = action.payload;
      return {
        ...state,
        planUsers: users,
        isLoading: false,
      };
    case publicAnswerTypes.REMOVE_PUBLIC_KNOCKOUT_STEP:
      return {
        ...state,
        form: {
          ...state.form,
          steps,
        },
        isLoading: false,
      };
    case publicAnswerTypes.PUBLIC_KNOCKOUT_FORM:
      knockOutForm(action.payload, form);
      return {
        ...state,
        form: {
          ...state.form,
          steps: form.steps,
        },
        isLoading: false,
        failure: false,
      };
    case publicAnswerTypes.SEND_PUBLIC_ANSWER:
      form.steps.forEach(step => setIfSomeAnswerIsEmpty(step.questions));
      return {
        ...state,
        isLoading: true,
      };
    case publicAnswerTypes.SEND_PUBLIC_ANSWER_RESPONSE:
      return {
        ...state,
        isLoading: false,
        status: action.payload.status,
        message: action.payload.message,
        afterMessage: action.payload.afterMessage,
        afterImageLink: action.payload.afterImageLink,
        afterImageRedirect: action.payload.afterImageRedirect,
        isAccomplished: action.payload.isAccomplished,
      };
    case publicAnswerTypes.CLEAR_STATUS:
      return {
        ...state,
        isLoading: false,
        status: '',
        message: '',
        afterMessage: '',
        afterImageLink: null,
        afterImageRedirect: null,
      };
    case publicAnswerTypes.SET_PLAN:
      const answeredQuestion = action.payload.answerQuestion;
      answeredQuestion.answer.plan = action.payload.plan;
      if (['multi', 'single'].includes(answeredQuestion.selection_type)) {
        answeredQuestion.missing_association = haveMissedAssociation(answeredQuestion.answer_extra_options, answeredQuestion.answer);
      };
      return {
        ...state,
        showLoading: false,
        failure: false,
      };
    case publicAnswerTypes.CLEAR_LOADING_ERRORS:
      return {
        ...state,
        isLoading: false,
        loadingError: INITIAL_STATE.loadingError,
        userId: INITIAL_STATE.userId,
        isAuthenticated: INITIAL_STATE.isAuthenticated,
      };
    case publicAnswerTypes.SET_QUESTION_OBSERVATION:
      const { answerQuestion } = action.payload;
      setObservation(answerQuestion, action.payload);
      return {
        ...state,
        form: {
          ...state.form,
        },
        showLoading: false,
        failure: false,
      };
    default:
      return state;
  }
};

export default reducer;
