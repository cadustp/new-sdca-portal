import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import { Box, TextField } from '@material-ui/core';

import SelectInput from '../../../../components/SelectInput';
import { formatDataSet } from '../../../../helpers/utils';
import Button from '../../../../components/Button';
import { captureEvent } from '../../../../analytics';

type Props = {
  intl: {
    messages: [];
  };
};

type StateProps = {
  title: string,
  isOpen: boolean,
  users: Array<any>,
  usersNumber: number,
  selectedReminders: Array<number>,
  type: string,
  action: string,
};

type DispatchProps = {
  onClose: Function;
  onConfirm: Function,
  selectReminders: Function,
};

const CancelReminderModal: React.FC<Props & DispatchProps & StateProps> = ({
  intl,
  type,
  action,
  selectedReminders,
  selectReminders,
  users,
  onClose,
  onConfirm,
}) => {
  const [comment, setComment] = useState('');
  const [selectedNames, setSelectedNames] = useState(null);
  const invalidForm = !(comment !== '' && selectedNames !== null);

  const handleClose = () => {
    selectReminders([]);
    onClose();
  };

  const handleConfirm = () => {
    handleClose();
    onConfirm(comment, selectedNames);
  };

  return (
    <>
      <Box>
        <Box display="flex" flexDirection="column" alignItems="center" my="20px">
          <p>
            {
              intl.messages['reminders.cancel_reminder.modal.description']
            }
            <strong>
              {
                ` ${action} `
              }
            </strong>
            ?
          </p>
        </Box>
        <Box my="20px">
          <SelectInput
            title={<p>{intl.messages['schedule.app_users']}</p>}
            isMulti
            items={formatDataSet(users.filter(u => (u.status !== 2 && u.status !== 3)), ['name'])}
            onChange={user => setSelectedNames(user)}
            selectedItem={selectedNames}
            placeholder={intl.messages['report_side_filter.app_user_placeholder']}
          />
        </Box>
        <br />
        <Box my="20px">
          <TextField
            style={{ width: '100%' }}
            placeholder={intl.messages['reminders.cancel_reminder.comments.place_holder']}
            type="text"
            variant="outlined"
            onChange={e => setComment(e.target.value)}
            value={comment}
            fullWidth
            required
            multiline
            rows={3}
          />
        </Box>

      </Box>
      <Box display="flex" justifyContent="center" gridGap="1.5rem" className="modal-footer">
        <Button
          variant="outlined"
          onClick={() => {
            handleClose();
            captureEvent('cancelCancel');
          }}
        >
          {intl.messages['users.activateInactivateConfirmModal.close']}
        </Button>
        <Button
          variant="contained"
          disabled={invalidForm}
          onClick={handleConfirm}
        >
          {intl.messages['users.activateInactivateConfirmModal.confirm']}
        </Button>
      </Box>
    </>
  );
};

export default injectIntl(CancelReminderModal);
