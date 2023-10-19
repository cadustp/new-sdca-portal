import { Reducer } from 'redux';
import { ReportState, ReportTypes } from './types';

const INITIAL_STATE: ReportState = {
  exportObject: new Blob(),
  exportStatus: "",
  message: "",
  isLoading: false,
};

const reducer: Reducer<ReportState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
 
    case ReportTypes.EXPORT_SCHEDULE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ReportTypes.EXPORT_ANSWERS_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case ReportTypes.CLEAR_EXPORT_STATUS:
      return {
        ...state,
        exportObject: new Blob(),
        exportStatus: INITIAL_STATE.exportStatus,
        message: INITIAL_STATE.message,
      };
    case ReportTypes.EXPORT_REPORT_RESPONSE:
      return {
        ...state,
        exportObject: action.payload.exportObject || new Blob(),
        exportStatus: action.payload.exportStatus,
        message: action.payload.message,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default reducer;
