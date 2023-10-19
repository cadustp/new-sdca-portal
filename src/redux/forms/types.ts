import { SELECTION_TYPES } from '../../helpers/consts';

export enum formsTypes {
  LOAD_ALL_FORMS_REQUEST = 'LOAD_ALL_FORMS_REQUEST',
  LOAD_ALL_FORMS_RESPONSE = 'LOAD_ALL_FORMS_RESPONSE',
  LOAD_FORM = 'LOAD_FORM',
  LOAD_FORM_RESPONSE = 'LOAD_FORM_RESPONSE',
  HANDLE_CREATION_MODAL = 'HANDLE_CREATION_MODAL',
  HANDLE_DELETE_MODAL = 'HANDLE_DELETE_MODAL',
  HANDLE_TOGGLE_SIDE_BAR = 'HANDLE_TOGGLE_SIDE_BAR',
  DELETE_FORM_REQUEST = 'DELETE_FORM_REQUEST',
  DELETE_FORM_RESPONSE = 'DELETE_FORM_RESPONSE',
  CLEAR_DELETE_FORM_STATUS = 'CLEAR_DELETE_FORM_STATUS',
  SET_FORM_SETTINGS = 'SET_FORM_SETTINGS',
  SAVE_FORM_SETTINGS = 'SAVE_FORM_SETTINGS',
  CLEAR_FORM_SETTINGS = 'CLEAR_FORM_SETTINGS',
  START_NEW_FORM = 'START_NEW_FORM',
  SAVE_FORM = 'SAVE_FORM',
  SET_SAVE_FORM_ERRORS = 'SET_SAVE_FORM_ERRORS',
  SAVE_FORM_RESPONSE = 'SAVE_FORM_RESPONSE',
  HANDLE_DELETE_STEP_MODAL = 'HANDLE_DELETE_STEP_MODAL',
  DUPLICATE_STEP = 'DUPLICATE_STEP',
  DELETE_STEP = 'DELETE_STEP',
  HANDLE_MOVE_STEP_MODAL = 'HANDLE_MOVE_STEP_MODAL',
  MOVE_STEP = 'MOVE_STEP',
  CREATE_NEW_STEP = 'CREATE_NEW_STEP',
  SET_STEP_TITLE = 'SET_STEP_TITLE',
  ADD_NEW_QUESTION = 'ADD_NEW_QUESTION',
  DUPLICATE_QUESTION = 'DUPLICATE_QUESTION',
  DELETE_QUESTION = 'DELETE_QUESTION',
  HANDLE_MOVE_QUESTION_MODAL = 'HANDLE_MOVE_QUESTION_MODAL',
  MOVE_QUESTION = 'MOVE_QUESTION',
  EDIT_QUESTION_FIELD = 'EDIT_QUESTION_FIELD',
  EDIT_QUESTION = 'EDIT_QUESTION',
  HANDLE_ANSWER_TYPE_MODAL = 'HANDLE_ANSWER_TYPE_MODAL',
  SELECT_ANSWER_TYPE = 'SELECT_ANSWER_TYPE',
  EDIT_ANSWER_TYPE = 'EDIT_ANSWER_TYPE',
  ADD_ANSWER_OPTION = 'ADD_ANSWER_OPTION',
  DELETE_ANSWER_OPTION = 'DELETE_ANSWER_OPTION',
  EDIT_ANSWER_OPTION = 'EDIT_ANSWER_OPTION',
  EDIT_OPTION = 'EDIT_OPTION',
  MOVE_OPTION = 'MOVE_OPTION',
  CLEAR_VALIDATE_ERRORS = 'CLEAR_VALIDATE_ERRORS',
  CLEAR_SAVE_FORM_STATUS = 'CLEAR_SAVE_FORM_STATUS',
  HANDLE_SHARE_MODE = 'HANDLE_SHARE_MODE',
  DUPLICATE_FORM = 'DUPLICATE_FORM',
  CLEAR_CLONE_WARNING = 'CLEAR_CLONE_WARNING',
  LOAD_AVAILABLE_USERS = 'LOAD_AVAILABLE_USERS',
  LOAD_AVAILABLE_USERS_RESPONSE = 'LOAD_AVAILABLE_USERS_RESPONSE',
  CLEAR_LOAD_USERS_STATUS = 'CLEAR_LOAD_USERS_STATUS',
}

export const newOptionTemplate = {
  answer: '',
  weight: '',
  is_knockout_form: false,
  is_knockout_step: false,
  isCommentRequired: false,
  isImageRequired: false,
  isPlanRequired: false,
  shouldDismiss: false,
  key: `answer-${Date.now()}`,
  errors: {
    answer: false,
    weight: false,
  },
};

export const newQuestionTemplate = {
  question: '',
  key: `question-${Date.now()}`,
  points: '',
  observations: '',
  selectionType: SELECTION_TYPES.NONE,
  answerOptions: [] as Answer[],
  errors: {
    question: false,
    points: false,
    selectionType: false,
    answerOptionsTotal: false,
  },
};

export const newStepTemplate = {
  title: '',
  key: `answer-option-${Date.now()}`,
  errors: {
    title: false,
  },
  questions: [newQuestionTemplate],
};

export type TAttachment = {
  file: File,
  url: string,
};

export type Answer = {
  id?: number,
  key: string | number,
  answer: string,
  weight: string,
  order?: number,
  is_knockout_step: boolean,
  is_knockout_form: boolean,
  isCommentRequired: boolean,
  isImageRequired: boolean,
  isPlanRequired: boolean,
  shouldDismiss: boolean,
  errors: AnswerOptionErrors,
};

export type AnswerOptionErrors = {
  answer: boolean,
  weight: boolean,
};

export type Question = {
  key: string | number,
  question: string,
  points: string,
  id?: number,
  observations: string,
  selectionType: number | null | string,
  answerOptions: Answer[],
  order?: number,
  errors: QuestionErrors,
};

export type QuestionErrors = {
  question: boolean,
  points: boolean,
  selectionType: boolean,
  answerOptionsTotal: boolean,
  answerOptions?: AnswerOptionErrors[],
};

export type StepErrors = {
  title: boolean,
  questions?: QuestionErrors[],
};

export type Step = {
  id?: number,
  key: string | number,
  title: string,
  questions: Question[],
  order?: number,
  errors: StepErrors,
};

export type Form = {
  id: number | null,
  name: string,
  description: string,
  attachments: Array<any>,
  externalLink: string,
  attachedForm: Array<any> | null,
  mandatoryApproval: boolean,
  evaluatedRequired: boolean,
  calcResult: boolean,
  geolocation: boolean,
  conditionTriggersObject: object,
  sharedUsers: Array<any>,
  publicLink: {
    uuid: string,
    descriptionRequired: boolean,
    afterImageLink: string | null,
    afterImageRedirect: string | null,
    active: boolean,
    afterMessage: string,
    customDomain: string,
    authRequired: boolean,
    customPasswordRequired: boolean,
    customPassword: string,
  },
  version: string,
  createdAt: string,
  steps: Array<any>,
  lastModified: string,
  shareMode: string,
};

export type ValidationErrors = StepErrors | QuestionErrors | AnswerOptionErrors;
export interface FormsState {
  loading: boolean,
  error: boolean,
  errorMessage: string,
  list: Array<any>,
  creation: {
    show: boolean,
    showSideBar: boolean
    loading: boolean,
    status: string,
    error: string,
    formErrors: boolean,
    title: string,
    isAClone: boolean,
    usersSharingTab: {
      availableUsers: Array<any>,
      loading: boolean,
      failure: boolean,
    }
  }
  delete: {
    show: boolean,
    status: string,
    error: string,
  },
  deleteStep: {
    show: boolean,
    title: string,
    index: number | null,
  },
  moveStep: {
    show: boolean,
    index: number | null,
    positions: Array<any>,
  },
  moveQuestion: {
    show: boolean,
    questionIndex: number | null,
    stepIndex: number | null,
  },
  answerType: {
    show: boolean,
    questionIndex: number | null,
    stepIndex: number | null,
    answerType: number | null,
  }
  form: Form,
}
