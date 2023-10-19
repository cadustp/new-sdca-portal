import React from 'react';
import { injectIntl } from 'react-intl';
import { Box } from '@mui/material';
import CustomModal from '../../../components/CustomModal';
import Button from '../../../components/Button';
import { captureEvent } from '../../../analytics';

type Props = {
  intl: {
    messages: [];
  };
};

type StateProps = {
  title: string,
  isOpen: boolean,
  evaluatedsNumber: number,
  type: string,
  action: string,
};

type DispatchProps = {
  onClose: Function;
  onConfirm: Function,
};

const ActivateInactivateConfirmModal: React.FC<Props & DispatchProps & StateProps> = ({
  intl,
  title,
  isOpen,
  evaluatedsNumber,
  type,
  action,
  onClose,
  onConfirm,
}) => {
  const handleClose = () => {
    onClose();
  };

  const handleConfirm = () => {
    onConfirm();
  };
  return (
    <CustomModal
      title={title}
      open={isOpen}
      onClose={() => {
        handleClose();
        captureEvent('closeActivateEvaluateds');
      }}
      centerTitle
    >
      <>
        <Box>
          <Box display="flex" flexDirection="column" alignItems="center" my="40px">
            <p>
              {
                intl.messages['evaluateds.activateInactivateConfirmModal.content']
              }
              <strong>
                {
                  ` ${action.toLowerCase()} ${evaluatedsNumber.toString()} ${type}`
                }
              </strong>
              .
            </p>
            <p>
              {intl.messages['evaluateds.activateInactivateConfirmModal.continue']}
            </p>
          </Box>
        </Box>
        <Box display="flex" justifyContent="center" gridGap="1.5rem" className="modal-footer">
          <Button
            variant="outlined"
            onClick={() => {
              handleClose();
              captureEvent('cancelActivateEvaluateds');
            }}
          >
            {intl.messages['evaluateds.activateInactivateConfirmModal.close']}
          </Button>
          <Button
            variant="contained"
            onClick={handleConfirm}
          >
            {intl.messages['evaluateds.activateInactivateConfirmModal.confirm']}
          </Button>
        </Box>
      </>
    </CustomModal>
  );
};

export default injectIntl(ActivateInactivateConfirmModal);
