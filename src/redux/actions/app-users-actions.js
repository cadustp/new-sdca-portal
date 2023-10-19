export const Types = {
  LOAD_APP_USERS_REQUEST: 'LOAD_APP_USERS_REQUEST',
  LOAD_APP_USERS_SUCCESS: 'LOAD_APP_USERS_SUCCESS',
  LOAD_APP_USERS_FAILURE: 'LOAD_APP_USERS_FAILURE'
};

export const loadAppUsersSuccess = appUsers => ({
  type: Types.LOAD_APP_USERS_SUCCESS,
  payload: appUsers
});

export const loadAppUsersFailure = error => ({
  type: Types.LOAD_APP_USERS_FAILURE,
  payload: {
    error
  }
});
