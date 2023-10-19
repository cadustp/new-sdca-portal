import React, { useState, useEffect } from 'react';
import { Box } from '@material-ui/core';
import NavBar from './NavBar/NavBar';
import ReminderCreateStep from '../../components/ReminderCreateStep';
import Loading from '../../components/Loading';
import { RESPONSE_STATUS } from '../../helpers/consts';

import CustomSnackbar from '../../components/shared/CustomSnackbar/CustomSnackbar';

import './styles.css';

type Props = {
  intl: {
    messages: Array<any>;
  };
};

type DispatchProps = {
  loadListsRequest: Function;
  saveReminderRequest: Function,
  clearEditReminder: Function;
  clearCreateStepper: Function;
  loadSelectedReminder: Function;
};

type StateProps = {
  isLoading: boolean,
  allForms: [],
  allEvaluators: [],
  allEvaluateds: [],
  allGroups: [],
  listsStatus: string,
  reminder: {
    id: number,
    name: string,
    form: number,
    evaluators: [],
    evaluateds: [],
    evaluatorsGroups: [],
    evaluatedsGroups: [],
    recurrence: number,
    startDate: string,
    endDate: string,
    deadline: string,
    weekDays: [],
    automaticScheduling: boolean,
  }
  saveStatus: string,
  saveError: string,
  selectedReminderId: number | null,
};

const CreateReminderScreen: React.FC<Props & DispatchProps & StateProps> = ({
  intl,
  isLoading,
  reminder,
  loadListsRequest,
  listsStatus,
  allForms,
  allEvaluators,
  allEvaluateds,
  allGroups,
  saveReminderRequest,
  saveStatus,
  saveError,
  clearEditReminder,
  clearCreateStepper,
  selectedReminderId,
  loadSelectedReminder,
}) => {
  const [reminderData, setReminderData] = useState({
    name: '',
    form: null,
    evaluators: [],
    evaluateds: [],
    evaluatorsGroups: [],
    evaluatedsGroups: [],
    recurrence: null,
    startDate: null,
    endDate: null,
    deadline: null,
    weekDays: [],
    automaticScheduling: false,
  });

  const [openSnackError, setOpenSnackError] = useState(false);

  useEffect(() => {
    if (selectedReminderId) {
      loadSelectedReminder({ id: selectedReminderId });
    }
  }, []);

  const handleClear = () => {
    setReminderData({
      name: '',
      form: null,
      evaluators: [],
      evaluateds: [],
      evaluatorsGroups: [],
      evaluatedsGroups: [],
      recurrence: null,
      startDate: null,
      endDate: null,
      deadline: null,
      weekDays: [],
      automaticScheduling: false,
    });
    clearEditReminder();
  };

  useEffect(() => () => {
    window.onbeforeunload = null;
    handleClear();
  }, []);

  const handleLists = () => {
    if (!listsStatus) {
      loadListsRequest();
    } else if (listsStatus === RESPONSE_STATUS.FAILURE) {
      setOpenSnackError(true);
    }
  };

  const handleSuccessRedirect = () => {
    if (saveStatus && saveStatus === RESPONSE_STATUS.SUCCESS) {
      window.location.replace('/admin/schedule');
      handleClear();
    }
  };

  useEffect(() => {
    handleLists();
    handleSuccessRedirect();
  }, [listsStatus, saveStatus]);

  const hasMissingFields = () => {
    const isFilled = reminderData.name.trim().length > 0
                      && reminderData.form
                      && reminderData.evaluators
                      && reminderData.startDate
                      && reminderData.endDate
                      && (reminderData.recurrence ? reminderData.deadline : true);
    return (!isFilled);
  };

  const LoadingSelects = () => (isLoading ? <Loading size="small" /> : <></>);

  const SnackBar = ({ message, open, handleClose }) => (
    <CustomSnackbar
      data={{
        message,
        type: 'error',
        open,
      }}
      handleClose={handleClose}
    />
  );

  return (
    <>
      <NavBar
        handleCreate={() => saveReminderRequest(reminderData)}
        handleCancel={handleClear}
        hasMissingFields={hasMissingFields}
        isEdit={!!reminder.id}
      />
      <Box className="reminder-create-container">
        <LoadingSelects />
        <ReminderCreateStep
          reminder={reminder}
          reminderData={reminderData}
          setReminderData={setReminderData}
          formsList={allForms}
          evaluatorsList={allEvaluators}
          evaluatedsList={allEvaluateds}
          groupsList={allGroups}
        />
      </Box>
      <SnackBar
        message={saveError}
        open={saveStatus === RESPONSE_STATUS.FAILURE}
        handleClose={clearCreateStepper}
      />
      <SnackBar
        message={intl.messages['reminder.create.lists.error']}
        open={openSnackError}
        handleClose={() => setOpenSnackError(false)}
      />
    </>
  );
};

export default CreateReminderScreen;
