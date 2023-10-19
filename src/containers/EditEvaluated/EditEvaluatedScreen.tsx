import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import NavBar from './NavBar/NavBar';
import UserCreateStep from '../../components/UserCreateStep';
import Loading from '../../components/Loading';
import { RESPONSE_STATUS } from '../../helpers/consts';

import CustomSnackbar from '../../components/shared/CustomSnackbar/CustomSnackbar';

import './styles.css';
import { Evaluated } from '../../redux/evaluateds/types';
import { captureEvent } from '../../analytics';

type Props = {
  history: { push: (route: string) => void };
};

type DispatchProps = {
  saveEvaluatedRequest: Function,
  listAllGroupsRequest: Function,
  clearEditEvaluatedStepper: Function;
  clearEditEvaluated: Function;
};

type StateProps = {
  isLoading: boolean,
  saveStatus: string,
  saveError: string,
  allGroups: Array<any>,
  evaluated: Evaluated,
};

const EditEvaluatedScreen: React.FC<Props & DispatchProps & StateProps> = ({
  history,
  isLoading,
  saveEvaluatedRequest,
  saveStatus,
  saveError,
  allGroups,
  listAllGroupsRequest,
  clearEditEvaluatedStepper,
  clearEditEvaluated,
  evaluated,
}) => {
  const evaluatedClearState = {
    id: null,
    name: '',
    email: '',
    group: [],
    identifier: '',
    language: [],
    enableSendEmail: true,
  };

  const [evaluatedData, setEvaluatedData] = useState(evaluatedClearState);

  useEffect(() => {
    if (allGroups.length === 0) {
      listAllGroupsRequest();
    }
  }, [allGroups]);

  const handleClear = () => {
    setEvaluatedData(evaluatedClearState);
    clearEditEvaluated();
  };

  useEffect(() => {
    if (saveStatus === RESPONSE_STATUS.SUCCESS) {
      history.push('/admin/evaluateds');
      handleClear();
    }
  }, [saveStatus]);

  const hasMissingFields = () => {
    const isFilled = evaluatedData.name.trim().length > 0
                  && evaluatedData.email.trim().length > 0
                  && (evaluatedData.group && 'value' in evaluatedData.group)
                  && (evaluatedData.language && 'value' in evaluatedData.language);
    return (!isFilled);
  };

  const LoadingSelects = () => (isLoading ? <Loading size="small" /> : <></>);

  return (
    <>
      <NavBar
        handleCreate={() => saveEvaluatedRequest(evaluatedData)}
        handleCancel={() => {
          handleClear();
          captureEvent(evaluated?.id ? 'cancelEditEvaluateds' : 'cancelCreateEvaluateds');
        }}
        hasMissingFields={hasMissingFields}
      />
      <Box className="user-edit-container">
        <LoadingSelects />
        <UserCreateStep
          setUserData={setEvaluatedData}
          userData={evaluatedData}
          formFormat="evaluated"
          groupsList={allGroups}
          user={evaluated}
        />
      </Box>
      <CustomSnackbar
        data={{
          message: saveError,
          type: 'error',
          open: saveStatus === RESPONSE_STATUS.FAILURE,
        }}
        handleClose={clearEditEvaluatedStepper}
      />
    </>
  );
};

export default EditEvaluatedScreen;
