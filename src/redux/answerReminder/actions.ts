import { action } from 'typesafe-actions';
import { answerReminderTypes } from './types';

export const requestReminderForAnswer = reminder_id => action(answerReminderTypes.REQUEST_REMINDER_FOR_ANSWER, reminder_id);

export const requestReminderForAnswerSuccess = ({ payload: data }) => action(answerReminderTypes.REQUEST_REMINDER_FOR_ANSWER_SUCCESS, {
  data,
});

export const setEmployee = ({ payload: data }) => action(answerReminderTypes.SET_EMPLOYEE, {
  data,
});

export const updateReminderAnswers = payload => action(answerReminderTypes.UPDATE_REMINDER_ANSWERS, payload);

export const clearQuestionAnswer = payload => action(answerReminderTypes.CLEAR_QUESTION_ANSWER, payload);

export const knockoutStep = payload => action(answerReminderTypes.KNOCKOUT_STEP, payload);

export const knockoutForm = payload => action(answerReminderTypes.KNOCKOUT_FORM, payload);

export const removeKnockoutStep = payload => action(answerReminderTypes.REMOVE_KNOCKOUT_STEP, payload);

export const setObservation = payload => action(answerReminderTypes.SET_OBSERVATION, payload);

export const setLocation = payload => action(answerReminderTypes.SET_LOCATION, payload);

export const searchAppUserRemindersFailure = () => action(answerReminderTypes.REQUEST_REMINDER_FOR_ANSWER_FAILURE);

export const sendReminder = payload => action(answerReminderTypes.SEND_REMINDER, payload);

export const sendReminderSuccess = message => action(answerReminderTypes.SEND_REMINDER_SUCCESS, message);

export const sendReminderFailure = sendReminderResponseMessage => action(answerReminderTypes.SEND_REMINDER_FAILURE, sendReminderResponseMessage);

export const startFilling = () => action(answerReminderTypes.START_FILLING);

export const closeSnackbar = () => action(answerReminderTypes.CLOSE_SNACKBAR);

export const clearReminderAnswers = () => action(answerReminderTypes.CLEAR_REMINDER_ANSWERS);

export const setPlan = payload => action(answerReminderTypes.SET_PLAN, payload);

export const generatePdf = payload => action(answerReminderTypes.GENERATE_PDF, payload);
