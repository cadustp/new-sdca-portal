export const ORDER_TYPES = Object.freeze({
  ALPHABETICAL_ASCENDING: 'ALPHABETICAL_ASCENDING',
  ALPHABETICAL_DESCENDING: 'ALPHABETICAL_DESCENDING',
  CREATION_DATE_ASCENDING: 'CREATION_DATE_ASCENDING',
  CREATION_DATE_DESCENDING: 'CREATION_DATE_DESCENDING',
  START_DATE_ASCENDING: 'START_DATE_ASCENDING',
  START_DATE_DESCENDING: 'START_DATE_DESCENDING',
});

export const IMPORT_TYPES = Object.freeze({
  GROUPS: 'GROUPS',
  USERS: 'USERS',
  EVALUATEDS: 'EVALUATEDS',
  REMINDERS: 'REMINDERS',
});

export const RESPONSE_STATUS = Object.freeze({
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
});

export const LOGIN_STAGE = Object.freeze({
  LOGIN: 'LOGIN',
  FORGOT: 'FORGOT',
  RECOVER: 'RECOVER',
});

export const SNACKBAR_VARIANTS = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

export const SELECTION_TYPES = Object.freeze({
  NONE: 99,
  SINGLE: 0,
  MULTI: 1,
  IMAGE: 2,
  RANGE: 3,
  DATE: 4,
  FREE_TEXT: 5,
  NUMERIC: 6,
});

export const QUESTION_FIELDS = Object.freeze({
  POINTS: 'points',
  OBSERVATIONS: 'observations',
  QUESTION: 'question',
  SELECTION_TYPE: 'selectionType',
});

export const CHOOSE_QUESTION_TYPE_MODAL_OPTION = Object.freeze({
  LIST_TYPE: 0,
  CONFIRM_MESSAGE: 1,
});

export const FormDescriptionMaxLength = 140;

export const FormNameMaxLength = 255;

export enum FilterTabs {
  GROUP,
  FORM,
  ROLE,
  WORKER,
  APP_USER,
}
export const FormTextAreaMaxLength = 500;

export enum AppStates {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  EMPTY = 'EMPTY',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export const ACTION_PLAN_STATUSES = Object.freeze({
  PENDING: { name: 'pending', code: 1 },
  LATE: { name: 'late', code: 2 },
  IN_PROGRESS: { name: 'inProgress', code: 3 },
  CONCLUDED: { name: 'concluded', code: 4 },
  CANCELED: { name: 'canceled', code: 5 },
});

export const REPORT_TYPE_STATUSES = Object.freeze({
  TYPES: [
    {
      id: 1,
      label: 'REL_REPORT_SCHEDULES',
    },
    {
      id: 2,
      label: 'REL_ANSWERS',
    },
    {
      id: 6,
      label: 'REL_RESCHEDULEDS',
    },
    {
      id: 7,
      label: 'REL_CANCELED',
    },
    {
      id: 8,
      label: 'REL_PLANS',
    },
  ],
});

export const FORM_TYPES = Object.freeze({
  TYPES: [
    {
      id: 1,
      name: 'Avaliação',
    },
    {
      id: 2,
      name: 'Checklist',
    },
    {
      id: 3,
      name: 'Treinamento',
    },
  ],
});

export const TYPES_OF_USER = Object.freeze({
  TYPES: [
    { id: 2, label: 'master' },
    { id: 3, label: 'sub_admin' },
    { id: 4, label: 'app_user' },
  ],
});

export const LANGUAGE_OPTIONS = Object.freeze({
  LANGUAGES: [
    {
      id: '1',
      value: 'pt-BR',
      label: 'users.edit.field.language.portuguese',
    },
    {
      id: '2',
      value: 'en',
      label: 'users.edit.field.language.english',
    },
    {
      id: '3',
      value: 'es',
      label: 'users.edit.field.language.spanish',
    },
  ],
});

export const RECURRENCE_OPTIONS = Object.freeze({
  RECURRENCE: [
    {
      id: 5,
      label: 'reminder.recurrence.daily',
    },
    {
      id: 2,
      label: 'reminder.recurrence.weekly',
    },
    {
      id: 8,
      label: 'reminder.recurrence.decennial',
    },
    {
      id: 6,
      label: 'reminder.recurrence.fortnightly',
    },
    {
      id: 3,
      label: 'reminder.recurrence.monthly',
    },
    {
      id: 4,
      label: 'reminder.recurrence.quarterly',
    },
    {
      id: 1,
      label: 'reminder.recurrence.semester',
    },
    {
      id: 7,
      label: 'reminder.recurrence.yearly',
    },
  ],
  WEEK_DAYS: [
    {
      id: '0',
      label: 'reminder.recurrence.week.monday',
    },
    {
      id: '1',
      label: 'reminder.recurrence.week.tuesday',
    },
    {
      id: '2',
      label: 'reminder.recurrence.week.wednesday',
    },
    {
      id: '3',
      label: 'reminder.recurrence.week.thursday',
    },
    {
      id: '4',
      label: 'reminder.recurrence.week.friday',
    },
    {
      id: '5',
      label: 'reminder.recurrence.week.saturday',
    },
    {
      id: '6',
      label: 'reminder.recurrence.week.sunday',
    },
  ],
});

export const REMINDER_MODAL_TYPES = Object.freeze({
  EDIT: {
    key: 'EDIT',
  },
  CANCEL: {
    key: 'CANCEL',
    title: 'reminders.cancel_reminder.modal.title',
    description: 'reminders.cancel_reminder.modal.description',
  },
  RESCHEDULE: {
    key: 'RESCHEDULE',
    title: 'reminders.reschedule_reminder.modal.title',
  },
  DELETE: {
    key: 'DELETE',
    title: 'reminders.delete_reminder.modal.title',
  },
});

export const GROUP_MODAL_TYPES = Object.freeze({
  EDIT: {
    key: 'EDIT',
  },
  DELETE: {
    key: 'DELETE',
  },
});

export const CONTENTS_MODAL_TYPES = Object.freeze({
  ACCESS: {
    key: 'ACCESS',
  },
  EDIT: {
    key: 'EDIT',
  },
  DELETE: {
    key: 'DELETE',
  },
});

export const ANSWER_TYPES_LIST = Object.freeze({
  TYPES: [
    {
      id: 1,
      title: 'forms.edit.answerTypes.image.title',
      description: 'forms.edit.answerTypes.image.description',
      type: SELECTION_TYPES.IMAGE,
    },
    {
      id: 2,
      title: 'forms.edit.answerTypes.multiple.title',
      description: 'forms.edit.answerTypes.multiple.description',
      type: SELECTION_TYPES.MULTI,
    },
    {
      id: 3,
      title: 'forms.edit.answerTypes.single.title',
      description: 'forms.edit.answerTypes.single.description',
      type: SELECTION_TYPES.SINGLE,
    },
    {
      id: 4,
      title: 'forms.edit.answerTypes.date.title',
      description: 'forms.edit.answerTypes.date.description',
      type: SELECTION_TYPES.DATE,
    },
    {
      id: 5,
      title: 'forms.edit.answerTypes.freeText.title',
      description: 'forms.edit.answerTypes.freeText.description',
      type: SELECTION_TYPES.FREE_TEXT,
    },
    {
      id: 6,
      title: 'forms.edit.answerTypes.numeric.title',
      description: 'forms.edit.answerTypes.numeric.description',
      type: SELECTION_TYPES.NUMERIC,
    },
  ],
});

export const SHARE_MODE = Object.freeze({
  PUBLIC_LINK: 'PUBLIC_LINK',
  SYSTEM_USERS: 'SYSTEM_USERS',
});

export const MAX_PER_PAGE = 50;
export const REMINDER_MINIMAL_DATE = new Date();
export const MAX_DAYS = 30;
export const MAX_TABLE_ROWS = 1000000;
