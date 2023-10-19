import React from 'react';
import { injectIntl } from 'react-intl';
import { Box } from '@mui/material';

import Button from '../../../../components/Button';
import { captureEvent } from '../../../../analytics';

type Props = {
  intl: {
    messages: [],
    formatMessage: Function,
  };
};

type StateProps = {
  title: string,
  isOpen: boolean,
  users: Array<any>,
  usersNumber: number,
  type: string,
  deleteReminders: Function,
  selectReminders: Function,
  selectedReminders: Array<any>,
  action: string,
};

type DispatchProps = {
  onClose: Function;
  onConfirm: Function,
};

const DeleteReminderModal: React.FC<Props & DispatchProps & StateProps> = ({
  intl,
  type,
  selectedReminders,
  selectReminders,
  deleteReminders,
  action,
  onClose,
}) => {
  const handleClose = () => {
    selectReminders([]);
    onClose();
  };

  const handleConfirm = () => {
    handleClose();
    if (selectedReminders[0]?.id) {
      deleteReminders([selectedReminders[0].id]);
    } else {
      deleteReminders(selectedReminders);
    }
  };

  return (
    <>
      <Box>
        <Box display="flex" flexDirection="column" alignItems="center" my="20px">
          <p>
            {intl.formatMessage(
              { id: 'reminders.delete_reminder.modal.subtitle' },
              { reminders: selectedReminders.length },
            )}
          </p>
        </Box>
        <Box display="flex" flexDirection="column" alignItems="center" my="20px">
          <p>
            {intl.messages['reminders.delete_reminder.modal.description']}
          </p>
        </Box>
      </Box>
      <Box display="flex" justifyContent="center" gridGap="1.5rem" className="modal-footer">
        <Button
          variant="outlined"
          onClick={() => {
            handleClose();
            captureEvent('cancelDeleteSchedule');
          }}
        >
          {intl.messages['schedule.actions.cancel']}
        </Button>
        <Button
          variant="contained"
          onClick={handleConfirm}
        >
          {intl.messages['schedule.actions.confirm']}
        </Button>
      </Box>
    </>
  );
};

export default injectIntl(DeleteReminderModal);
