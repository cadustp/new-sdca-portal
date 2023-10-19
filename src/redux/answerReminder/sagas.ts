import {
  takeLatest, put, call, select,
} from 'redux-saga/effects';
import { AnyAction } from 'redux';
import { isEmpty } from 'lodash';
import useStepRenderVerifier from 'src/services/conditional/useStepRenderVerifier';
import { answerReminderTypes } from './types';
import apiService from '../../services/apiService';

import {
  requestReminderForAnswerSuccess,
  searchAppUserRemindersFailure,
  setObservation,
  setLocation,
  sendReminderSuccess,
  sendReminderFailure,
  closeSnackbar,
  setPlan,
} from './actions';
import { imagesRoute, sendAnswersRoute } from '../../services/routesService';
import { TQuestion } from '../../types/reminder';
import { captureEvent } from '../../analytics';

function payloadModelForAnswer(answer) {
  return {
    ...answer,
    custom_date: answer.custom_date ? answer.custom_date._d : null,
    plan: answer.plan ? { ...answer.plan, anomalies: (answer?.plan?.anomalies ? [answer.plan.anomalies] : []) } : null,
  };
};

export function* generatePdf({ payload }: AnyAction) {
  try {
    const url = `app_users/${payload.appUserId}/reminders/${payload.reminderId}/generate_answers_pdf`;
    const data = yield call(apiService.get, url);
    const win: any = window.open(Date.now().toString());
    win.document.write(data.data);
  } catch {
    yield put(sendReminderFailure('Ocorreu um erro no download do PDF'));
  };
};

export function* requestReminderForAnswer({ payload }: AnyAction) {
  try {
    const url = `app_users/${payload.app_user_id}/forms_skeletons/${payload.id}`;
    const { data } = yield call(apiService.get, url);

    yield put(
      requestReminderForAnswerSuccess({
        payload: data,
      }),
    );
  } catch (error) {
    yield put(searchAppUserRemindersFailure());
  }
}

export function* sendReminder({ payload }: AnyAction) {
  const { reminder } = payload;

  const fillingStartDate = yield select(state => state.answerReminder.fillingStartDate);
  const questions = reminder.form.steps.map(step => step.questions).flat(1);

  if (!setIfSomeAnswerIsEmpty(reminder.form)) {
    const { data } = yield sendAnswers(reminder, questions, fillingStartDate);
    if (data.status === 0) {
      yield sendImages(questions);
      yield put(sendReminderSuccess(data.message));
      captureEvent('submitAnswer', { status: 'success' });
    } else {
      yield put(sendReminderFailure(data.message));
      captureEvent('submitAnswer', { status: 'error', error: data.message });
    }
  } else {
    captureEvent('submitAnswer', { status: 'error', error: 'hasEmptyQuestions' });
    yield put(sendReminderFailure('emptyQuestions'));
  }
};

function checkEmptyDefaultAnswer({ steps }) {
  let haveSomeEmptyAnswer = false;

  steps.forEach((step, stepKey) => {
    step.questions.forEach((question, questionKey) => {
      if (!question.answer || isEmpty(question.answer) || question.missing_association) {
        haveSomeEmptyAnswer = true;
      }
    });
  });
  return haveSomeEmptyAnswer;
}

function checkEmptyAnswerConditionalForms({ steps, condition_triggers_object }) {
  let haveSomeEmptyAnswer = false;

  steps.forEach((step, stepKey) => {
    const { hideStep, questions } = useStepRenderVerifier({ conditionalObject: condition_triggers_object, stepKey, steps });

    if (!hideStep) {
      questions.forEach((question, questionKey) => {
        if (!question.shouldHide) {
          if (!question.answer || isEmpty(question.answer) || question.missing_association) {
            haveSomeEmptyAnswer = true;
          }
        }
      });
    }
  });

  return haveSomeEmptyAnswer;
}

function setIfSomeAnswerIsEmpty({ steps, condition_triggers_object }): boolean {
  const hasConditionTriggers = condition_triggers_object && Object.keys(condition_triggers_object).length;

  if (hasConditionTriggers) {
    return checkEmptyAnswerConditionalForms({ steps, condition_triggers_object });
  }
  return checkEmptyDefaultAnswer({ steps });
};

function* sendAnswers(reminder, questions, fillingStartDate) {
  const reminderPayload = {
    id: null,
    form: {},
    filling_start_date: fillingStartDate,
    location: {},
  };
  reminderPayload.id = reminder.id;
  reminderPayload.form = {
    id: reminder.form.id,
    selected_company_employee: reminder.form?.selected_company_employee ? reminder.form.selected_company_employee : null,
    questions: questions.map(question => ({ id: question.id, ...payloadModelForAnswer(question.answer) })),
  };
  reminderPayload.location = reminder.location;
  return (yield call(apiService.post, sendAnswersRoute, reminderPayload));
};

function* sendImages(questions) {
  const formData = new FormData();
  let imagesAmount = 0;
  questions.forEach(question => {
    const answer = question?.answer;
    if (answer === undefined || !answer.hasOwnProperty('uuid') || answer.knocked_out === true || answer.images === []) {
      return;
    }
    answer.images.forEach(image => {
      formData.append(`${answer.uuid}[]`, image.file, 'original');
      imagesAmount++;
    });
    ;
  });
  let response = { status: 200 };
  if (formData.entries().next().done === false) {
    response = yield call(apiService.post, imagesRoute, formData);
    captureEvent('submitAnswerImages', { status: response.status, totalImages: imagesAmount });
  };
  return response.status;
};

export default [
  takeLatest(
    answerReminderTypes.REQUEST_REMINDER_FOR_ANSWER,
    requestReminderForAnswer,
  ),
  takeLatest(
    answerReminderTypes.SET_OBSERVATION,
    setObservation,
  ),
  takeLatest(
    answerReminderTypes.SET_LOCATION,
    setLocation,
  ),
  takeLatest(
    answerReminderTypes.SEND_REMINDER,
    sendReminder,
  ),
  takeLatest(
    answerReminderTypes.CLOSE_SNACKBAR,
    closeSnackbar,
  ),
  takeLatest(
    answerReminderTypes.SET_PLAN,
    setPlan,
  ),
  takeLatest(
    answerReminderTypes.GENERATE_PDF,
    generatePdf,
  ),
];
