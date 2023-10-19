import { action } from 'typesafe-actions';
import { publicAnswerTypes } from './types';

export const loadFormRequest = formId => action(publicAnswerTypes.LOAD_FORM_REQUEST, formId);
export const loadAuthenticationRequiredRequest = formId => action(publicAnswerTypes.LOAD_AUTHENTICATION_REQUIRED_REQUEST, formId);
export const loadFormResponse = response => action(publicAnswerTypes.LOAD_FORM_RESPONSE, response);
export const updateFormAnswers = payload => action(publicAnswerTypes.UPDATE_FORM_ANSWERS, payload);
export const knockoutStep = payload => action(publicAnswerTypes.PUBLIC_KNOCKOUT_STEP, payload);
export const removeKnockoutStep = payload => action(publicAnswerTypes.REMOVE_PUBLIC_KNOCKOUT_STEP, payload);
export const knockoutForm = payload => action(publicAnswerTypes.PUBLIC_KNOCKOUT_FORM, payload);
export const sendPublicAnswer = payload => action(publicAnswerTypes.SEND_PUBLIC_ANSWER, payload);
export const sendPublicAnswerResponse = message => action(publicAnswerTypes.SEND_PUBLIC_ANSWER_RESPONSE, message);
export const setQuestionObservation = payload => action(publicAnswerTypes.SET_QUESTION_OBSERVATION, payload);
export const setPlan = payload => action(publicAnswerTypes.SET_PLAN, payload);
export const clearStatus = () => action(publicAnswerTypes.CLEAR_STATUS);
export const clearLoadingErrors = () => action(publicAnswerTypes.CLEAR_LOADING_ERRORS);
export const publicLinkPlanUsersRequest = payload => action(publicAnswerTypes.PUBLIC_LINK_PLAN_USERS_REQUEST, payload);
export const publicLinkPlanUsersResponse = response => action(publicAnswerTypes.PUBLIC_LINK_PLAN_USERS_RESPONSE, response);
