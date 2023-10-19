import { v4 as uuidv4 } from 'uuid';

import { Reducer } from 'redux';
import { isEmpty } from 'lodash';
import {
  TQuestion, TStep, TAnswerExtraOptions, TAnswer,
} from '../../types/reminder';
import {
  answerReminderTypes,
  answerReminderState,
  ReminderInitialStateObject,
  AnswerKnockedOutPayload,
} from './types';
import { SNACKBAR_VARIANTS } from '../../helpers/consts';

const INITIAL_STATE: answerReminderState = {
  reminder: ReminderInitialStateObject,
  showLoading: false,
  failure: false,
  fillingStartDate: null,
  sendReminderResponseMessage: '',
  snackbar: false,
  snackbarVariant: '',
};

const reducer: Reducer<answerReminderState> = (
  state = INITIAL_STATE,
  action,
) => {
  let { steps } = state.reminder.form;
  let step;
  let answeredQuestion: TQuestion;
  let reminder;
  switch (action.type) {
    case answerReminderTypes.REQUEST_REMINDER_FOR_ANSWER:
      return {
        ...state,
        showLoading: true,
      };
    case answerReminderTypes.REQUEST_REMINDER_FOR_ANSWER_SUCCESS:
      return {
        ...state,
        reminder: action.payload.data,
        showLoading: false,
        failure: false,
      };

    case answerReminderTypes.REQUEST_REMINDER_FOR_ANSWER_FAILURE:
      return { ...state, showLoading: false, failure: true };

    case answerReminderTypes.REMOVE_KNOCKOUT_STEP:
      return {
        ...state,
        reminder: {
          ...state.reminder,
          form: {
            ...state.reminder.form,
            steps,
          },
        },
        showLoading: false,
        failure: false,
      };

    case answerReminderTypes.SEND_REMINDER:
      return {
        ...state,
        showLoading: true,
      };
    case answerReminderTypes.SEND_REMINDER_SUCCESS:
      reminder = { ...state.reminder, status: 'accomplished' };
      return {
        ...state,
        showLoading: false,
        failure: false,
        snackbar: true,
        snackbarVariant: SNACKBAR_VARIANTS.SUCCESS,
        reminder,
        sendReminderResponseMessage: action.payload,
      };
    case answerReminderTypes.SEND_REMINDER_FAILURE:
      reminder = state.reminder;
      reminder.form.steps.forEach(step => setIfSomeAnswerIsEmpty(step.questions));
      return {
        ...state,
        showLoading: false,
        snackbar: true,
        snackbarVariant: SNACKBAR_VARIANTS.ERROR,
        failure: true,
        sendReminderResponseMessage: action.payload,
      };
    case answerReminderTypes.START_FILLING:
      return {
        ...state,
        fillingStartDate: new Date(),
      };
    case answerReminderTypes.KNOCKOUT_STEP:
      return {
        ...state,
        reminder: {
          ...state.reminder,
          form: {
            ...state.reminder.form,
            steps,
          },
        },
        showLoading: false,
        failure: false,
      };

    case answerReminderTypes.SET_OBSERVATION:
      answeredQuestion = action.payload.answerQuestion;
      answeredQuestion.answer.observation = action.payload.observation;
      if (['multi', 'single'].includes(answeredQuestion.selection_type)) {
        answeredQuestion.missing_association = haveMissedAssociation(answeredQuestion.answer_extra_options, answeredQuestion.answer);
      };
      return {
        ...state,
        reminder: {
          ...state.reminder,
        },
        showLoading: false,
        failure: false,
      };

    case answerReminderTypes.SET_LOCATION:
      return {
        ...state,
        reminder: {
          ...state.reminder,
          location: action.payload,
        },
      };

    case answerReminderTypes.KNOCKOUT_FORM:
      answeredQuestion = action.payload.answerQuestion;
      reminder = state.reminder;
      reminder.form.hasKnockedOutQuestions = true;
      reminder.form.steps.forEach(step => {
        step.questions
          .filter(question => checkIfQuestionCanBeKnockedOut(question, answeredQuestion))
          .forEach(question => {
            step.hasKnockedOutQuestions = false;
            question.answer = { ...AnswerKnockedOutPayload };
          });
      });

      return {
        ...state,
        reminder: {
          ...state.reminder,
          form: {
            ...state.reminder.form,
            steps: reminder.form.steps,
          },
        },
        showLoading: false,
        failure: false,
      };

    case answerReminderTypes.CLEAR_QUESTION_ANSWER:
      answeredQuestion = action.payload.answerQuestion;
      const { clearStep } = action.payload;

      steps.forEach((step, stepKey) => {
        step.questions.forEach((question, questionKey) => {
          if (clearStep && clearStep.step_id === step.step_id) {
            steps[stepKey].questions[questionKey].answer = {} as TAnswer;
          }

          if (answeredQuestion && answeredQuestion.id === question.id) {
            steps[stepKey].questions[questionKey].answer = {} as TAnswer;
          }
        });
      });

      return {
        ...state,
        reminder: {
          ...state.reminder,
          form: {
            ...state.reminder.form,
            steps,
          },
        },
        showLoading: false,
        failure: false,
      };

    case answerReminderTypes.UPDATE_REMINDER_ANSWERS:
      const { answerType } = action.payload;
      answeredQuestion = action.payload.answerQuestion;
      steps = state.reminder.form.steps;
      if (answerType == 'select') {
        answeredQuestion.answer.selected_options = [
          ...action.payload.selectedOptions,
        ];
        if (!isEmpty(answeredQuestion.answer.selected_options)) {
          let isImageRequired = false;
          let isCommentRequired = false;
          let isPlanRequired = false;
          answeredQuestion.answer_options
            .forEach(option => {
              if (action.payload.selectedOptions.includes(option.id)) {
                isImageRequired = isImageRequired || option.is_image_required;
                isCommentRequired = isCommentRequired || option.is_comment_required;
                isPlanRequired = isPlanRequired || option.is_plan_required;
              } else {

              }
            });
          answeredQuestion.answer_extra_options = {
            is_comment_required: isCommentRequired,
            is_plan_required: isPlanRequired,
            is_image_required: isImageRequired,
          };
        }
        answeredQuestion.missing_association = haveMissedAssociation(answeredQuestion.answer_extra_options, answeredQuestion.answer);
        answeredQuestion.answer.dismissed = action.payload.shouldDismiss;
        const { form } = state.reminder;
        if (form.hasKnockedOutQuestions && hasNotAnyKnockedOutResponse(steps)) {
          delete form.hasKnockedOutQuestions;
          steps.forEach(step => {
            step.questions.forEach(question => {
              if (!step.hasKnockedOutQuestions && question.answer.knocked_out) { question.answer = {} as TAnswer; };
            });
          });
        }
      } else if (answerType == 'text') {
        answeredQuestion.answer.free_text = action.payload.valueTextArea;
      } else if (answerType == 'numeric') {
        answeredQuestion.answer.custom_value = action.payload.valueNumber;
      } else if (answerType == 'date') {
        if (action.payload.valueDate && action.payload.valueDate !== '') {
          answeredQuestion.answer.custom_date = action.payload.valueDate;
        } else {
          answeredQuestion.answer = {} as TAnswer;
        }
      } else if (answerType == 'image') {
        answeredQuestion.answer.uuid = `${answeredQuestion.id}${uuidv4()}`;
        answeredQuestion.answer.images = action.payload.images;
        answeredQuestion.missing_association = haveMissedAssociation(answeredQuestion.answer_extra_options, answeredQuestion.answer);
      }
      answeredQuestion.missing_answer = false;

      return {
        ...state,
        reminder: {
          ...state.reminder,
          form: {
            ...state.reminder.form,
            steps,
          },
        },
        showLoading: false,
        failure: false,
      };

    case answerReminderTypes.SET_EMPLOYEE:
      const newEmployee = action.payload.data
        ? { id: action.payload.data.value, label: action.payload.data.label, name: action.payload.data.label } : {};
      return {
        ...state,
        reminder: {
          ...state.reminder,
          form: {
            ...state.reminder.form,
            selected_company_employee: newEmployee,
          },
        },
        showLoading: false,
        failure: false,
      };

    case answerReminderTypes.CLOSE_SNACKBAR:
      return {
        ...state,
        showLoading: false,
        failure: false,
        sendReminderResponseMessage: '',
        snackbar: false,
        snackbarVariant: '',
      };

    case answerReminderTypes.SET_PLAN: {
      answeredQuestion = action.payload.answerQuestion;
      answeredQuestion.answer.plan = action.payload.plan;
      if (['multi', 'single'].includes(answeredQuestion.selection_type)) {
        answeredQuestion.missing_association = haveMissedAssociation(answeredQuestion.answer_extra_options, answeredQuestion.answer);
      };
      return {
        ...state,
        showLoading: false,
        failure: false,
      };
    };

    case answerReminderTypes.CLEAR_REMINDER_ANSWERS: {
      return INITIAL_STATE;
    };

    default:
      return state;
  }
};

const hasNotAnyKnockedOutResponse = (steps: Array<TStep>) => {
  let hasFormKnockoutChecked = true;
  steps.forEach(step => {
    if (hasFormKnockoutChecked === false) {
      return;
    }

    hasFormKnockoutChecked = hasFormKnockoutChecked && hasAnyKnockoutAnswerOnStep(step);
  });

  return hasFormKnockoutChecked;
};

const haveMissedAssociation = (answer_extra_options: TAnswerExtraOptions, answer: TAnswer) => (!answer.observation && answer_extra_options?.is_comment_required)
  || (!answer.plan && answer_extra_options?.is_plan_required)
  || (!answer.images && answer_extra_options?.is_image_required);

const hasAnyKnockoutAnswerOnStep = (step: TStep) => {
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
export default reducer;

const setIfSomeAnswerIsEmpty = questions => {
  questions.forEach(question => {
    if (!question.answer || isEmpty(question.answer)) {
      question.missing_answer = true;
    }
  });
};
