import { action } from 'typesafe-actions';
import { ReportTypes } from './types';

export const exportRemindersSuccess = ({
  exportObject
}) => action(ReportTypes.EXPORT_REPORT_REQUEST_SUCCESS, exportObject);
export const exportScheduleRequest = payload => action(ReportTypes.EXPORT_SCHEDULE_REQUEST, payload);
export const exportAnswersRequest = payload => action(ReportTypes.EXPORT_ANSWERS_REQUEST, payload);
export const exportReportResponse = payload => action(ReportTypes.EXPORT_REPORT_RESPONSE, payload);
export const clearExportStatus = () => action(ReportTypes.CLEAR_EXPORT_STATUS);

