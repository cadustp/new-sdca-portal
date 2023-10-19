import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import NavBar from './NavBar/NavBar';
import UserCreateStep from '../../components/UserCreateStep';
import Loading from '../../components/Loading';
import { RESPONSE_STATUS } from '../../helpers/consts';
import useCurrentUser from '../../hooks/useCurrentUser';
import CustomSnackbar from '../../components/shared/CustomSnackbar/CustomSnackbar';

import './styles.css';
import { captureEvent } from '../../analytics';

type Props = {
  history: { push: (route: string) => void };
};

type DispatchProps = {
  saveUserRequest: Function,
  listAllGroupsRequest: Function,
  listAdminsRequest: Function;
  clearEditStepper: Function;
  clearEditUser: Function;
};

type StateProps = {
  isLoading: boolean,
  saveStatus: string,
  saveError: string,
  allGroups: Array<any>,
  allAdmins: [],
  user: {
    id: number,
    name: string,
    email: string,
    register: string,
    group: number,
    responsible: number,
    language: number,
    types: Array<any>,
    othersResponsibles: Array<any>,
    enableSendEmail: boolean,
    hasTemporaryAccess: boolean
  },
};

const EditUserScreen: React.FC<Props & DispatchProps & StateProps> = ({
  isLoading,
  saveUserRequest,
  saveStatus,
  saveError,
  listAllGroupsRequest,
  allGroups,
  listAdminsRequest,
  allAdmins,
  clearEditStepper,
  clearEditUser,
  history,
  user,
}) => {
  const [currentUser, { isSubAdmin }] = useCurrentUser();
  const subAdminObject = { value: currentUser.id, label: currentUser.email };
  const responsibleInitialValue = isSubAdmin ? subAdminObject : [];

  const [userData, setUserData] = useState({
    id: null,
    name: '',
    email: '',
    userType: [],
    password: '',
    passwordConfirmation: '',
    group: [],
    identifier: '',
    language: [],
    responsible: responsibleInitialValue,
    othersResponsibles: [],
    enableSendEmail: true,
    hasTemporaryAccess: false,
  });

  useEffect(() => {
    if (!userData.responsible) {
      setUserData({ ...userData, othersResponsibles: [] });
    }
  }, [userData.responsible]);

  useEffect(() => {
    if (allGroups.length === 0) {
      listAllGroupsRequest();
    }
  }, [allGroups]);

  useEffect(() => {
    if (allAdmins.length === 0) {
      listAdminsRequest();
    }
  }, [allAdmins]);

  useEffect(() => {
    if (allAdmins.length === 0) {
      listAdminsRequest();
    }
  }, [saveStatus]);

  const handleClear = () => {
    setUserData({
      id: null,
      name: '',
      email: '',
      userType: [],
      password: '',
      passwordConfirmation: '',
      group: [],
      identifier: '',
      language: [],
      responsible: [],
      othersResponsibles: [],
      enableSendEmail: true,
      hasTemporaryAccess: false,
    });
    clearEditUser();
  };

  useEffect(() => {
    if (saveStatus === RESPONSE_STATUS.SUCCESS) {
      history.push('/admin/users');
      handleClear();
    }
  }, [saveStatus]);

  const hasMissingFields = () => {
    const isFilled = userData.name.trim().length > 0
                  && userData.email.trim().length > 0
                  && userData.userType?.length > 0
                  && (user.id > 0 ? true : userData.password.length > 0)
                  && (user.id > 0 ? true : userData.passwordConfirmation.length > 0)
                  && (userData.group && 'value' in userData.group)
                  && (userData.language && 'value' in userData.language)
                  && (!requireResponsible(userData.userType) || (userData.responsible && 'value' in userData.responsible));
    return (!isFilled);
  };

  const requireResponsible = types => types?.some(t => t.value === 3 || t.value === 4);

  const LoadingSelects = () => (isLoading ? <Loading size="small" /> : <></>);

  return (
    <>
      <NavBar
        handleCreate={() => saveUserRequest(userData)}
        handleCancel={() => {
          handleClear();
          captureEvent(user?.id ? 'cancelEditUsers' : 'cancelCreateUsers');
        }}
        hasMissingFields={hasMissingFields}
      />
      <Box className="user-edit-container">
        <LoadingSelects />
        <UserCreateStep
          setUserData={setUserData}
          userData={userData}
          formFormat="user"
          groupsList={allGroups}
          adminsList={allAdmins}
          user={user}
        />
      </Box>
      <CustomSnackbar
        data={{
          message: saveError,
          type: 'error',
          open: saveStatus === RESPONSE_STATUS.FAILURE,
        }}
        handleClose={clearEditStepper}
      />
    </>
  );
};

export default EditUserScreen;
