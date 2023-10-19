export enum ReportTypes {
    EXPORT_ANSWERS_REQUEST = 'EXPORT_ANSWERS_REQUEST',
    EXPORT_SCHEDULE_REQUEST = 'EXPORT_SCHEDULE_REQUEST',
    EXPORT_REPORT_REQUEST_SUCCESS = 'EXPORT_REPORT_REQUEST_SUCCESS',
    CLEAR_EXPORT_STATUS = 'CLEAR_EXPORT_STATUS',
    EXPORT_REPORT_RESPONSE = 'EXPORT_REPORT_RESPONSE'
  };
  export interface ReportState {
    exportStatus: string,
    message: String,
    isLoading: Boolean,
    exportObject: Object,
  };
  