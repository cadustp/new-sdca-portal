/*
 * action types
 */
export const Types = {
  LOAD_STATUS_TYPES_SUCCESS: 'LOAD_STATUS_TYPES_SUCCESS',
  LOAD_STATUS_TYPES_FAILURE: 'LOAD_STATUS_TYPES_FAILURE',
  REPORT_EXPORT_REQUEST: 'REPORT_EXPORT_REQUEST',
  REPORT_EXPORT_SUCCESS: 'REPORT_EXPORT_SUCCESS',
  REPORT_EXPORT_FAILURE: 'REPORT_EXPORT_FAILURE',
  TOGGLE_EXPORT_BUTTON: 'TOGGLE_EXPORT_BUTTON',
  OPEN_SNACKBAR: 'OPEN_SNACKBAR',
  CLOSE_SNACKBAR: 'CLOSE_SNACKBAR',
  OPEN_EXPORT_MODAL: 'OPEN_EXPORT_MODAL',
  CLOSE_EXPORT_MODAL: 'CLOSE_EXPORT_MODAL',
  UPDATE_FILTER_PARAMS: 'UPDATE_FILTER_PARAMS',
  CLEAR_FILTER_PARAMS: 'CLEAR_FILTER_PARAMS',
  SEARCH_REPORTS_REQUEST: 'SEARCH_REPORTS_REQUEST',
  SEARCH_REPORTS_SUCCESS: 'SEARCH_REPORTS_SUCCESS',
  SEARCH_PAGINATED_REPORTS_REQUEST: 'SEARCH_PAGINATED_REPORTS_REQUEST',
  SEARCH_PAGINATED_REPORTS_SUCCESS: 'SEARCH_PAGINATED_REPORTS_SUCCESS',
  SEARCH_REPORTS_FAILURE: 'SEARCH_REPORTS_FAILURE',
  UPDATE_INPUT_TEXT: 'UPDATE_INPUT_TEXT',
  SET_EMPTY_STATE_TRUE: 'SET_EMPTY_STATE_TRUE',
  UPDATE_EXPORT_FILTER: 'UPDATE_EXPORT_FILTER',
  CLEAR_SEARCH_REPORTS: 'CLEAR_SEARCH_REPORTS',
};

/*
 * action creators
 */
export const loadStatusTypesSuccess = statusTypes => ({
  type: Types.LOAD_STATUS_TYPES_SUCCESS,
  payload: statusTypes,
});

export const loadStatusTypesFailure = error => ({
  type: Types.LOAD_STATUS_TYPES_FAILURE,
  payload: {
    error,
  },
});

export const loadExportFilters = () => ({
  type: Types.LOAD_EXPORT_FILTERS,
});

export const updateExportFilters = selected => ({
  type: Types.UPDATE_EXPORT_FILTER,
  payload: selected,
});

export const requestReportExportSuccess = response => ({
  type: Types.REPORT_EXPORT_SUCCESS,
  payload: response,
});

export const requestReportExportFailure = error => ({
  type: Types.REPORT_EXPORT_FAILURE,
  payload: {
    error,
  },
});

export const openSnackbar = snackbar => ({
  type: Types.OPEN_SNACKBAR,
  payload: snackbar,
});

export const closeSnackbar = snackbar => ({
  type: Types.CLOSE_SNACKBAR,
  payload: snackbar,
});

export const toggleExportButton = () => ({
  type: Types.TOGGLE_EXPORT_BUTTON,
});

export const openExportModal = () => ({
  type: Types.OPEN_EXPORT_MODAL,
});

export const closeExportModal = () => ({
  type: Types.CLOSE_EXPORT_MODAL,
});

export const exportReport = ({ reportData, user }) => ({
  type: Types.REPORT_EXPORT_REQUEST,
  payload: { reportData, user },
});

export const updateFilterParams = (dispatch, params) => {
  if (params.selectedReminderType) {
    dispatch(updateExportFilters(params));
  }
  return {
    type: Types.UPDATE_FILTER_PARAMS,
    payload: params,
  };
};

export const clearFilterParams = () => ({
  type: Types.CLEAR_FILTER_PARAMS,
});

export const searchReportsSuccess = reports => ({
  type: Types.SEARCH_REPORTS_SUCCESS,
  payload: reports,
});

export const searchPaginatedReportsSuccess = reports => ({
  type: Types.SEARCH_PAGINATED_REPORTS_SUCCESS,
  payload: reports,
});

export const searchReportsFailure = () => ({
  type: Types.SEARCH_REPORTS_FAILURE,
});

export const fetchReports = requestData => ({
  type: Types.SEARCH_REPORTS_REQUEST,
  payload: requestData,
});

export const fetchReportsWithPagination = requestData => ({
  type: Types.SEARCH_PAGINATED_REPORTS_REQUEST,
  payload: requestData,
});

export const clearSearchReports = () => ({
  type: Types.CLEAR_SEARCH_REPORTS,
});

export const updateInputText = text => ({
  type: Types.UPDATE_INPUT_TEXT,
  payload: text,
});

export const setEmptyStateTrue = () => ({
  type: Types.SET_EMPTY_STATE_TRUE,
});
