import React from 'react';
import { injectIntl } from 'react-intl';
import CustomModal from '../CustomModal';
import './styles.css';

import Button from '../Button';
import { captureEvent } from '../../analytics';
import { IMPORT_TYPES } from '../../helpers/consts';

type Props = {
  intl: {
    messages: [];
    formatMessage: Function;
  };
};

type StateProps = {
  open: boolean,
  type: string,
};

type DispatchProps = {
  onConfirm: () => void;
  onClose: () => void;
  openFilters: () => void;
};

const ExportModal: React.FC<Props & StateProps & DispatchProps> = ({
  intl,
  onConfirm,
  onClose,
  openFilters,
  open,
  type,
}) => {
  const handleOpenFilters = () => {
    openFilters();
    onClose();
    captureEvent('openFilters');
  };

  const handleTemplateTitle = () => {
    let title = '';
    switch (type) {
      case IMPORT_TYPES.GROUPS:
        title = 'groups.title';
        break;
      case IMPORT_TYPES.USERS:
        title = 'users.title';
        break;
      case IMPORT_TYPES.EVALUATEDS:
        title = 'evaluateds.title';
        break;
      case IMPORT_TYPES.REMINDERS:
        title = 'reminders.title';
        break;
      default:
        break;
    }
    return intl.formatMessage({ id: 'export.title' }, { type: intl.messages[title] });
  };

  return (
    <>
      <CustomModal
        title={handleTemplateTitle()}
        open={open}
        onClose={() => {
          onClose();
          captureEvent('closeExport');
        }}
        centerTitle
      >
        <div className="export-container">
          <p>{intl.messages['export.instructions1']}</p>
          <p>{intl.messages['export.instructions2']}</p>
          <div className="export-buttons">
            <Button
              variant="outlined"
              onClick={handleOpenFilters}
            >
              {intl.messages['export.filters']}
            </Button>

            <Button
              variant="contained"
              onClick={onConfirm}
            >
              {intl.messages['export.confirm']}
            </Button>
          </div>
        </div>
      </CustomModal>
    </>
  );
};

export default injectIntl(ExportModal);
