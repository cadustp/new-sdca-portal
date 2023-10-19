/* eslint-disable import/prefer-default-export */
import moment from '../timezones/moment';
import { STATUSES } from '../assets/constants';

const formatReportFilterParams = paramsObject => {
  const forms = paramsObject.selectedForms
    ? paramsObject.selectedForms.map(form => form.value)
    : null;

  const planUsers = paramsObject.planUsers
    ? paramsObject.planUsers.map(user => user.value)
    : null;

  const planStatuses = paramsObject.planStatuses
    ? paramsObject.planStatuses.map(statusItem => statusItem.value)
    : null;

  const startDate = paramsObject.selectedStartDate
    ? moment(paramsObject.selectedStartDate)
    : null;
  const endDate = paramsObject.selectedEndDate
    ? moment(paramsObject.selectedEndDate)
    : null;
  const { sendToEmail } = paramsObject;
  const statuses = paramsObject.selectedStatuses
    ? paramsObject.selectedStatuses
      .map(status => status.value)
      .filter(status => status !== STATUSES.RESCHEDULED.id)
    : null;

  const rescheduled = paramsObject.selectedStatuses
    ? paramsObject.selectedStatuses.filter(
      status => status.value === STATUSES.RESCHEDULED.id
    )
    : [];

  const groups = paramsObject.selectedGroups
    ? paramsObject.selectedGroups.map(group => group.value)
    : null;

  const appUsers = paramsObject.selectedAppUsers
    ? paramsObject.selectedAppUsers.map(appUser => appUser.value)
    : null;

  const valuatedUsers = paramsObject.selectedValuatedUsers
    ? paramsObject.selectedValuatedUsers.map(valuatedUser => valuatedUser.value)
    : null;

  const inputText = paramsObject.inputText && paramsObject.inputText.length > 0
    ? paramsObject.inputText.trim()
    : null;

  return {
    forms,
    startDate,
    endDate,
    statuses,
    rescheduled,
    groups,
    appUsers,
    valuatedUsers,
    inputText,
    sendToEmail,
    planUsers,
    planStatuses,
  };
};

const getArrayObjectValues = (arr) => {
  return arr.map(o => o.value);
}

const getArrayString = (list, stringName) => {
  return getArrayObjectValues(list).map(item => `&${stringName}[]=${item}`).join('');
}

export const stringfyActionPlansParams = paramsObject => {
  const {
    startRange,
    endRange,
    planUserIds,
    planUserGroupIds,
    assetIds,
    assetGroupIds,
    appUserIds,
    appUserGroupIds
  } = paramsObject;

  const url = [
    `?start_range=${startRange || ''}`,
    `&end_range=${endRange || ''}`,
    `${planUserIds ? getArrayString(planUserIds, 'plan_user_ids') : ''}`,
    `${planUserGroupIds ? getArrayString(planUserGroupIds, 'plan_user_group_ids') : ''}`,
    `${assetIds ? getArrayString(assetIds, 'asset_ids') : ''}`,
    `${assetGroupIds ? getArrayString(assetGroupIds, 'asset_group_ids') : ''}`,
    `${appUserIds ? getArrayString(appUserIds, 'app_user_ids') : ''}`,
    `${appUserGroupIds ? getArrayString(appUserGroupIds, 'app_user_group_ids') : ''}`,
  ].join('');

  return url;
};

export const stringfySearchParams = paramsObject => {
  const {
    forms,
    startDate,
    endDate,
    statuses,
    rescheduled,
    groups,
    appUsers,
    valuatedUsers,
    inputText,
    planUsers,
    planStatuses,
  } = formatReportFilterParams(paramsObject);

  const url = [
    `?forms=${forms ? forms.join(',') : ''}`,
    `&start_date=${startDate || ''}`,
    `&end_date=${endDate || ''}`,
    `&statuses=${statuses ? statuses.join(',') : ''}`,
    `&rescheduled=${rescheduled.length > 0}`,
    `&groups=${groups ? groups.join(',') : ''}`,
    `&app_users=${appUsers ? appUsers.join(',') : ''}`,
    `&valuated_users=${valuatedUsers ? valuatedUsers.join(',') : ''}`,
    `&input_text=${inputText || ''}`,
    `&plan_users=${planUsers || ''}`,
    `&plan_statuses=${planStatuses || ''}`,
  ].join('');

  return url;
};

export const prepareExportReportBody = (data, timezone) => {
  const {
    forms,
    statuses,
    rescheduled,
    groups,
    appUsers,
    valuatedUsers,
    inputText,
    sendToEmail,
  } = formatReportFilterParams(data);

  return {
    data: {
      start_date: data.startDate,
      end_date: data.endDate,
      report_type: data.reportType,
      plan_statuses: data.planStatuses,
      plan_users: data.planUsers,
      forms,
      statuses,
      rescheduled: rescheduled.length > 0,
      groups,
      app_users: appUsers,
      valuated_users: valuatedUsers,
      input_text: inputText,
      send_to_email: sendToEmail,
      timezone,
    },
  };
};
