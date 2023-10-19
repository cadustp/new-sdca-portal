import React, { useState, useEffect } from 'react';
import moment from '../../../../../timezones/moment';
import CustomModal from '../../../../../components/CustomModal';
import SelectInput from '../../../../../components/SelectInput';
import EmailInput from '../../../../../components/EmailInput';
import Button from '../../../../../components/Button';
import { ACTION_PLAN_STATUSES } from '../../../../../helpers/consts';
import { ExportReportModalTypes } from './index';
import {
  DateText,
  StyledAlertsContainer,
  StyledButtonDiv,
  StyledFormDiv,
  StyledItemContainer,
} from './styles';
import { captureEvent } from '../../../../../analytics';

export default function ExportReportModal({
  intl,
  startDate,
  endDate,
  open,
  handleCloseExportModal,
  loading,
  exportReport,
  selectedUsers,
  loggedUser,
}: ExportReportModalTypes): JSX.Element {
  moment.locale(intl.locale);

  const initialState = {
    selectedStatus: [],
    selectedStatusError: false,
    selectedStartDate: null,
    selectedEndDate: null,
    email: '',
  };

  const [exportState, setExportState] = useState(initialState);

  const getStatusChange = (selected: any) => {
    setExportState({
      ...exportState,
      selectedStatus: selected,
      selectedStatusError: false,
    });
  };

  const handleEmailChange = (e: any) => {
    setExportState({ ...exportState, email: e.target.value });
  };

  const handleClose = () => {
    setExportState(initialState);
    handleCloseExportModal();
  };

  const handleExport = () => {
    const { email, selectedStatus } = exportState;

    const plansStatusesIds: any[] = [];

    if (selectedStatus) {
      selectedStatus.map((status: any) => {
        plansStatusesIds.push(status.id);
      });
    }

    let sendToEmail;
    if (email.length) {
      sendToEmail = email;
    }
    const actionPlanData = {
      startDate,
      endDate,
      reportType: 8,
      planStatuses: plansStatusesIds || null,
      planUsers: selectedUsers || null,
      forms: null,
      statuses: null,
      rescheduled: null,
      groups: null,
      appUsers: null,
      valuatedUsers: null,
      inputText: null,
      sendToEmail,
    };
    exportReport({ reportData: actionPlanData, user: loggedUser });
  };

  const { selectedStatus, selectedStatusError } = exportState;

  const statusTypes = Object.keys(ACTION_PLAN_STATUSES).map(key => ({
    id: ACTION_PLAN_STATUSES[key].code,
    value: key,
    label: ACTION_PLAN_STATUSES[key].name,
  }));

  const reportItems = statusTypes.map(type => ({
    id: type.id,
    value: type.value,
    label: intl.formatMessage({ id: `action_plan.${type.label}` }),
  }));

  const isDateSelected = startDate && endDate;

  return (
    <>
      <CustomModal
        open={open}
        onClose={() => {
          handleClose();
          captureEvent('closeExportPDA');
        }}
        loading={loading}
        title={intl.formatMessage({ id: 'export_report.title' })}
      >
        <>
          <StyledFormDiv>
            <StyledAlertsContainer>
              <p className="message">
                {intl.formatMessage({
                  id: 'export_action_plan_report.filters_warning',
                })}
              </p>
            </StyledAlertsContainer>
            <StyledItemContainer>
              <SelectInput
                isMulti
                title={(
                  <p>
                    {intl.formatMessage({
                      id: 'export_report.status',
                    })}
                  </p>
                )}
                items={reportItems}
                placeholder={intl.formatMessage({
                  id: 'export_action_plan_report.report_placeholder',
                })}
                onChange={getStatusChange}
                selectedItem={selectedStatus}
                error={selectedStatusError}
              />
            </StyledItemContainer>
            <StyledItemContainer>
              <EmailInput
                placeholder={intl.formatMessage({
                  id: 'rel_export.email_placeholder',
                })}
                title={intl.formatMessage({
                  id: 'app_login.email',
                })}
                tooltip={intl.formatMessage({
                  id: 'rel_export.tooltip',
                })}
                errorMessage={intl.formatMessage({
                  id: 'rel_export.email_error_message',
                })}
                onChange={handleEmailChange}
              />
            </StyledItemContainer>
            <DateText>
              <h4>
                {intl.formatMessage({
                  id: 'export_report.date_label',
                })}
              </h4>
              {isDateSelected ? (
                <>
                  {`${moment(startDate).format('L')} - ${moment(endDate).format(
                    'L',
                  )}`}
                </>
              ) : (
                <div>
                  {intl.formatMessage({
                    id: 'export_report.no_date',
                  })}
                </div>
              )}
            </DateText>
          </StyledFormDiv>
          <StyledButtonDiv>
            <Button
              style={{ marginRight: 24 }}
              variant="outlined"
              onClick={() => {
                handleClose();
                captureEvent('cancelExportPDA');
              }}
            >
              {intl.formatMessage({
                id: 'export_report.cancel_button_label',
              })}
            </Button>
            <Button disabled={false} variant="contained" onClick={handleExport}>
              {intl.formatMessage({
                id: 'export_report.export_button_label',
              })}
            </Button>
          </StyledButtonDiv>
        </>
      </CustomModal>
    </>
  );
}
