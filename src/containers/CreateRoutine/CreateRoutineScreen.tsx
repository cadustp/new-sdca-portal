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
  history: { push: (route: string) => void };
};

type DispatchProps = {
  loadListsRequest: Function;
  saveRoutineRequest: Function,
  clearEditRoutine: Function;
  clearCreateStepper: Function;
  loadSelectedRoutine: Function;
};

type StateProps = {
  isLoading: boolean,
  allForms: [],
  allEvaluators: [],
  allEvaluateds: [],
  allGroups: [],
  listsStatus: string,
  routine: {
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
    isARoutine: boolean,
  }
  saveStatus: string,
  saveError: string,
  selectedRoutineId: number | null,
};

const CreateRoutineScreen: React.FC<Props & DispatchProps & StateProps> = ({
  intl,
  history,
  isLoading,
  routine,
  loadListsRequest,
  listsStatus,
  allForms,
  allEvaluators,
  allEvaluateds,
  allGroups,
  saveRoutineRequest,
  saveStatus,
  saveError,
  clearEditRoutine,
  clearCreateStepper,
  selectedRoutineId,
  loadSelectedRoutine,
}) => {
  const [routineData, setRoutineData] = useState({
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
    isARoutine: true,
  });

  const [openSnackError, setOpenSnackError] = useState(false);

  useEffect(() => {
    if (selectedRoutineId) {
      loadSelectedRoutine({ id: selectedRoutineId, isARoutine: true });
    }
  }, []);

  const handleClear = () => {
    setRoutineData({
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
      isARoutine: true,
    });
    clearEditRoutine();
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
      window.location.replace('/routines');
      handleClear();
    }
  };

  useEffect(() => {
    handleLists();
    handleSuccessRedirect();
  }, [listsStatus, saveStatus]);

  const hasMissingFields = () => {
    const isFilled = routineData.name.trim().length > 0
                      && routineData.form
                      && (routineData.evaluators || routineData.evaluatorsGroups)
                      && routineData.startDate
                      && routineData.endDate
                      && routineData.recurrence
                      && routineData.deadline;
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
        handleCreate={() => saveRoutineRequest(routineData)}
        handleCancel={handleClear}
        hasMissingFields={hasMissingFields}
        isEdit={!!routine?.id}
      />
      <Box className="routine-create-container">
        <LoadingSelects />
        <ReminderCreateStep
          reminder={routine}
          reminderData={routineData}
          setReminderData={setRoutineData}
          formsList={allForms}
          evaluatorsList={allEvaluators}
          evaluatedsList={allEvaluateds}
          groupsList={allGroups}
          isARoutine
        />
      </Box>
      <SnackBar
        message={saveError}
        open={saveStatus === RESPONSE_STATUS.FAILURE}
        handleClose={clearCreateStepper}
      />
      <SnackBar
        message={intl.messages['routine.create.lists.error']}
        open={openSnackError}
        handleClose={() => setOpenSnackError(false)}
      />
    </>
  );
};

export default CreateRoutineScreen;
