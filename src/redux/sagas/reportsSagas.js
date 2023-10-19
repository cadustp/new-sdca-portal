import { takeLatest, put, call } from 'redux-saga/effects';
import parse from 'parse-link-header';

import apiService from '../../services/apiService';
import {
  stringfySearchParams,
  prepareExportReportBody,
} from '../../helpers/api_service_helper';

import {
  Types,
  searchReportsFailure,
  searchReportsSuccess,
  searchPaginatedReportsSuccess,
  requestReportExportFailure,
  openSnackbar,
  requestReportExportSuccess,
  closeExportModal,
} from '../actions/reports-actions';
import { captureEvent } from '../../analytics';

export function* searchPaginatedReportsRequest({
  payload: { params, paginate = true, page = 2 },
}) {
  const eventParams = {
    forms: params.selectedForms?.length || 0,
    dateRange: !!params.selectedStartDate,
    statuses: params.selectedStatuses?.map(s => s.value).join(', ') || '-',
    groups: params.selectedGroups?.length || 0,
    evaluators: params.selectedAppUsers?.length || 0,
    evaluateds: params.selectedValuatedUsers?.length || 0,
  };
  try {
    const stringfiedParams = stringfySearchParams(params);
    const url = `/reminders${stringfiedParams}&page=${page}&per_page=50`;

    const { headers, data } = yield call(apiService.get, url);
    const parsedLinkHeader = parse(headers.link);
    const totalCount = headers['x-total-count'];

    const pagination = { total: totalCount, links: parsedLinkHeader };

    if (page >= 2) {
      yield put(
        searchPaginatedReportsSuccess({
          pagination,
          data,
        })
      );
    } else {
      yield put(
        searchReportsSuccess({
          pagination,
          data,
        })
      );
    }

    captureEvent('filterReports', { ...eventParams, status: 'success' });
    return data;
  } catch (error) {
    yield put(searchReportsFailure());
    captureEvent('filterReports', { ...eventParams, status: 'error', error: error.message });
  }
}

export function* exportReport({ payload: { reportData, user } }) {
  let eventParams = {
    type: reportData.reportType,
    dateRange: !!reportData.startDate,
    email: reportData.sendToEmail || '-',
  };
  if (reportData.reportType === 8) {
    eventParams = {
      ...eventParams,
      statuses: reportData.planStatuses?.join(', ') || '-',
      filteredEvaluators: reportData.planUsers?.length || 'all',
    };
  } else {
    eventParams = {
      ...eventParams,
      evaluators: reportData.selectedAppUsers?.length || 0,
      forms: reportData.selectedForms?.length || 0,
      groups: reportData.selectedGroups?.length || 0,
      statuses: reportData.selectedStatuses?.map(s => s.value).join(', ') || '-',
      evaluateds: reportData.selectedValuatedUsers?.length || 0,
    };
  }
  const eventName = reportData.reportType === 8 ? 'exportActionPlanData' : 'exportReports';
  try {
    const reportExportUrl = '/report/export';
    const { timezone } = user;

    const body = prepareExportReportBody(reportData, timezone);

    const { data } = yield call(apiService.post, reportExportUrl, body);

    captureEvent(eventName, { ...eventParams, status: 'success' });
    yield put(requestReportExportSuccess(data));
    yield put(openSnackbar('exportSnackbar'));
    yield put(closeExportModal());
  } catch (error) {
    yield put(requestReportExportFailure(error));
    captureEvent(eventName, { ...eventParams, status: 'error', message: error });
    yield put(openSnackbar('exportSnackbar'));
  }
}

export default [
  takeLatest(Types.SEARCH_REPORTS_REQUEST, searchPaginatedReportsRequest),
  takeLatest(
    Types.SEARCH_PAGINATED_REPORTS_REQUEST,
    searchPaginatedReportsRequest
  ),
  takeLatest(Types.REPORT_EXPORT_REQUEST, exportReport),
];
