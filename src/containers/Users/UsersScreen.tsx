import React, { useEffect, useState } from 'react';
import { filterParams, User, UsersState } from '../../redux/users/types';
import Loading from '../../components/Loading';
import Header from './Header';
import SearchBar from './SearchBar';
import Section from './Section';
import ActivateInactivateConfirmModal from './ActivateInactivateConfirmModal';
import CustomSnackbar from '../../components/shared/CustomSnackbar/CustomSnackbar';
import { RESPONSE_STATUS } from '../../helpers/consts';

import './styles.css';

type Props = {
  intl: {
    messages: [];
  };
  history: { push: (route: string) => void };
};

type DispatchProps = {
  searchUsersRequest: Function;
  updateFilterParams: Function;
  changeFilterModalStatus: Function;
  importUsersRequest: Function;
  clearImportStatus: Function;
  activateInactivateUsersRequest: Function;
  clearEditStepper: Function;
  setEditUser: Function;
  listsDataRequest: Function,
  exportUsersRequest: Function,
  clearExportStatus: Function,
};

type StateProps = UsersState & {
  filterModalIsOpen: boolean,
  filterParams: filterParams,
  usersList: Array<User>,
  exportObject: Blob,
  emailsList: Array<User>,
  groupsList: Array<any>,
  typesOfUserList: Array<any>,
  importStatus: string,
  importRowErrors: [],
  saveStatus: string,
  loadingLists: boolean,
  exportStatus: string,
  exportError: string,
};

const UsersScreen: React.FC<Props & DispatchProps & StateProps> = ({
  intl,
  users,
  isLoading,
  loadingLists,
  exportObject,
  failure,
  searchUsersRequest,
  updateFilterParams,
  changeFilterModalStatus,
  activateInactivateUsersRequest,
  filterModalIsOpen,
  filterParams,
  usersList,
  emailsList,
  groupsList,
  typesOfUserList,
  importUsersRequest,
  importStatus,
  importRowErrors,
  clearImportStatus,
  activateInactivateFailure,
  clearEditStepper,
  saveStatus,
  setEditUser,
  history,
  listsDataRequest,
  exportUsersRequest,
  clearExportStatus,
  exportStatus,
  exportError,
}) => {
  const [inputSearchValue, setInputSearchValue] = useState('');
  const [selectedUsersIds, setSelectedUsersIds] = useState<Array<number>>([]);
  const [selectedUserName, setSelectedUserName] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activateInactivateError, setActivateInactivateError] = useState({
    isOpen: false,
    message: intl.messages['users.errors.unselected_users'],
  });

  const modalEntityTypeTranslate = intl.messages['users.activateInactivateConfirmModal.type'];
  const modalActionTranslate = `${intl.messages[`users.activateInactivateConfirmModal.active.${filterParams.active}`]}`;

  useEffect(() => {
    searchUsersRequest({
      params: filterParams,
      paginate: true,
      page: 1,
    });
  }, [searchUsersRequest]);

  useEffect(() => {
    if (activateInactivateFailure === false) {
      setSelectedUsersIds([]);
      handleSearchRequest(filterParams);
    }
  }, [activateInactivateFailure]);

  const handleSearchRequest = (params = {}, text = inputSearchValue, page = 1) => {
    searchUsersRequest({
      params: {
        ...params,
        text,
      },
      paginate: true,
      page,
    });
  };

  const handleEditUser = user => {
    setEditUser(user);
    history.push('/admin/users/edit');
  };

  const hadleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleUpdateUsers = () => {
    if (selectedUsersIds.length) {
      const ids = { ids: selectedUsersIds, active: !filterParams.active };
      setIsOpen(false);
      activateInactivateUsersRequest(ids);
    }
  };

  const handleSelectAllUsers = selectAll => {
    if (selectAll) {
      setSelectedUsersIds([...users.data].map(user => user.id));
    } else {
      setSelectedUsersIds([]);
    }
  };

  const handleSelectOneUser = (e, userId) => {
    setSelectedUserName(null);
    if (e.target.checked) {
      setSelectedUsersIds([...selectedUsersIds, userId]);
    } else {
      setSelectedUsersIds(selectedUsersIds.filter(e => e !== userId));
    }
  };

  const triggerSnackBarError = () => {
    setActivateInactivateError({ ...activateInactivateError, isOpen: !activateInactivateError.isOpen });
  };

  const handleExport = () => {
    exportUsersRequest(filterParams);
  };

  const LoadingState = () => (isLoading || loadingLists ? <Loading size="small" /> : <></>);

  return (
    <>
      <LoadingState />
      <div className="screen">
        <Header
          handleSearchRequest={handleSearchRequest}
        />
        <SearchBar
          setInputSearchValue={setInputSearchValue}
          inputSearchValue={inputSearchValue}
          handleSearchRequest={handleSearchRequest}
          updateFilterParams={updateFilterParams}
          filterModalIsOpen={filterModalIsOpen}
          changeFilterModalStatus={changeFilterModalStatus}
          filterParams={filterParams}
          usersList={usersList}
          emailsList={emailsList}
          groupsList={groupsList}
          typesOfUserList={typesOfUserList}
          updateUsers={hadleOpenModal}
          setSelectedUsersIds={setSelectedUsersIds}
          selectedUsersIds={selectedUsersIds}
          action={modalActionTranslate}
          listsDataRequest={listsDataRequest}
          importUsersRequest={importUsersRequest}
          importStatus={importStatus}
          importRowErrors={importRowErrors}
          clearImportStatus={clearImportStatus}
          triggerSnackBarError={triggerSnackBarError}
          handleExport={handleExport}
          exportObject={exportObject}
          clearExportStatus={clearExportStatus}
          exportStatus={exportStatus}
        />
        <Section
          users={users}
          isLoading={isLoading}
          failure={failure}
          searchUsersRequest={searchUsersRequest}
          inputSearchValue={inputSearchValue}
          handleSearchRequest={handleSearchRequest}
          filterParams={filterParams}
          handleEditUser={handleEditUser}
          selectedUsersIds={selectedUsersIds}
          openModal={hadleOpenModal}
          setSelectedUsersIds={setSelectedUsersIds}
          setSelectedUserName={setSelectedUserName}
          handleSelectAllUsers={handleSelectAllUsers}
          handleSelectOneUser={handleSelectOneUser}
          action={modalActionTranslate}
        />
      </div>
      <ActivateInactivateConfirmModal
        title={`${modalActionTranslate} ${modalEntityTypeTranslate}`}
        action={modalActionTranslate}
        type={modalEntityTypeTranslate}
        isOpen={isOpen}
        intl={intl}
        usersNumber={selectedUsersIds.length}
        userName={selectedUserName}
        onClose={handleCloseModal}
        onConfirm={handleUpdateUsers}
      />
      <CustomSnackbar
        data={{
          message: intl.messages['users.edit.success'],
          type: 'success',
          open: saveStatus === RESPONSE_STATUS.SUCCESS,
        }}
        handleClose={clearEditStepper}
      />
      <CustomSnackbar
        data={{
          message: activateInactivateError.message,
          type: 'error',
          open: activateInactivateError.isOpen,
        }}
        handleClose={triggerSnackBarError}
      />
      <CustomSnackbar
        data={{
          message: exportError,
          type: 'error',
          open: exportStatus === RESPONSE_STATUS.FAILURE,
        }}
        handleClose={clearExportStatus}
      />
    </>
  );
};

export default UsersScreen;
