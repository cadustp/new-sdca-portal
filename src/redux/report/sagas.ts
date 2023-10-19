import {
    takeLatest, put, call, select,
  } from 'redux-saga/effects';
  import { AnyAction } from 'redux';
  import {
    RESPONSE_STATUS, ORDER_TYPES, MAX_PER_PAGE, MAX_DAYS,
  } from '../../helpers/consts';
  import { ReportTypes } from './types';
  import { exportReportResponse } from './actions';
  import { captureEvent } from '../../analytics';
  import {
    fileFetcher
  } from "../../services/apiService";
  
  const initialDates = () => {
    let date = new Date();
    const startDateLimited = new Date(date.setDate(date.getDate() - MAX_DAYS)).toString();
    date = new Date();
    const endDateLimited = new Date(date.setDate(date.getDate() + MAX_DAYS)).toString();
  
    return {
      startDateLimited,
      endDateLimited
    }
  }

  const stringfyExportParams = paramsObject => {
    const { startDateLimited, endDateLimited } = initialDates();

    const {
      selectedName,
      selectedForms,
      selectedAppUsers,
      selectedStartDate,
      selectedEndDate,
      selectedValuatedUsers,
      selectedGroups,
      selectedStatuses,
    } = paramsObject;
    const url = [
      `&input_text=${selectedName || ''}`,
      `&app_users=${selectedAppUsers ? selectedAppUsers.map(user => user.value) : ''}`,
      `&valuated_users=${selectedValuatedUsers ? selectedValuatedUsers.map(evaluated => evaluated.value) : ''}`,
      `&forms=${selectedForms ? selectedForms.map(item => item.value) : ''}`,
      `&statuses=${selectedStatuses ? selectedStatuses.map(s => s.value) : ''}`,
      `&start_date=${selectedStartDate || startDateLimited}}`,
      `&end_date=${selectedEndDate || endDateLimited}`,
    ].join('');
    return url;
  };

   export function* exportAnswersRequest({
    payload,
  }: AnyAction) {

    const eventParams = {
      hasName: !!payload.inputSearchValue,
      hasForms: payload.form?.length,
      hasEvaluators: payload.appUser?.length,
      hasEvaluateds: payload.evaluatedUser?.length,
      hasStatus: payload.status?.map(s => s.key),
      hasDates: !!payload.startDate && !!payload.endDate,
    };
    try {
      const stringfiedParams = stringfyExportParams(payload);
      const url = `/report/export_answers?${stringfiedParams}`;
      const { data } = yield call(fileFetcher().get, url);
     
      yield put(exportReportResponse({
        exportObject: data,
        exportStatus: RESPONSE_STATUS.SUCCESS,
      }));
      captureEvent('exportReminders', { status: 'success', ...eventParams });
    } catch (error: any) {
      captureEvent('exportReminders', { status: 'error', ...eventParams, error: error.message });
      yield put(exportReportResponse({
        exportStatus: RESPONSE_STATUS.FAILURE,
        message: error.message,
      }));
    }
  };
  
  export function* exportScheduleRequest({
    payload,
  }: AnyAction) {
    const eventParams = {
      hasName: !!payload.inputSearchValue,
      hasForms: payload.form?.length,
      hasEvaluators: payload.appUser?.length,
      hasEvaluateds: payload.evaluatedUser?.length,
      hasStatus: payload.status?.map(s => s.key),
      hasDates: !!payload.startDate && !!payload.endDate,
    };
    try {
      const stringfiedParams = stringfyExportParams(payload);
      const url = `/report/export_schedule?${stringfiedParams}`;
      const { data } = yield call(fileFetcher().get, url);
     
      yield put(exportReportResponse({
        exportObject: data,
        exportStatus: RESPONSE_STATUS.SUCCESS,
      }));
      captureEvent('exportReminders', { status: 'success', ...eventParams });
    } catch (error: any) {
      captureEvent('exportReminders', { status: 'error', ...eventParams, error: error.message });
      yield put(exportReportResponse({
        exportStatus: RESPONSE_STATUS.FAILURE,
        message: error.message,
      }));
    }
  };
  
  export default [
    takeLatest(
      ReportTypes.EXPORT_SCHEDULE_REQUEST,
      exportScheduleRequest,
    ),
    takeLatest(
      ReportTypes.EXPORT_ANSWERS_REQUEST,
      exportAnswersRequest,
    )
  ];
  