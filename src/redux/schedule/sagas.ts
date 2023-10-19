import {
  takeLatest, put, call, select,
} from 'redux-saga/effects';
import { AnyAction } from 'redux';
import apiService, {
  fileFetcher,
} from '../../services/apiService';
import {
  RESPONSE_STATUS, ORDER_TYPES, MAX_PER_PAGE, MAX_DAYS,
} from '../../helpers/consts';
import { RemindersTypes } from './types';
import {
  searchRemindersRequest,
  searchRemindersRequestSuccess,
  searchRemindersRequestFailure,
  importRemindersRequestResponse,
  exportRemindersResponse,
  deleteRemindersRequestSuccess,
  rescheduleRemindersResponse,
  cancelReminderRequestResponse,
  saveReminderRequestResponse,
  loadListsRequestResponse,
  setEditReminder,
} from './actions';
import { captureEvent } from '../../analytics';

const initialDates = () => {
  let date = new Date();
  const startDateLimited = new Date(date.setDate(date.getDate() - MAX_DAYS)).toString();
  date = new Date();
  const endDateLimited = new Date(date.setDate(date.getDate() + MAX_DAYS)).toString();

  return {
    startDateLimited,
    endDateLimited,
  };
};

const stringfySearchParams = paramsObject => {
  const { startDateLimited, endDateLimited } = initialDates();

  const {
    inputSearchValue,
    form,
    appUser,
    evaluatedUser,
    startDate,
    endDate,
    status,
    sort,
  } = paramsObject;
  const url = [
    `&input_text=${inputSearchValue || ''}`,
    `&forms=${form ? form.map(item => item.key) : ''}`,
    `&app_users=${appUser ? appUser.map(user => user.key) : ''}`,
    `&valuated_users=${evaluatedUser ? evaluatedUser.map(evaluated => evaluated.key) : ''}`,
    `&start_date=${startDate || startDateLimited}`,
    `&end_date=${endDate || endDateLimited}`,
    `&sort=${sort ?? ORDER_TYPES.START_DATE_ASCENDING}`,
    `&statuses=${status ? status.map(s => s.key) : ''}`,
  ].join('');
  return url;
};

const stringfyExportParams = paramsObject => {
  const { startDateLimited, endDateLimited } = initialDates();

  const {
    inputSearchValue,
    form,
    appUser,
    evaluatedUser,
    startDate,
    endDate,
    status,
  } = paramsObject;
  const url = [
    `&name=${inputSearchValue || ''}`,
    `&app_users=${appUser ? appUser.map(user => user.key) : ''}`,
    `&valuated_users=${evaluatedUser ? evaluatedUser.map(evaluated => evaluated.key) : ''}`,
    `&forms=${form ? form.map(item => item.key) : ''}`,
    `&statuses=${status ? status.map(s => s.key) : ''}`,
    `&start_date=${startDate || startDateLimited}}`,
    `&end_date=${endDate || endDateLimited}`,
  ].join('');
  return url;
};

const mapPayload = items => items.map(item => item.value);

export function* importRemindersRequest({
  payload,
}: AnyAction) {
  let rowErrors = [];
  try {
    const formData = new FormData();
    const url = '/imports/';
    formData.append('[spreadsheet]', payload.selectedFile);
    formData.append('email', payload.email);
    const { data } = yield call(apiService.post, url, formData);
    rowErrors = data.error ?? [];

    yield put(importRemindersRequestResponse({
      importStatus: RESPONSE_STATUS.SUCCESS,
      rowErrors,
    }));
    captureEvent('importReminders', {
      status: 'success',
      hasErrorRows: rowErrors?.length,
      hasEmail: !!payload.email,
    });
  } catch (error) {
    captureEvent('importReminders', {
      status: 'error',
      hasEmail: !!payload.email,
      error: error.response?.data?.error,
    });
    yield put(importRemindersRequestResponse({
      importStatus: RESPONSE_STATUS.FAILURE,
      rowErrors,
    }));
  }
};

const mapReminder = data => ({
  id: data.id,
  name: data.name,
  form: data.form,
  evaluators: data.app_users,
  evaluatorsGroups: data.evaluators_groups,
  evaluateds: data.valuated_users,
  evaluatedsGroups: data.valuateds_groups,
  recurrence: data.interval_id,
  startDate: data.start_date,
  endDate: data.end_date,
  deadline: data.limit,
  weekDays: data.allowed_week_days,
  automaticScheduling: data.has_auto_scheduling,
});

export function* loadSelectedReminder({
  payload,
}: AnyAction) {
  try {
    const { isARoutine, id } = payload;
    const url = `/${isARoutine ? 'reminder_routines' : 'reminders/list'}/${id}`;
    const { data } = yield call(apiService.get, url);

    const reminder = mapReminder(data);

    yield put(setEditReminder({ reminder }));
  } catch (error) {
    yield put(searchRemindersRequestFailure());
  }
}

export function* remindersRequest({
  payload,
}: AnyAction) {
  try {
    const { params, page } = payload;
    const stringfiedParams = stringfySearchParams(params);
    const url = `/reminders/list?${stringfiedParams}&page=${page}&per_page=${MAX_PER_PAGE}`;

    const { data } = yield call(apiService.get, url);

    yield put(
      searchRemindersRequestSuccess({
        payload: data,
        page,
      }),
    );
  } catch (error) {
    yield put(searchRemindersRequestFailure());
  }
}

export function* deleteReminders(selectedReminders) {
  const url = `/reminders?reminders=${selectedReminders.payload}`;

  const { data } = yield call(apiService.delete, url);

  yield put(deleteRemindersRequestSuccess({
    reminders: data.reminders,
    message: data.message,
    hasError: data.error,
  }));
  captureEvent('confirmDeleteSchedule', { status: 'success', reminders: selectedReminders.payload?.length });
};

export function* rescheduleReminders({ payload }: AnyAction) {
  try {
    const {
      comment, selectedReminders, users, reminderDates,
    } = payload;

    const url = '/reminders/reschedule_reminder';

    const { data } = yield call(apiService.post, url, {
      justification: comment,
      reminders: selectedReminders,
      users,
      new_end_date: reminderDates.endDate,
      new_start_date: reminderDates.startDate,
    });

    yield put(rescheduleRemindersResponse({
      message: data.message,
      hasError: data.error,
    }));

    const filterParamsFromState = state => state.reminder.filterParams;
    const filterParams = yield select(filterParamsFromState);
    yield put(searchRemindersRequest({
      params: filterParams,
      page: 0,
    }));
    captureEvent('confirmReschedule', { status: 'success', evaluators: payload.users?.length });
  } catch (err) {
    let errorMessage = '';
    if (err.response) {
      errorMessage = err.response.data.message;
    } else {
      errorMessage = 'Error';
    }
    yield put(rescheduleRemindersResponse({
      message: errorMessage,
      hasError: true,
    }));
    captureEvent('confirmReschedule', { status: 'error', evaluators: payload.users?.length, error: err.response?.data?.message });
  }
};

export function* cancelReminder({ payload }: AnyAction) {
  try {
    const {
      reminder,
      comment,
      userApps,
      reminders,
    } = payload;

    const body = { reminders: { users: [...userApps], id: reminder.id, justification: comment } };

    const url = '/cancel_reminder';
    const { data } = yield call(apiService.post, url, body);

    const evaluateds = mapPayload(userApps);
    const users = reminders.data.filter(r => r.id === reminder.id)[0]?.app_users;
    const newUsers = users.map(u => (evaluateds.includes(u.id) ? { ...u, status: 3 } : u));
    const updatedReminders = reminders.data.map(
      r => (r.id === reminder.id ? { ...r, app_users: newUsers } : r),
    );

    yield put(cancelReminderRequestResponse({
      reminders: { ...reminders, data: updatedReminders },
      message: data.message,
      hasError: false,
    }));
    captureEvent('confirmCancel', { status: 'success', evaluators: payload.userApps?.length });
  } catch (err) {
    let errorMessage = '';
    if (err.response) {
      errorMessage = err.response.data.message;
    } else {
      errorMessage = 'Error';
    }
    yield put(cancelReminderRequestResponse({
      reminders: { data: [] },
      message: errorMessage,
      hasError: true,
    }));
    captureEvent('confirmCancel', { status: 'error', evaluators: payload.userApps?.length, error: err.response?.data?.message });
  }
};

export function* saveReminderRequest({
  payload,
}: AnyAction) {
  const eventParams = {
    type: payload.id ? 'edit' : 'create',
    evaluators: payload.evaluators?.length,
    evaluateds: payload.evaluateds?.length,
    evaluatorsGroups: payload.evaluatorsGroups?.length,
    evaluatedsGroups: payload.evaluatedsGroups?.length,
    correctDates: payload.startDate < payload.endDate,
    hasRecurrence: payload.recurrence?.value,
    hasAutoSchedule: payload.automaticScheduling,
    hasLimit: payload.recurrence && !!payload.deadline,
    hasWeekDays: +payload.recurrence?.value === 2 ? payload.weekDays?.map(d => d.value) : null,
  };
  const { isARoutine, id } = payload;
  try {
    const reminder = {
      id: payload.id ?? null,
      name: payload.name,
      form_id: payload.form?.value,
      user_ids: mapPayload(payload.evaluators),
      company_employee_ids: payload.evaluateds ? mapPayload(payload.evaluateds) : [],
      company_group_ids: payload.evaluatedsGroups ? mapPayload(payload.evaluatedsGroups) : [],
      evaluators_group_ids: payload.evaluatorsGroups ? mapPayload(payload.evaluatorsGroups) : [],
      start_date: payload.startDate,
      end_date: payload.endDate,
      interval_id: payload.recurrence ? +payload.recurrence.value : null,
      limit: payload.recurrence && payload.deadline ? payload.deadline : null,
      allowed_week_days: +payload.recurrence?.value === 2 && payload.weekDays
        ? mapPayload(payload.weekDays) : null,
      has_auto_scheduling: payload.automaticScheduling ? 1 : 0,
    };

    const url = `/${isARoutine ? 'reminder_routines' : 'reminders'}${id ? `/${id}` : ''}`;
    const { data } = yield call(payload.id ? apiService.put : apiService.post, url, reminder);

    let saveError = '';
    saveError = data[0].error ?? '';

    if (saveError) {
      yield put(saveReminderRequestResponse({
        saveStatus: RESPONSE_STATUS.FAILURE,
        saveError,
      }));
    } else {
      yield put(saveReminderRequestResponse({
        saveStatus: RESPONSE_STATUS.SUCCESS,
        saveError,
      }));
    }
    captureEvent(isARoutine ? 'saveRoutine' : 'saveReminder',
      {
        status: 'success',
        ...eventParams,
        error: saveError,
      });
    return true;
  } catch (error) {
    yield put(saveReminderRequestResponse({
      saveStatus: RESPONSE_STATUS.FAILURE,
      saveError: error.response?.data?.message ?? error.message,
    }));
    captureEvent(isARoutine ? 'saveRoutine' : 'saveReminder',
      {
        status: 'error',
        ...eventParams,
        error: error.response?.data?.message ?? error.message,
      });
  }
}

export function* loadListsRequest() {
  try {
    const url = '/reminders/creation_lists';
    const { data } = yield call(apiService.get, url);
    const allForms = data.forms ?? [];
    const allEvaluators = data.app_users ?? [];
    const allEvaluateds = data.valuated_users ?? [];
    const allGroups = data.groups ?? [];

    yield put(loadListsRequestResponse({
      listsStatus: RESPONSE_STATUS.SUCCESS,
      allForms,
      allEvaluators,
      allEvaluateds,
      allGroups,
    }));
    return true;
  } catch (error) {
    yield put(loadListsRequestResponse({
      listsStatus: RESPONSE_STATUS.FAILURE,
    }));
  }
}

export function* exportRemindersRequest({
  payload,
}: AnyAction) {
  const eventParams = {
    hasName: !!payload.inputSearchValue,
    hasForms: payload.form?.length,
    hasEvaluators: payload.appUser?.length,
    hasEvaluateds: payload.evaluatedUser?.length,
    hasStatus: payload.status?.map(s => s.key),
    hasDates: !!payload.startDate && !!payload.endDate,
  };
  try {
    const stringfiedParams = stringfyExportParams(payload);
    const url = `/reminders/export?${stringfiedParams}`;
    const { data } = yield call(fileFetcher().get, url);

    yield put(exportRemindersResponse({
      exportObject: data,
      exportStatus: RESPONSE_STATUS.SUCCESS,
    }));
    captureEvent('exportReminders', { status: 'success', ...eventParams });
  } catch (error) {
    captureEvent('exportReminders', { status: 'error', ...eventParams, error: error.message });
    yield put(exportRemindersResponse({
      exportStatus: RESPONSE_STATUS.FAILURE,
      message: error.message,
    }));
  }
};

export default [
  takeLatest(
    RemindersTypes.REMINDERS_REQUEST,
    remindersRequest,
  ),
  takeLatest(
    RemindersTypes.REMINDER_CANCEL_REQUEST,
    cancelReminder,
  ),
  takeLatest(
    RemindersTypes.DELETE_REMINDERS,
    deleteReminders,
  ),
  takeLatest(
    RemindersTypes.RESCHEULE_REMINDERS,
    rescheduleReminders,
  ),
  takeLatest(
    RemindersTypes.IMPORT_REMINDERS_REQUEST,
    importRemindersRequest,
  ),
  takeLatest(
    RemindersTypes.EXPORT_REMINDERS_REQUEST,
    exportRemindersRequest,
  ),
  takeLatest(
    RemindersTypes.SAVE_REMINDER_REQUEST,
    saveReminderRequest,
  ),
  takeLatest(
    RemindersTypes.LOAD_CREATION_LISTS_REQUEST,
    loadListsRequest,
  ),
  takeLatest(
    RemindersTypes.LOAD_SELECTED_REMINDER,
    loadSelectedReminder,
  ),
];
