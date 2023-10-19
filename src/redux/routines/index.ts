import { Reducer } from 'redux';
import {
  RoutinesState, routinesTypes,
} from './types';

const INITIAL_STATE: RoutinesState = {
  loading: false,
  error: false,
  errorMessage: '',
  list: [],
  delete: {
    show: false,
    status: '',
    error: '',
  },
};

const reducer: Reducer<RoutinesState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case routinesTypes.LOAD_ALL_ROUTINES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case routinesTypes.LOAD_ALL_ROUTINES_RESPONSE:
      return {
        ...state,
        loading: false,
        list: action.payload.routines ?? [],
        error: !!action.payload.errorMessage,
        errorMessage: action.payload.errorMessage ?? state.errorMessage,
      };
    case routinesTypes.HANDLE_DELETE_ROUTINE_MODAL:
      return {
        ...state,
        delete: {
          ...state.delete,
          show: !state.delete.show,
        },
      };
    case routinesTypes.DELETE_ROUTINE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case routinesTypes.DELETE_ROUTINE_RESPONSE:
      return {
        ...state,
        list: action.payload.routines ?? state.list,
        delete: {
          ...state.delete,
          show: false,
          status: action.payload.status,
          error: action.payload.error,
        },
        loading: false,
      };
    case routinesTypes.CLEAR_DELETE_ROUTINE_STATUS:
      return {
        ...state,
        delete: INITIAL_STATE.delete,
      };
    case routinesTypes.ACTIVATE_PAUSE_ROUTINE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case routinesTypes.ACTIVATE_PAUSE_ROUTINE_RESPONSE:
      return {
        ...state,
        list: action.payload.routines ?? state.list,
        errorMessage: action.payload.error ?? state.errorMessage,
        loading: false,
      };
    case routinesTypes.CLEAR_ERROR_STATUS:
      return {
        ...state,
        errorMessage: INITIAL_STATE.errorMessage,
      };
    default:
      return state;
  }
};

export default reducer;
