import {
  takeLatest, put, call, select,
} from 'redux-saga/effects';
import { AnyAction } from 'redux';
import { isEmpty } from 'lodash';
import apiService from '../../services/apiService';
import { RESPONSE_STATUS } from '../../helpers/consts';
import { publicAnswerTypes } from './types';
import {
  loadFormResponse,
  sendPublicAnswerResponse,
  publicLinkPlanUsersResponse,
} from './actions';
import { TQuestion } from '../../types/reminder';

function setIfSomeAnswerIsEmpty(questions: Array<TQuestion>): boolean {
  let haveSomeEmptyAnswer = false;
  questions.forEach(question => {
    if (!question.answer || isEmpty(question.answer) || question.missing_association) {
      haveSomeEmptyAnswer = true;
    }
  });
  return haveSomeEmptyAnswer;
};

function payloadModelForAnswer(answer) {
  return {
    ...answer,
    custom_date: answer.custom_date?._d ?? null,
    plan: answer.plan ? { ...answer.plan, anomalies: (answer?.plan?.anomalies ? [answer.plan.anomalies] : []) } : null,
  };
};

function* sendAnswers(questions, publicId) {
  const formPayload = {
    form: {},
  };

  formPayload.form = {
    public_id: publicId,
    questions: questions.map(question => ({ id: question.id, ...payloadModelForAnswer(question.answer) })),
  };
  const url = `/public_form/${publicId}/create`;
  return (yield call(apiService.post, url, formPayload));
};

export function* loadFormRequest({
  payload,
}: AnyAction) {
  try {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    const formParams = {
      uuid: payload.id,
      email: '',
      password: '',
    };

    const headers = {};

    if (payload.login) {
      formParams.email = payload?.login?.email;
      formParams.password = payload?.login?.password;
    }

    const url = `/public_form/${formParams.uuid}/form`;

    const { data } = yield call(
      apiService.post,
      url,
      formParams,
      {
        headers,
      },
    );

    localStorage.removeItem('token');
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    yield put(loadFormResponse({
      form: data.form ?? {},
      formActive: data.active ?? true,
      isAuthenticated: !!data.token ?? false,
      userId: data.user_id ?? 0,
    }));
  } catch (error: any) {
    yield put(loadFormResponse({
      form: {},
      isAuthenticated: false,
      loadingError: error.response?.data?.message || error.message,
    }));
  }
}

export function* publicLinkPlanUsersRequest({
  payload,
}: AnyAction) {
  try {
    const formParams = {
      uuid: payload.id,
    };
    const url = `/public_form/${formParams.uuid}/plan_users`;

    const { data } = yield call(
      apiService.get,
      url,
    );

    yield put(publicLinkPlanUsersResponse({
      status: RESPONSE_STATUS.SUCCESS,
      users: data,
    }));
  } catch (error: any) {
    yield put(publicLinkPlanUsersResponse({
      status: RESPONSE_STATUS.FAILURE,
      message: error.message,
      users: [],
    }));
  }
}

function* sendImages(questions, formUuid) {
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
    response = yield call(apiService.post, `/public_form/${formUuid}/images`, formData);
  };
  return response.status;
};

export function* sendPublicAnswer({ payload }: AnyAction) {
  try {
    const { form } = payload;
    const questions = form.steps.map(step => step.questions).flat(1);

    if (!setIfSomeAnswerIsEmpty(questions)) {
      const { data } = yield sendAnswers(questions, payload.publicId);
      yield sendImages(questions, payload.publicId);
      yield put(
        sendPublicAnswerResponse({
          status: RESPONSE_STATUS.SUCCESS,
          afterMessage: data.after_message,
          afterImageLink: data.after_image_link,
          afterImageRedirect: data.after_image_redirect,
          isAccomplished: true,
        }),
      );
    } else {
      yield put(
        sendPublicAnswerResponse({
          status: RESPONSE_STATUS.FAILURE,
          message: 'emptyQuestions',
          isAccomplished: false,
        }),
      );
    }
  } catch (error: any) {
    yield put(
      sendPublicAnswerResponse({
        status: RESPONSE_STATUS.FAILURE,
        message: error.message,
        isAccomplished: false,
      }),
    );
  }
};

export function* loadAuthenticationRequiredRequest({ payload }: AnyAction) {
  try {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    const url = `/public_form/${payload?.id}`;
    const { data } = yield call(apiService.get, url);

    yield put(loadFormResponse({
      form: {},
      formActive: data.active ?? true,
      requireAuth: data.authentication_required ?? false,
      isAuthenticated: !data.custom_password_required && !data.authentication_required,
      customPasswordRequired: data.custom_password_required ?? false,
    }));
  } catch (error: any) {
    yield put(loadFormResponse({
      form: {},
      isAuthenticated: false,
      loadingError: error.response?.data?.message || error.message,
    }));
  }
}

export default [
  takeLatest(
    publicAnswerTypes.LOAD_AUTHENTICATION_REQUIRED_REQUEST,
    loadAuthenticationRequiredRequest,
  ),
  takeLatest(
    publicAnswerTypes.PUBLIC_LINK_PLAN_USERS_REQUEST,
    publicLinkPlanUsersRequest,
  ),
  takeLatest(
    publicAnswerTypes.LOAD_FORM_REQUEST,
    loadFormRequest,
  ),
  takeLatest(
    publicAnswerTypes.SEND_PUBLIC_ANSWER,
    sendPublicAnswer,
  ),
];
