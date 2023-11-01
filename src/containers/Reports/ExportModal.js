import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { FormControlLabel, Switch } from '@mui/material';
import moment from '../../timezones/moment';
import { captureEvent } from '../../analytics';
import Button from '../../components/Button';
import CustomModal from '../../components/CustomModal';
import EmailInput from '../../components/EmailInput';
import SelectInput from '../../components/SelectInput';
import exporterService from '../../services/exporterService';
import {
  RESPONSE_STATUS,
  REPORT_TYPE_STATUSES,
} from '../../helpers/consts';
import { exportReport } from '../../redux/actions/reports-actions';
import {
  DateText,
  StyledAlertsContainer,
  StyledButtonDiv,
  StyledFormDiv,
  StyledItemContainer,
  WarningMessage,
} from './style';

function ExportModal({
  intl,
  sideFilterParams,
  exportReport,
  loggedUser,
  exportReportBackend,
  exportStatus,
  exportObject,
  clearExportStatus,
  open,
  data,
  loading,
  loadingReport,
  handleCloseModal,
}) {
  moment.locale(intl.locale);
  const [reportSync, setReportSync] = useState(false);
  const [exportState, setExportState] = useState({
    selectedReport: null,
    selectedStartDate: null,
    selectedEndDate: null,
    selectedReportError: false,
    selectedDateError: false,
    stateDirty: false,
    errorWarning: false,
    email: '',
  });

  const syncExportAvailable = [
    REPORT_TYPE_STATUSES.TYPES[0].label,
    REPORT_TYPE_STATUSES.TYPES[1].label,
  ].includes(exportState.selectedReport?.value);

  const isTypeReportSync = reportSync && syncExportAvailable;

  const getReportChange = selected => {
    setExportState({
      ...exportState,
      selectedReport: selected,
      selectedReportError: false,
    });
  };

  const handleDateChange = () => {
    const { selectedStartDate, selectedEndDate } = sideFilterParams;

    if (selectedEndDate && selectedStartDate) {
      const intervalInDays = selectedStartDate && selectedEndDate
        ? (Date.parse(selectedEndDate) - Date.parse(selectedStartDate))
            / (1000 * 3600 * 24)
        : 0;
      if (intervalInDays > 365) {
        setExportState({
          ...exportState,
          selectedDateError: true,
          errorWarning: true,
        });
      }
    }
  };

  useEffect(() => {
    if (exportStatus === RESPONSE_STATUS.SUCCESS) {
      exporterService({
        fileName: selectedReport.label,
        exportObject,
        clearCallBack: clearExportStatus,
      });
      handleCloseModal();
    }
  }, [exportStatus]);

  useEffect(() => {
    handleDateChange();
  }, [sideFilterParams.selectedStartDate, sideFilterParams.selectedEndDate]);

  const handleEmailChange = e => {
    setExportState({ ...exportState, email: e.target.value });
  };

  const sendReportRequestAsync = ({ email, selectedReport, ...exportState }) => {
    let sendToEmail;
    if (email.length) {
      sendToEmail = email;
    }
    const data = {
      startDate: moment(sideFilterParams.selectedStartDate)?.startOf('day'),
      endDate: moment(sideFilterParams.selectedEndDate)?.endOf('day'),
      reportType: selectedReport.id,
      selectedForms: sideFilterParams.selectedForms,
      selectedStatuses: sideFilterParams.selectedStatuses,
      selectedGroups: sideFilterParams.selectedGroups,
      selectedAppUsers: sideFilterParams.selectedAppUsers,
      selectedValuatedUsers: sideFilterParams.selectedValuatedUsers,
      sendToEmail,
    };
    exportReport({ reportData: data, user: loggedUser });
    setExportState({ ...exportState, stateDirty: true });
  };

  const sendReportRequestSync = selectedType => {
    exportReportBackend(selectedType);
  };

  const sendReportRequest = exportState => {
    const { selectedReport } = exportState;

    if (isTypeReportSync) return sendReportRequestSync(selectedReport.value);
    sendReportRequestAsync(exportState);
  };

  const handleExport = () => {
    const {
      selectedReport,
      selectedStartDate,
      selectedEndDate,
    } = exportState;

    const hasFilterAndSelectReportType = selectedReport
                                         && sideFilterParams.selectedStartDate
                                         && sideFilterParams.selectedEndDate;

    if (hasFilterAndSelectReportType) {
      sendReportRequest(exportState);
    } else {
      setExportState({
        ...exportState,
        selectedReportError: !selectedReport,
        selectedDateError: !(selectedStartDate && selectedEndDate),
      });
    }
  };

  const cleanState = () => setExportState({
    selectedReport: null,
    selectedStartDate: null,
    selectedEndDate: null,
    selectedReportError: false,
    selectedDateError: false,
    stateDirty: false,
    errorWarning: false,
    email: '',
  });

  const handleClose = () => {
    cleanState();
    handleCloseModal();
  };

  const {
    selectedReport,
    selectedReportError,
    selectedDateError,
    stateDirty,
  } = exportState;

  if (!open && stateDirty) {
    cleanState();
  }

  const isDatePresent = sideFilterParams.selectedStartDate && sideFilterParams.selectedEndDate;

  const isButtonDisabled = !isDatePresent || selectedDateError || !selectedReport;

  return (
    <CustomModal
      open={open}
      title={intl.messages['export_report.title']}
      onClose={() => {
        handleClose();
        captureEvent('closeExportReports');
      }}
      loading={loading || loadingReport}
    >
      <StyledFormDiv>
        <StyledAlertsContainer>
          <p className="message">
            {intl.messages['export_report.filters_warning']}
          </p>
        </StyledAlertsContainer>
        <StyledItemContainer>
          <SelectInput
            title={<p>{`* ${intl.messages['export_report.report_label']}`}</p>}
            items={data.reportItems}
            placeholder={intl.messages['export_report.report_placeholder']}
            onChange={getReportChange}
            selectedItem={selectedReport}
            error={selectedReportError}
          />
        </StyledItemContainer>
        {
          syncExportAvailable
            && (
            <StyledItemContainer>
              <FormControlLabel
                label={intl.messages.rel_direct_export}
                control={(
                  <Switch
                    onChange={e => {
                      setReportSync(e.target.checked);
                    }}
                    color="primary"
                    checked={reportSync}
                    value={reportSync}
                  />
                )}
              />
            </StyledItemContainer>
            )
        }
        {
          !isTypeReportSync
            && (
            <StyledItemContainer>
              <EmailInput
                placeholder={intl.messages['rel_export.email_placeholder']}
                title={intl.messages['app_login.email']}
                tooltip={intl.messages['rel_export.tooltip']}
                errorMessage={`* ${intl.messages['rel_export.email_error_message']}`}
                onChange={handleEmailChange}
              />
            </StyledItemContainer>
            )
        }
        <DateText>
          <h4>{intl.messages['export_report.date_label']}</h4>
          {isDatePresent ? (
            <>
              {moment(sideFilterParams.selectedStartDate).format('L')}
              {' '}
              -
              {' '}
              {moment(sideFilterParams.selectedEndDate).format('L')}
            </>
          ) : (
            <WarningMessage errorWarning>
              {intl.messages['export_report.date.error']}
            </WarningMessage>
          )}
        </DateText>

        {selectedDateError ? (
          <WarningMessage errorWarning>
            {`* ${intl.messages['export_report.max_period_message']}`}
          </WarningMessage>
        ) : null}
      </StyledFormDiv>
      <StyledButtonDiv>
        <Button
          style={{ marginRight: 24 }}
          variant="outlined"
          onClick={() => {
            handleClose();
            captureEvent('cancelExportReports');
          }}
        >
          {intl.messages['export_report.cancel_button_label']}
        </Button>
        <Button
          disabled={isButtonDisabled}
          variant="contained"
          onClick={handleExport}
        >
          {intl.messages['export_report.export_button_label']}
        </Button>
      </StyledButtonDiv>
    </CustomModal>
  );
}

ExportModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  intl: PropTypes.shape(),
  exportReportBackend: PropTypes.func,
  clearExportStatus: PropTypes.func,
  data: PropTypes.shape({
    reportItems: PropTypes.shape({
      value: PropTypes.number,
      label: PropTypes.string,
    }),
  }).isRequired,
  exportReport: PropTypes.func.isRequired,
  loggedUser: PropTypes.shape({
    email: PropTypes.string,
  }).isRequired,
  loadingReport: PropTypes.bool,
  loading: PropTypes.bool.isRequired,
};

ExportModal.defaultProps = {
  intl: null,
};

const mapStateToProps = state => ({
  loggedUser: state.login.information,
  loading: state.reportsReducer.loading,
  sideFilterParams: state.reportsReducer.sideFilterParams,
});

const mapDispatchToProps = dispatch => ({
  exportReport: ({ reportData, user }) => dispatch(exportReport({ reportData, user })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(ExportModal));
