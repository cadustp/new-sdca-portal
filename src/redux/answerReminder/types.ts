import {
  IReminder, TAnswer, TAnomaly, TPlan,
} from '../../types/reminder';

export enum answerReminderTypes {
  REQUEST_REMINDER_FOR_ANSWER = 'REQUEST_REMINDER_FOR_ANSWER',
  REQUEST_REMINDER_FOR_ANSWER_SUCCESS = 'REQUEST_REMINDER_FOR_ANSWER_SUCCESS',
  REQUEST_REMINDER_FOR_ANSWER_FAILURE = 'REQUEST_REMINDER_FOR_ANSWER_FAILURE',
  SET_EMPLOYEE = 'SET_EMPLOYEE',
  UPDATE_REMINDER_ANSWERS = 'UPDATE_REMINDER_ANSWERS',
  KNOCKOUT_STEP = 'KNOCKOUT_STEP',
  REMOVE_KNOCKOUT_STEP = 'REMOVE_KNOCKOUT_STEP',
  KNOCKOUT_FORM = 'KNOCKOUT_FORM',
  SET_OBSERVATION = 'SET_OBSERVATION',
  START_FILLING = 'START_FILLING',
  CLEAR_QUESTION_ANSWER = 'CLEAR_QUESTION_ANSWER',
  SEND_REMINDER = 'SEND_REMINDER',
  SEND_REMINDER_SUCCESS = 'SEND_REMINDER_SUCCESS',
  SEND_REMINDER_FAILURE = 'SEND_REMINDER_FAILURE',
  CLOSE_SNACKBAR = 'CLOSE_SNACKBAR',
  CLEAR_REMINDER_ANSWERS = 'CLEAR_REMINDER_ANSWERS',
  SET_PLAN = 'SET_PLAN',
  GENERATE_PDF = 'GENERATE_PDF',
  SET_LOCATION = 'SET_LOCATION'
}

export type answerReminderState ={
  reminder: IReminder,
  showLoading: boolean,
  failure: boolean,
  fillingStartDate?: Date | null,
  sendReminderResponseMessage: string,
  snackbar: boolean,
  snackbarVariant: string,
};

export const AnswerKnockedOutPayload: TAnswer = {
  selected_options: [],
  uuid: null,
  free_text: '',
  custom_date: null,
  custom_value: null,
  observation: '',
  dismissed: false,
  knocked_out: true,
  images: [],
  plan: null,
  feedback: null,
  action_plan: null,
};

export const ReminderInitialStateObject = {
  id: null,
  name: '',
  score_date: '',
  start_date: '',
  end_date: '',
  type: 0,
  score: null,
  status: '',
  company_employees: [{
    id: 0,
    name: '',
    label: '',
  }],
  location: null,
  form: {
    id: 0,
    version: '',
    name: '',
    hasKnockedOutQuestions: false,
    geolocation_required: false,
    type: 0,
    pop: '',
    fluxogram: '',
    external_link: '',
    steps: [
      {
        step_id: 0,
        name: '',
        hasKnockedOutQuestions: false,
        questions: [
          {
            id: 0,
            order: 0,
            step_number: 0,
            question: '',
            selection_type: '',
            weight: '',
            is_comment_required: false,
            description: null,
            missing_answer: false,
            missing_association: false,
            answer_options: [{
              id: 0,
              option_text: '',
              should_dismiss: false,
              is_knock_out_form: false,
              is_knock_out_step: false,
              is_comment_required: false,
              is_plan_required: false,
              is_image_required: false,
            }],
            answer: {} as TAnswer,
            answer_extra_options: {
              is_comment_required: false,
              is_plan_required: false,
              is_image_required: false,
            },
          },
        ],
      },
    ],
    selected_company_employee: {},
    description: '',
  },
};
