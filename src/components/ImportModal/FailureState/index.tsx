import React from 'react';
import { injectIntl } from 'react-intl';
import { ErrorOutline } from '@mui/icons-material';
import { ReactComponent as ErrorIcon } from '../../../assets/icons/error-page-icon.svg';
import Button from '../../Button';
import '../styles.css';
import { captureEvent } from '../../../analytics';

type Props = {
  intl: {
    messages: [];
    formatMessage: Function,
  };
};

type StateProps = {
  importErrors: [],
  tryAgain: Function,
};

const FailureState: React.FC<Props & StateProps> = ({
  intl,
  importErrors,
  tryAgain,
}) => {
  const Errors = ({ errors }) => (errors.map(error => (
    <>
      <div key={error.row} className="error-message-container">
        <ErrorOutline style={{ color: '#CD6566' }} />
        <p className="import-error-message">
          {intl.formatMessage(
            { id: 'import.error.row' },
            { row: error.row, error: error.error },
          )}
        </p>
      </div>
      <div className="message-separator" />
    </>
  )));

  return (
    <>
      <p id="import-error-instructions">
        {importErrors.length !== 0
          ? intl.messages['import.error.instructions.rows']
          : intl.messages['import.error.instructions']}
      </p>
      <ErrorIcon height="250" width="250" />
      <Button
        fullwith
        variant="contained"
        onClick={() => {
          tryAgain();
          captureEvent('tryAgain');
        }}
      >
        { intl.messages['import.error.tryAgain'] }
      </Button>
      <Errors errors={importErrors} />
    </>
  );
};

export default injectIntl(FailureState);
