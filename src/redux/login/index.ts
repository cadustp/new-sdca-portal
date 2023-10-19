import { Reducer } from 'redux';
import { loginTypes, LoginState } from './types';

const INITIAL_STATE: LoginState = {
  information: {},
  loginLoading: false,
  isLoading: false,
  isLogged: false,
  status: '',
  authError: false,
};

const reducer: Reducer<LoginState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case loginTypes.DO_LOGIN_REQUEST:
      return {
        ...state,
        loginLoading: true,
      };
    case loginTypes.DO_LOGIN_RESPONSE:
      return {
        ...state,
        loginLoading: false,
        status: action.payload.status,
      };
    case loginTypes.RESET_INSTRUCTIONS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case loginTypes.RESET_INSTRUCTIONS_RESPONSE:
      return {
        ...state,
        isLoading: false,
        status: action.payload.status,
      };
    case loginTypes.UPDATE_PASSWORD_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case loginTypes.UPDATE_PASSWORD_RESPONSE:
      return {
        ...state,
        isLoading: false,
        status: action.payload.status,
      };
    case loginTypes.SAVE_LOGGED_USER:
      return {
        ...state,
        isLogged: true,
        information: action.payload,
      };
    case loginTypes.CLEAR_STATUS:
      return {
        ...state,
        status: INITIAL_STATE.status,
        authError: INITIAL_STATE.authError,
      };
    case loginTypes.DO_LOGOUT:
      const authError = action.payload?.authError;
      return authError ? {
        ...state,
        information: INITIAL_STATE.information,
        loginLoading: INITIAL_STATE.loginLoading,
        isLoading: INITIAL_STATE.isLoading,
        isLogged: INITIAL_STATE.isLogged,
        status: INITIAL_STATE.status,
        authError,
      } : INITIAL_STATE;
    default:
      return state;
  }
};

export default reducer;
