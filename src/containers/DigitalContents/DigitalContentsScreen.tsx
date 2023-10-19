import React, { useEffect, useState } from 'react';

import {
  Button,
  Box,
} from '@material-ui/core';
import Header from './Header';
import SearchBar from './SearchBar';
import Section from './Section';
import CreateModal from './CreateModal';
import Loading from '../../components/Loading';
import CustomModal from '../../components/CustomModal';
import CustomSnackbar from '../../components/shared/CustomSnackbar/CustomSnackbar';
import { Contents, createModal } from '../../redux/digitalContents/types';
import { User } from '../../redux/users/types';
import {
  sortAlphabeticalAscending,
  sortAlphabeticalDescending,
  sortUpdateDateAscending,
  sortUpdateDateDescending,
} from '../../helpers/utils';
import { ORDER_TYPES, RESPONSE_STATUS } from '../../helpers/consts';

import './styles.css';
import { captureEvent } from '../../analytics';

type Props = {
  intl: {
    messages: [];
  };
};

type StateProps = {
  contents: Array<Contents>,
  isLoading: boolean,
  deleteStatus: string,
  deleteError: string,
  createModal: createModal,
  saveStatus: string,
  saveError: string,
  usersList: Array<User>,
  loadingLists: boolean,
};

type DispatchProps = {
  searchDigitalContentsRequest: Function,
  deleteContentRequest: Function,
  clearDeleteStatus: Function,
  openCreateModal: Function,
  clearCreateModal: Function,
  clearCreateStatus: Function,
  saveContentRequest: Function,
  listsDataRequest: Function,
};

const DigitalContentsScreen: React.FC<Props & StateProps & DispatchProps> = ({
  intl,
  contents,
  clearDeleteStatus,
  createModal,
  clearCreateModal,
  clearCreateStatus,
  deleteContentRequest,
  deleteStatus,
  deleteError,
  isLoading,
  loadingLists,
  openCreateModal,
  listsDataRequest,
  usersList,
  saveContentRequest,
  saveStatus,
  saveError,
  searchDigitalContentsRequest,
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [filteredContents, setFilteredContents] = useState(contents);
  const [sortType, setSortType] = useState(ORDER_TYPES.START_DATE_ASCENDING);
  const [deleteDialog, setDeleteDialog] = useState({
    isOpen: false,
    contentId: null,
    contentName: '',
  });
  const loadContents = () => {
    searchDigitalContentsRequest({
      page: 0,
    });
  };

  useEffect(() => {
    loadContents();
  }, []);

  const getSortingMethod = sort => {
    const methodMap = {
      [ORDER_TYPES.ALPHABETICAL_ASCENDING]: sortAlphabeticalAscending,
      [ORDER_TYPES.ALPHABETICAL_DESCENDING]: sortAlphabeticalDescending,
      [ORDER_TYPES.CREATION_DATE_ASCENDING]: sortUpdateDateAscending,
      [ORDER_TYPES.CREATION_DATE_DESCENDING]: sortUpdateDateDescending,
    };
    return methodMap[sort];
  };

  const handleSearch = () => {
    if (searchValue) {
      setFilteredContents(
        contents.filter(content => content.name.toLowerCase().includes(searchValue.toLowerCase())
          || content.description.toLowerCase().includes(searchValue.toLowerCase())).sort(getSortingMethod(sortType)),
      );
    } else {
      setFilteredContents(contents.sort(getSortingMethod(sortType)));
    }
  };

  useEffect(() => {
    if (contents) {
      handleSearch();
    }
  }, [contents, sortType]);

  const handleDeleteContent = content => {
    setDeleteDialog({ contentId: content.id, contentName: content.name, isOpen: !deleteDialog.isOpen });
  };

  const handleConfirmation = () => {
    deleteContentRequest({ id: deleteDialog.contentId });
    setDeleteDialog({ contentId: null, contentName: '', isOpen: !deleteDialog.isOpen });
    window.scrollTo(0, 0);
  };

  const handleLoadList = () => {
    const hasData = usersList?.length;
    if (!hasData) {
      const requestParams = {
        evaluators: true,
      };
      listsDataRequest(requestParams);
    }
  };

  const handleOpenModal = content => {
    handleLoadList();
    openCreateModal(content);
  };

  const handleCloseModal = () => {
    setDeleteDialog({ contentId: null, contentName: '', isOpen: !deleteDialog.isOpen });
  };

  const ConfirmDialog = () => (
    <div>
      <CustomModal
        title={intl.messages['contents.delete.title']}
        open={deleteDialog.isOpen}
        onClose={() => {
          handleCloseModal();
          captureEvent('closeDelete');
        }}
        centerTitle
      >
        <>
          <Box>
            <Box display="flex" flexDirection="column" alignItems="center" my="40px">
              {intl.messages['contents.delete.description']}
              {' '}
              <b>{deleteDialog.contentName}</b>
              <p>{intl.messages['contents.delete.subdescription']}</p>
            </Box>
          </Box>
          <Box display="flex" justifyContent="center" gridGap="1.5rem" className="modal-footer">
            <Button
              onClick={() => {
                handleCloseModal();
                captureEvent('cancelDeleteContents');
              }}
              variant="outlined"
            >
              {intl.messages['utils.cancel']}
            </Button>
            <Button
              onClick={() => handleConfirmation()}
              variant="contained"
            >
              {intl.messages['utils.confirm']}
            </Button>
          </Box>
        </>
      </CustomModal>
    </div>
  );

  const LoadingState = () => (isLoading || loadingLists ? <Loading size="small" /> : <></>);

  return (
    <>
      <LoadingState />
      <div className="screen">
        <Header
          openCreateModal={handleOpenModal}
        />
        <SearchBar
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          handleSearch={handleSearch}
          sortType={sortType}
          setSortType={setSortType}
        />
        <Section
          contents={filteredContents}
          sortType={sortType}
          handleEditContent={handleOpenModal}
          handleDeleteContent={handleDeleteContent}
        />
        <CreateModal
          open={createModal.isOpen}
          onClose={clearCreateModal}
          content={createModal.content}
          saveContentRequest={saveContentRequest}
          saveStatus={saveStatus}
          saveError={saveError}
          clearCreateStatus={clearCreateStatus}
          usersList={usersList}
          reloadContents={loadContents}
        />
      </div>
      {
        !!deleteStatus.length
        && (
          <CustomSnackbar
            data={{
              message: deleteStatus === RESPONSE_STATUS.SUCCESS ? intl.messages['utils.success'] : deleteError,
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

export default DigitalContentsScreen;
