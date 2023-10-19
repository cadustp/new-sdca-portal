import React, { useState, useEffect } from 'react';
import { injectIntl } from 'react-intl';
import { Box, TextField } from '@mui/material';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

import SelectInput from '../../../../components/SelectInput';
import { formatDataSet } from '../../../../helpers/utils';
import Button from '../../../../components/Button';
import DatetimeInput from '../../../../components/shared/Inputs/DatetimeInput';
import { captureEvent } from '../../../../analytics';

type Props = {
  intl: {
    messages: [];
    locale: string;
    formatMessage: Function;
  };
};

type StateProps = {
  title: string,
  isOpen: boolean,
  users: Array<any>,
  selectedReminders: Array<any>;
  usersNumber: number,
  type: string,
  action: string,
};

type DispatchProps = {
  onClose: Function;
  onConfirm: Function;
  selectReminders: Function;
  rescheduleReminders: Function;
  selectedNames: Array<any>;
};

interface StartDate {
  startDate: MaterialUiPickersDate;
  endDate: MaterialUiPickersDate;
}

const RescheduleReminderModal: React.FC<Props & DispatchProps & StateProps> = ({
  intl,
  action,
  onClose,
  users,
  rescheduleReminders,
  selectedReminders,
  selectReminders,
}) => {
  const [selectedNames, setSelectedNames] = useState(null);
  const [comment, setComment] = useState('');
  const [reminderDates, setReminderDates] = React.useState<StartDate>({
    endDate: null,
    startDate: null,
  });

  useEffect(() => {
    setReminderDates({
      endDate: selectedReminders[0]?.end_date,
      startDate: selectedReminders[0]?.start_date,
    });
  }, [selectedReminders]);

  const invalidForm = !(
    comment !== ''
    && reminderDates.startDate !== null
    && reminderDates.endDate !== null
    && selectedNames !== null
  );

  const handleClose = () => {
    selectReminders([]);
    onClose();
  };

  const sendRequest = () => {
    const selectedRemindersfiltered = selectedReminders[0]?.id ? [selectedReminders[0].id] : selectedReminders;

    rescheduleReminders({
      selectedReminders: selectedRemindersfiltered,
      comment,
      users: selectedNames,
      reminderDates,
    });
  };

  const handleConfirm = () => {
    handleClose();
    sendRequest();
  };

  return (
    <>
      <Box my="20px">
        <Box className="row-fields">
          <DatetimeInput
            intl={intl}
            title={intl.messages['reminder.reschedule.field.startDate']}
            placeholder={intl.messages['datepicker.placeholder']}
            date={reminderDates.startDate}
            setDate={newValue => {
              setReminderDates({
                ...reminderDates,
                startDate: newValue,
              });
            }}
          />
          <DatetimeInput
            intl={intl}
            title={intl.messages['reminder.reschedule.field.endDate']}
            placeholder={intl.messages['datepicker.placeholder']}
            date={reminderDates.endDate}
            setDate={newValue => {
              setReminderDates({
                ...reminderDates,
                endDate: newValue,
              });
            }}
          />
        </Box>
        <Box my="20px">
          <SelectInput
            title={<p>{intl.messages['schedule.app_users']}</p>}
            isMulti
            items={formatDataSet(users.filter(u => (u.status !== 2 && u.status !== 3)), ['name'])}
            onChange={user => setSelectedNames(user)}
            selectedItem={selectedNames}
            placeholder={intl.messages['reminders.reschedule.evaluators.placeholder']}
          />
        </Box>
        <Box my="20px">
          <TextField
            style={{ width: '100%' }}
            placeholder={intl.messages['reminders.reschedule_reminder.comments.place_holder']}
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
            captureEvent('cancelReschedule');
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

export default injectIntl(RescheduleReminderModal);
