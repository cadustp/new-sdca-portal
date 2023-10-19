import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogTitle,
  Button,
} from '@mui/material';
import {
  Groups,
  filterParams,
  GroupMembers,
  createModal,
} from '../../redux/groups/types';
import Loading from '../../components/Loading';
import Header from './Header';
import SearchBar from './SearchBar';
import Section from './Section';
import { RESPONSE_STATUS } from '../../helpers/consts';

import CreationModal from './CreationModal';

import CustomSnackbar from '../../components/shared/CustomSnackbar/CustomSnackbar';

import './styles.css';
import { captureEvent } from '../../analytics';

type Props = {
  intl: {
    messages: [];
  };
};

type DispatchProps = {
  searchGroupsRequest: Function;
  importGroupsRequest: Function;
  clearImportStatus: Function;
  updateFilterParams: Function;
  openCreateModal: Function,
  clearCreateModal: Function,
  saveGroupRequest: Function,
  deleteGroupRequest: Function,
  changeFilterModalStatus: Function;
  clearCreateStatus: Function,
  clearDeleteStatus: Function,
  listAllGroupsRequest: Function,
  listsDataRequest: Function,
  exportGroupsRequest: Function,
  clearExportStatus: Function,
};

type StateProps = {
  groups: Array<Groups>,
  isLoading: boolean,
  loadingLists: boolean,
  failure: boolean,
  filterGroups: Array<any>,
  filterParams: filterParams,
  filterModalIsOpen: boolean,
  filterMembers: Array<GroupMembers>,
  importStatus: string,
  importRowErrors: [],
  createModal: createModal,
  saveStatus: string,
  saveErrors: [],
  allGroups: [],
  deleteStatus: string,
  deleteError: string,
  exportObject: Blob,
  exportStatus: string,
  exportError: string,
};

const GroupsScreen: React.FC<Props & DispatchProps & StateProps> = ({
  intl,
  openCreateModal,
  clearCreateModal,
  createModal,
  saveGroupRequest,
  deleteGroupRequest,
  deleteStatus,
  deleteError,
  clearDeleteStatus,
  searchGroupsRequest,
  importGroupsRequest,
  importStatus,
  importRowErrors,
  clearImportStatus,
  groups,
  isLoading,
  loadingLists,
  failure,
  filterGroups,
  filterParams,
  updateFilterParams,
  filterModalIsOpen,
  changeFilterModalStatus,
  filterMembers,
  saveStatus,
  clearCreateStatus,
  listAllGroupsRequest,
  listsDataRequest,
  allGroups,
  exportGroupsRequest,
  clearExportStatus,
  exportObject,
  exportStatus,
  exportError,
}) => {
  const [inputSearchValue, setInputSearchValue] = useState('');
  const [deleteDialog, setDeleteDialog] = useState({
    isOpen: false,
    groupId: null,
  });

  useEffect(() => {
    searchGroupsRequest({
      params: {},
      paginate: true,
      page: 1,
    });
  }, [searchGroupsRequest]);

  const handleSearchRequest = (params = {}, inputText = inputSearchValue, page = 1) => {
    searchGroupsRequest({
      params: {
        ...params,
        inputText,
      },
      paginate: true,
      page,
    });
  };

  useEffect(() => {
    if (deleteStatus === RESPONSE_STATUS.SUCCESS) {
      handleSearchRequest();
      window.scrollTo(0, 0);
    }
  }, [deleteStatus]);

  const handleDeleteGroup = group => {
    setDeleteDialog({ groupId: group.id, isOpen: !deleteDialog.isOpen });
  };

  const handleConfirmation = confirm => {
    if (confirm) {
      deleteGroupRequest({ id: deleteDialog.groupId });
    }
    setDeleteDialog({ groupId: null, isOpen: !deleteDialog.isOpen });
  };

  const handleExport = () => {
    exportGroupsRequest(filterParams);
  };

  const ConfirmDialog = () => (
    <div>
      <Dialog
        open={deleteDialog.isOpen}
      >
        <DialogTitle>
          {intl.messages['groups.delete.description']}
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={() => {
              handleConfirmation(false);
              captureEvent('cancelDeleteGroups');
            }}
            color="primary"
          >
            {intl.messages['groups.actions.cancel']}
          </Button>
          <Button
            onClick={() => {
              handleConfirmation(true);
            }}
            color="primary"
          >
            {intl.messages['groups.actions.confirm']}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );

  const LoadingState = () => (isLoading || loadingLists ? <Loading size="small" /> : <></>);

  return (
    <>
      <LoadingState />
      <div className="gp-screen">
        <Header
          openCreateModal={openCreateModal}
        />
        <SearchBar
          setInputSearchValue={setInputSearchValue}
          importGroupsRequest={importGroupsRequest}
          importStatus={importStatus}
          importRowErrors={importRowErrors}
          clearImportStatus={clearImportStatus}
          inputSearchValue={inputSearchValue}
          handleSearchRequest={handleSearchRequest}
          filterGroups={filterGroups}
          filterMembers={filterMembers}
          filterParams={filterParams}
          updateFilterParams={updateFilterParams}
          filterModalIsOpen={filterModalIsOpen}
          changeFilterModalStatus={changeFilterModalStatus}
          listsDataRequest={listsDataRequest}
          handleExport={handleExport}
          exportObject={exportObject}
          clearExportStatus={clearExportStatus}
          exportStatus={exportStatus}
        />
        <Section
          groups={groups}
          isLoading={isLoading}
          failure={failure}
          searchGroupsRequest={searchGroupsRequest}
          inputSearchValue={inputSearchValue}
          handleSearchRequest={handleSearchRequest}
          handleEditGroup={openCreateModal}
          handleDeleteGroup={handleDeleteGroup}
        />
        <CreationModal
          open={createModal.isOpen}
          onClose={clearCreateModal}
          group={createModal.group}
          listAllGroupsRequest={listAllGroupsRequest}
          groups={allGroups}
          saveGroupRequest={saveGroupRequest}
          saveStatus={saveStatus}
          updateRequest={handleSearchRequest}
        />
      </div>
      <CustomSnackbar
        data={{
          message: intl.messages['groups.create.success'],
          type: 'success',
          open: saveStatus === RESPONSE_STATUS.SUCCESS,
        }}
        handleClose={clearCreateStatus}
      />
      <CustomSnackbar
        data={{
          message: exportError,
          type: 'error',
          open: exportStatus === RESPONSE_STATUS.FAILURE,
        }}
        handleClose={clearExportStatus}
      />
      {
        !!deleteStatus.length
        && (
          <CustomSnackbar
            data={{
              message: deleteStatus === RESPONSE_STATUS.SUCCESS ? intl.messages['groups.create.success'] : deleteError,
              type: deleteStatus === RESPONSE_STATUS.SUCCESS ? 'success' : 'error',
              open: deleteStatus.length,
            }}
            handleClose={clearDeleteStatus}
          />
        )
      }
      <ConfirmDialog />
    </>
  );
};

export default GroupsScreen;
