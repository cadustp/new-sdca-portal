import React, { useState, useRef, useEffect } from 'react';
import { injectIntl } from 'react-intl';
import { CloudDownload } from '@material-ui/icons';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import { ReactComponent as ExcelIcon } from '../../assets/icons/excel-icon.svg';
import CustomModal from '../CustomModal';
import Button from '../Button';
import CustomSnackbar from '../shared/CustomSnackbar/CustomSnackbar';

import './styles.css';
import FailureState from './FailureState';
import { IMPORT_TYPES, RESPONSE_STATUS } from '../../helpers/consts';
import { captureEvent } from '../../analytics';

type Props = {
  intl: {
    messages: {
      import: 'import',
      instructions: 'import.instructions'
    };
    locale: string,
    formatMessage: Function;
  };
};

type StateProps = {
  open: boolean,
  title: string,
  importType: string,
  importStatus: string,
  importRowErrors: []
  hasEmailField: false,
};

type DispatchProps = {
  onClose: () => void;
  handleUpdateRequest: () => void;
  importRequest: Function;
  clearStatus: Function;
};

const ImportModal: React.FC<Props & StateProps & DispatchProps> = ({
  open,
  intl,
  importType,
  importRequest,
  importStatus,
  importRowErrors,
  clearStatus,
  handleUpdateRequest,
  onClose,
  hasEmailField,
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const handleEmailChange = e => {
    const email = e.target.value;
    if (email.length) {
      const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const validate = regex.test(String(email).toLowerCase());
      setEmailError(!validate);
      setEmail(email);
    } else {
      setEmailError(false);
    }
  };

  useEffect(() => {
    if (selectedFile) {
      if (hasEmailField) {
        importRequest({ selectedFile, email });
      } else {
        importRequest(selectedFile);
      }
    }
  }, [selectedFile]);

  useEffect(() => {
    if (importStatus === RESPONSE_STATUS.SUCCESS) {
      if (importRowErrors.length === 0) {
        onClose();
      }
      handleUpdateRequest();
    }
  }, [importStatus]);

  const handleModalTitle = () => {
    if (importStatus === RESPONSE_STATUS.FAILURE) {
      return intl.messages['import.error.title'];
    } if (importRowErrors.length !== 0) {
      return intl.messages['import.row.errors.title'];
    }
    return intl.messages.import;
  };

  const handleTemplateTitle = iType => {
    switch (iType) {
      case IMPORT_TYPES.GROUPS:
        return intl.messages['groups.title'];
      case IMPORT_TYPES.USERS:
        return intl.messages['users.title'];
      case IMPORT_TYPES.EVALUATEDS:
        return intl.messages['evaluateds.title'];
      case IMPORT_TYPES.REMINDERS:
        return intl.messages['reminders.title'];
      default:
        break;
    }
  };

  const handleDownload = iType => {
    let key;
    switch (iType) {
      case IMPORT_TYPES.GROUPS:
        key = 'import.template.groups';
        break;
      case IMPORT_TYPES.USERS:
        key = 'import.template.users';
        break;
      case IMPORT_TYPES.EVALUATEDS:
        key = 'import.template.evaluateds';
        break;
      case IMPORT_TYPES.REMINDERS:
        key = 'import.template.reminders';
        break;
      default:
        break;
    }
    const isStaging = process.env.REACT_APP_ENVIRONMENT === 'STAGING';
    return `https://agenda-lider-${isStaging ? 'remodelagem-dev' : 'api-prod'}.s3-us-west-2.amazonaws.com/resources/import_templates_dayway/${intl.messages[key]}.xlsx`;
  };

  const handleClose = () => {
    onClose();
    clearStatus();
  };

  const FileUploader = ({ onFileSelectSuccess }) => {
    const fileInput = useRef<HTMLInputElement>(null);

    const handleFileInput = e => {
      onFileSelectSuccess(e.target.files[0]);
    };

    const onInputClick = () => {
      if (fileInput.current) fileInput.current.click();
    };

    return (
      <div className="file-uploader">
        {
          hasEmailField
          && (
          <div>
            <div>
              <p>
                {intl.messages['import.notify']}
              </p>
            </div>
            <EmailSection>
              <TextField
                fullWidth
                type="email"
                placeholder={intl.messages['app_login.email']}
                margin="normal"
                title=""
                error={emailError}
                defaultValue={email}
                onBlur={handleEmailChange}
              />
            </EmailSection>
          </div>
          )
        }
        <Button
          fullwith
          variant="contained"
          onClick={() => onInputClick()}
        >
          {intl.messages['import.start']}
        </Button>
        <input
          id="template-input-file"
          type="file"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .xlsx, .xls"
          onChange={handleFileInput}
          ref={fileInput}
        />
      </div>
    );
  };

  return (
    <>
      <CustomModal
        title={handleModalTitle()}
        open={open}
        onClose={() => {
          handleClose();
          captureEvent('closeImport');
        }}
      >
        <div className="modal-container">
          {importStatus !== RESPONSE_STATUS.FAILURE && importRowErrors.length === 0
            ? (
              <>
                <p id="import-instructions">{intl.messages['import.instructions']}</p>

                <div className="template-container">
                  <div id="template">
                    <ExcelIcon height="40" width="35" />
                    <p id="template-title">
                      {intl.formatMessage(
                        { id: 'import.template.title' },
                        { title: handleTemplateTitle(importType) },
                      )}
                    </p>
                  </div>
                  <a
                    href={handleDownload(importType)}
                    target="_blank"
                    onClick={
                      () => captureEvent('downloadTemplate', { kind: importType })
                    }
                  >
                    <CloudDownload
                      style={{ color: 'dark-grey', fontSize: '36' }}
                      fontSize="large"
                    />
                  </a>
                </div>

                <div className="import-button">
                  <FileUploader
                    onFileSelectSuccess={file => setSelectedFile(file)}
                  />
                </div>
              </>
            )
            : (
              <FailureState
                importErrors={importRowErrors}
                tryAgain={clearStatus}
              />
            )}
        </div>
      </CustomModal>
      {importRowErrors.length === 0
        ? (
          <CustomSnackbar
            data={{
              message: intl.messages['import.success'],
              type: 'success',
              open: importStatus === RESPONSE_STATUS.SUCCESS,
            }}
            handleClose={clearStatus}
          />
        )
        : null}
    </>
  );
};

export default injectIntl(ImportModal);

const EmailSection = styled.div`
  margin-bottom: 20px;
`;
