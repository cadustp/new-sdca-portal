import { Types } from '../actions/reports-actions';
import { loginTypes } from '../login/types.ts';
import { REPORT_TYPE_STATUSES } from '../../helpers/consts';

const initialState = {
  reports: {
    data: [],
    pagination: {},
  },
  reportTypes: REPORT_TYPE_STATUSES.TYPES,
  snackbarState: {
    context: null,
    type: '',
    open: false,
  },
  loading: false,
  searchLoading: false,
  infiniteLoading: false,
  failure: false,
  sideFilterParams: {
    selectedForms: null,
    selectedStartDate: null,
    selectedEndDate: null,
    selectedStatuses: null,
    selectedGroups: null,
    selectedAppUsers: null,
    selectedValuatedUsers: null,
  },
  inputText: null,
  noSearches: true,
  exportReportTypes: REPORT_TYPE_STATUSES.TYPES,
  exportStatusTypes: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Types.SEARCH_REPORTS_REQUEST:
      return {
        ...state,
        searchLoading: true,
        noSearches: false,
      };
    case Types.SEARCH_PAGINATED_REPORTS_REQUEST:
      return {
        ...state,
        searchLoading: true,
        noSearches: true,
        infiniteLoading: true,
      };
    case Types.CLEAR_SEARCH_REPORTS:
      return {
        ...state,
        reports: {
          ...state.reports,
          data: [],
        },
      };
    case Types.SEARCH_PAGINATED_REPORTS_SUCCESS:
      return {
        ...state,
        reports: {
          ...state.reports,
          data: [...state.reports.data, ...action.payload.data],
          pagination: action.payload.pagination,
        },
        searchLoading: false,
        failure: false,
        infiniteLoading: false,
      };
    case Types.SEARCH_REPORTS_SUCCESS:
      return {
        ...state,
        reports: {
          ...state.reports,
          data: [...action.payload.data],
          pagination: action.payload.pagination,
        },
        searchLoading: false,
        failure: false,
      };
    case Types.SEARCH_REPORTS_FAILURE:
      return { ...state, searchLoading: false, failure: true };
    case Types.REPORT_EXPORT_REQUEST:
      return {
        ...state,
        loading: true,
        isSnackbarOpened: false,
      };
    case Types.REPORT_EXPORT_SUCCESS:
      return { ...state, loading: false, failure: false };
    case Types.REPORT_EXPORT_FAILURE:
      return { ...state, loading: false, failure: true };
    case Types.TOGGLE_EXPORT_BUTTON:
      return { ...state, exportModalOpened: !state.exportModalOpened };
    case Types.OPEN_EXPORT_MODAL:
      return { ...state, exportModalOpened: true };
    case Types.CLOSE_EXPORT_MODAL:
      return { ...state, exportModalOpened: false };
    case Types.UPDATE_FILTER_PARAMS:
      return {
        ...state,
        sideFilterParams: { ...state.sideFilterParams, ...action.payload },
      };
    case Types.CLEAR_FILTER_PARAMS:
      return {
        ...state,
        sideFilterParams: initialState.sideFilterParams,
        reports: { data: [], pagination: {} },
        noSearches: true,
        exportReportTypes: state.reportTypes,
      };
    case Types.OPEN_SNACKBAR:
      return {
        ...state,
        snackbarState: {
          ...state.snackbarState,
          context: action.payload,
          open: true,
        },
      };
    case Types.CLOSE_SNACKBAR:
      return {
        ...state,
        snackbarState: { ...state.snackbarState, open: false },
      };
    case Types.UPDATE_INPUT_TEXT:
      return { ...state, inputText: action.payload };
    case loginTypes.DO_LOGOUT:
      return initialState;
    case Types.SET_EMPTY_STATE_TRUE:
      return {
        ...state,
        reports: { data: [], pagination: {} },
        noSearches: true,
      };
    case Types.UPDATE_EXPORT_FILTER:
      const exportReportTypes = [];
      const { reportTypes } = state;
      const selectedReport = action.payload.selectedReminderType;
      if (selectedReport) {
        switch (selectedReport.value) {
          case 0:
            const actionPlanReportType = reportTypes.filter(
              report => report.label === 'REL_ACTION_PLANS'
                || report.label === 'REL_CANCELED'
                || report.label === 'REL_RESCHEDULEDS'
            );
            exportReportTypes.push(actionPlanReportType);
            return { ...state, exportReportTypes: exportReportTypes[0] };
          case 1:
            const feedbackReportType = reportTypes.filter(
              report => report.label === 'REL_FEEDBACKS'
                || report.label === 'REL_CANCELED'
                || report.label === 'REL_RESCHEDULEDS'
            );
            exportReportTypes.push(feedbackReportType);
            return { ...state, exportReportTypes: feedbackReportType };
          case 2:
            const othersReportType = reportTypes.filter(
              report => report.label === 'REL_ANSWERS'
                || report.label === 'REL_REPORT_SCHEDULES'
                || report.label === 'REL_CANCELED'
                || report.label === 'REL_RESCHEDULEDS'
            );
            exportReportTypes.push(othersReportType);
            return { ...state, exportReportTypes: othersReportType };
          default:
            return { ...state, exportReportTypes: reportTypes };
        }
      } else {
        return { ...state, exportReportTypes: reportTypes };
      }
    default:
      return state;
  }
};
