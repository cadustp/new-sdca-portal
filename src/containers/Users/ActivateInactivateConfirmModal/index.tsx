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
  usersNumber: number,
  type: string,
  action: string,
  userName: string,
};

type DispatchProps = {
  onClose: Function;
  onConfirm: Function,
};

const ActivateInactivateConfirmModal: React.FC<Props & DispatchProps & StateProps> = ({
  intl,
  title,
  isOpen,
  usersNumber,
  type,
  action,
  onClose,
  onConfirm,
  userName,
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
        captureEvent('closeActivateUsers');
      }}
      centerTitle
    >
      <>
        <Box>
          <Box display="flex" flexDirection="column" alignItems="center" my="40px">
            <p>
              {
                intl.messages['users.activateInactivateConfirmModal.content']
              }
              <span>
                {
                  usersNumber === 1 && userName
                    ? (
                      <span>
                        { ` ${action.toLowerCase()} ${intl.messages['users.activateInactivateConfirmModal.singleUser']} ` }
                        <strong>
                          { `${userName}` }
                        </strong>
                      </span>
                    )
                    : (
                      <strong>
                        { ` ${action.toLowerCase()} ${usersNumber.toString()} ${type} ` }
                      </strong>
                    )
                }
              </span>
              .
            </p>
            <p>
              {intl.messages['users.activateInactivateConfirmModal.continue']}
            </p>
          </Box>
        </Box>
        <Box display="flex" justifyContent="center" gridGap="1.5rem" className="modal-footer">
          <Button
            variant="outlined"
            onClick={() => {
              handleClose();
              captureEvent('cancelActivateUsers');
            }}
          >
            {intl.messages['users.activateInactivateConfirmModal.close']}
          </Button>
          <Button
            variant="contained"
            onClick={handleConfirm}
          >
            {intl.messages['users.activateInactivateConfirmModal.confirm']}
          </Button>
        </Box>
      </>
    </CustomModal>
  );
};

export default injectIntl(ActivateInactivateConfirmModal);
