const name = 'app';

export const types = {
  SHOW_NOTIFICATION: `${name}/SHOW_NOTIFICATION`,
  CLOSE_NOTIFICATION: `${name}/CLOSE_NOTIFICATION`,
  SHOW_LOADING: `${name}/SHOW_LOADING`,
};

const initialState = {
  showLoading: false,
  notification: {
    show: false,
    message: '',
    variant: 'info',
    duration: 6000,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SHOW_NOTIFICATION:
      return {
        ...state,
        notification: {
          ...state.notification,
          show: true,
          message: action.payload.message,
          variant: action.payload.variant,
          duration: action.payload.duration,
        },
      };
    case types.CLOSE_NOTIFICATION:
      return {
        ...state,
        notification: {
          ...state.notification,
          show: false,
        },
      };
    case types.SHOW_LOADING:
      return {
        ...state,
        showLoading: action.payload.open,
      };
    default:
      return state;
  }
};

export const showLoading = open => ({
  type: types.SHOW_LOADING,
  payload: { open },
});

export const showNotification = ({
  message,
  variant,
  duration = initialState.notification.duration,
}) => ({
  type: types.SHOW_NOTIFICATION,
  payload: { message, variant, duration },
});

export const closeNotification = () => ({
  type: types.CLOSE_NOTIFICATION,
});
