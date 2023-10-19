import { Reducer } from 'redux';
import { RESPONSE_STATUS, SHARE_MODE } from '../../helpers/consts';
import { validatesStepError } from '../../helpers/validation';
import {
  FormsState, formsTypes, newOptionTemplate, newQuestionTemplate, newStepTemplate,
} from './types';

const INITIAL_STATE: FormsState = {
  loading: false,
  error: false,
  errorMessage: '',
  list: [],
  creation: {
    show: false,
    showSideBar: true,
    status: '',
    error: '',
    formErrors: false,
    loading: false,
    title: '',
    isAClone: false,
    usersSharingTab: {
      availableUsers: [],
      loading: false,
      failure: false,
    },
  },
  delete: {
    show: false,
    status: '',
    error: '',
  },
  deleteStep: {
    show: false,
    title: '',
    index: null,
  },
  moveStep: {
    show: false,
    index: null,
    positions: [],
  },
  moveQuestion: {
    show: false,
    questionIndex: null,
    stepIndex: null,
  },
  answerType: {
    show: false,
    questionIndex: null,
    stepIndex: null,
    answerType: null,
  },
  form: {
    id: null,
    name: '',
    description: '',
    conditionTriggersObject: {},
    attachments: [],
    externalLink: '',
    attachedForm: null,
    mandatoryApproval: false,
    evaluatedRequired: false,
    calcResult: false,
    geolocation: false,
    sharedUsers: [],
    publicLink: {
      uuid: '',
      active: false,
      descriptionRequired: false,
      afterImageLink: null,
      afterMessage: '',
      afterImageRedirect: null,
      customDomain: '',
      authRequired: false,
      customPasswordRequired: false,
      customPassword: '',
    },
    version: '',
    createdAt: '',
    steps: [],
    lastModified: '',
    shareMode: SHARE_MODE.SYSTEM_USERS,
  },
};

const reducer: Reducer<FormsState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case formsTypes.LOAD_ALL_FORMS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case formsTypes.LOAD_ALL_FORMS_RESPONSE:
      return {
        ...state,
        loading: false,
        list: action.payload.forms ?? [],
        error: !!action.payload.errorMessage,
        errorMessage: action.payload.errorMessage ?? state.errorMessage,
      };
    case formsTypes.HANDLE_TOGGLE_SIDE_BAR:
      return {
        ...state,
        creation: {
          ...state.creation,
          showSideBar: !state.creation.showSideBar,
        },
      };
    case formsTypes.HANDLE_CREATION_MODAL:
      return {
        ...state,
        creation: {
          ...state.creation,
          show: !state.creation.show,
        },
      };
    case formsTypes.HANDLE_DELETE_MODAL:
      return {
        ...state,
        delete: {
          ...state.delete,
          show: !state.delete.show,
        },
      };
    case formsTypes.DELETE_FORM_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case formsTypes.DELETE_FORM_RESPONSE:
      return {
        ...state,
        delete: {
          ...state.delete,
          show: false,
          status: action.payload.status,
          error: action.payload.error,
        },
        loading: false,
      };
    case formsTypes.CLEAR_DELETE_FORM_STATUS:
      return {
        ...state,
        delete: INITIAL_STATE.delete,
      };
    case formsTypes.SET_FORM_SETTINGS:
      return {
        ...state,
        form: action.payload,
      };
    case formsTypes.CLEAR_FORM_SETTINGS:
      return {
        ...state,
        form: INITIAL_STATE.form,
      };
    case formsTypes.SAVE_FORM_SETTINGS:
      return {
        ...state,
        form: INITIAL_STATE.form,
      };
    case formsTypes.LOAD_FORM:
      return {
        ...state,
        form: INITIAL_STATE.form,
        loading: true,
      };
    case formsTypes.LOAD_FORM_RESPONSE:
      return {
        ...state,
        form: action.payload.form ?? INITIAL_STATE.form,
        creation: {
          ...state.creation,
          isAClone: action.payload.isAClone ?? INITIAL_STATE.creation.isAClone,
        },
        loading: false,
      };
    case formsTypes.LOAD_AVAILABLE_USERS:
      return {
        ...state,
        creation: {
          ...state.creation,
          usersSharingTab: {
            ...state.creation.usersSharingTab,
            loading: true,
          },
        },
      };
    case formsTypes.LOAD_AVAILABLE_USERS_RESPONSE:
      return {
        ...state,
        creation: {
          ...state.creation,
          usersSharingTab: {
            availableUsers: action.payload.users,
            loading: false,
            failure: action.payload.failure,
          },
        },
      };
    case formsTypes.CLEAR_LOAD_USERS_STATUS:
      return {
        ...state,
        creation: {
          ...state.creation,
          usersSharingTab: INITIAL_STATE.creation.usersSharingTab,
        },
      };
    case formsTypes.START_NEW_FORM:
      return {
        ...state,
        form: {
          ...state.form,
          lastModified: new Date().toString(),
          steps: [newStepTemplate],
        },
        loading: false,
      };
    case formsTypes.SAVE_FORM:
      return {
        ...state,
        creation: {
          ...state.creation,
          loading: true,
        },
      };
    case formsTypes.SET_SAVE_FORM_ERRORS:
      return {
        ...state,
        creation: {
          ...state.creation,
          loading: false,
          formErrors: true,
        },
        form: {
          ...state.form,
          steps: action.payload.steps,
        },
      };
    case formsTypes.CLEAR_VALIDATE_ERRORS:
      return {
        ...state,
        creation: {
          ...state.creation,
          loading: false,
          formErrors: false,
        },
      };
    case formsTypes.SAVE_FORM_RESPONSE:
      return {
        ...state,
        creation: {
          ...state.creation,
          status: action.payload.status,
          title: action.payload.title ?? INITIAL_STATE.creation.title,
          error: action.payload.error ?? INITIAL_STATE.creation.error,
          loading: false,
        },
      };
    case formsTypes.CLEAR_SAVE_FORM_STATUS:
      return {
        ...state,
        creation: action.payload.status === RESPONSE_STATUS.SUCCESS
          ? INITIAL_STATE.creation
          : {
            ...state.creation,
            status: INITIAL_STATE.creation.status,
            error: INITIAL_STATE.creation.error,
          },
      };
    case formsTypes.HANDLE_DELETE_STEP_MODAL:
      return {
        ...state,
        deleteStep: {
          ...state.deleteStep,
          show: !state.deleteStep.show,
          title: action.payload?.title ?? INITIAL_STATE.deleteStep.title,
          index: action.payload?.index ?? INITIAL_STATE.deleteStep.index,
        },
      };
    case formsTypes.DUPLICATE_STEP:
      const duplicatedSteps = [...state.form.steps];
      duplicatedSteps.splice(action.payload.stepIndex + 1, 0, action.payload.duplicatedStep);
      return {
        ...state,
        form: {
          ...state.form,
          steps: duplicatedSteps,
        },
      };
    case formsTypes.DELETE_STEP:
      const deletedSteps = [...state.form.steps];
      deletedSteps.splice(action.payload.stepIndex, 1);
      return {
        ...state,
        deleteStep: INITIAL_STATE.deleteStep,
        form: {
          ...state.form,
          steps: deletedSteps,
        },
      };
    case formsTypes.HANDLE_MOVE_STEP_MODAL:
      const positions = [...state.form.steps].map((_, idx) => { const value = idx; const label = idx + 1; return { label, value }; });
      return {
        ...state,
        moveStep: {
          ...state.moveStep,
          show: !state.moveStep.show,
          index: action.payload?.index ?? INITIAL_STATE.moveStep.index,
          positions,
        },
      };
    case formsTypes.MOVE_STEP:
      const movedSteps = [...state.form.steps];
      const step = movedSteps.splice(action.payload.currentIndex, 1)[0];
      movedSteps.splice(action.payload.newIndex, 0, step);
      return {
        ...state,
        moveStep: INITIAL_STATE.moveStep,
        form: {
          ...state.form,
          steps: movedSteps,
        },
      };
    case formsTypes.CREATE_NEW_STEP:
      const newStep = {
        ...newStepTemplate,
        key: `step-${Date.now()}`,
      };
      const createdSteps = [...state.form.steps];
      createdSteps.splice(action.payload.index + 1, 0, newStep);
      return {
        ...state,
        form: {
          ...state.form,
          steps: createdSteps,
        },
      };
    case formsTypes.SET_STEP_TITLE:
      const allSteps = [...state.form.steps];
      allSteps[action.payload.stepOrder].title = action.payload.title;
      allSteps[action.payload.stepOrder].errors.title = validatesStepError(allSteps[action.payload.stepOrder], state.form.calcResult, 'title');
      return {
        ...state,
        form: {
          ...state.form,
          steps: allSteps,
        },
      };
    case formsTypes.ADD_NEW_QUESTION:
      const newQuestion = {
        ...newQuestionTemplate,
        key: `step-${Date.now()}`,
      };
      const newQuestionSteps = [...state.form.steps];
      newQuestionSteps[action.payload.stepIndex].questions.splice(action.payload.questionIndex + 1, 0, newQuestion);
      return {
        ...state,
        form: {
          ...state.form,
          steps: newQuestionSteps,
        },
      };
    case formsTypes.DUPLICATE_QUESTION:
      const duplicatedQuestionSteps = [...state.form.steps];
      duplicatedQuestionSteps[action.payload.stepIndex].questions.splice(action.payload.questionIndex + 1, 0, action.payload.duplicatedQuestion);
      return {
        ...state,
        form: {
          ...state.form,
          steps: duplicatedQuestionSteps,
        },
      };
    case formsTypes.DELETE_QUESTION:
      const deletedQuestionSteps = [...state.form.steps];
      deletedQuestionSteps[action.payload.stepIndex].questions.splice(action.payload.questionIndex, 1);
      return {
        ...state,
        form: {
          ...state.form,
          steps: deletedQuestionSteps,
        },
      };
    case formsTypes.HANDLE_MOVE_QUESTION_MODAL:
      return {
        ...state,
        moveQuestion: {
          ...state.moveStep,
          show: !state.moveQuestion.show,
          stepIndex: action.payload?.stepIndex ?? INITIAL_STATE.moveQuestion.stepIndex,
          questionIndex: action.payload?.questionIndex ?? INITIAL_STATE.moveQuestion.questionIndex,
        },
      };
    case formsTypes.MOVE_QUESTION:
      const movedQuestionSteps = [...state.form.steps];
      const question = movedQuestionSteps[action.payload.stepIndex]?.questions.splice(action.payload.questionIndex, 1)[0];
      movedQuestionSteps[action.payload.newStepPosition.value]?.questions.splice(action.payload.newQuestionPosition.value, 0, question);
      return {
        ...state,
        moveQuestion: INITIAL_STATE.moveQuestion,
        form: {
          ...state.form,
          steps: movedQuestionSteps,
        },
      };
    case formsTypes.EDIT_QUESTION:
      return {
        ...state,
        form: {
          ...state.form,
          steps: action.payload.steps,
        },
      };
    case formsTypes.HANDLE_ANSWER_TYPE_MODAL:
      return {
        ...state,
        answerType: {
          ...state.answerType,
          show: !state.answerType.show,
          stepIndex: action.payload?.stepIndex ?? INITIAL_STATE.answerType.stepIndex,
          questionIndex: action.payload?.questionIndex ?? INITIAL_STATE.answerType.questionIndex,
          answerType: action.payload?.answerType ?? INITIAL_STATE.answerType.answerType,
        },
      };
    case formsTypes.EDIT_ANSWER_TYPE:
      return {
        ...state,
        form: {
          ...state.form,
          steps: action.payload.steps,
        },
        answerType: INITIAL_STATE.answerType,
      };
    case formsTypes.ADD_ANSWER_OPTION:
      const newOption = {
        ...newOptionTemplate,
        key: `step-${Date.now()}`,
      };
      const answerOptionSteps = [...state.form.steps];
      answerOptionSteps[action.payload.stepIndex]
        .questions[action.payload.questionIndex]
        .answerOptions.push(newOption);
      return {
        ...state,
        form: {
          ...state.form,
          steps: answerOptionSteps,
        },
      };
    case formsTypes.DELETE_ANSWER_OPTION:
      const deletedOptionSteps = [...state.form.steps];
      deletedOptionSteps[action.payload.stepIndex]
        .questions[action.payload.questionIndex]
        .answerOptions.splice(action.payload.optionIndex, 1);
      return {
        ...state,
        form: {
          ...state.form,
          steps: deletedOptionSteps,
        },
      };
    case formsTypes.EDIT_OPTION:
      return {
        ...state,
        form: {
          ...state.form,
          steps: action.payload.steps,
        },
      };
    case formsTypes.MOVE_OPTION:
      const movedOptionSteps = [...state.form.steps];
      const option = movedOptionSteps[action.payload.stepIndex]
        .questions[action.payload.questionIndex]
        .answerOptions.splice(action.payload.optionIndex, 1)[0];
      movedOptionSteps[action.payload.stepIndex]
        .questions[action.payload.questionIndex]
        .answerOptions.splice(action.payload.move, 0, option);
      return {
        ...state,
        moveStep: INITIAL_STATE.moveStep,
        form: {
          ...state.form,
          steps: movedOptionSteps,
        },
      };
    case formsTypes.HANDLE_SHARE_MODE:
      const { mode } = action.payload;
      return {
        ...state,
        form: {
          ...state.form,
          shareMode: mode,
          publicLink: { ...state.form.publicLink },
          sharedUsers: [...state.form.sharedUsers],
        },
      };
    case formsTypes.DUPLICATE_FORM:
      return {
        ...state,
        form: INITIAL_STATE.form,
        loading: true,
      };
    case formsTypes.CLEAR_CLONE_WARNING:
      return {
        ...state,
        creation: {
          ...state.creation,
          isAClone: false,
        },
      };
    default:
      return state;
  }
};

export default reducer;
