import React, { useState, useEffect } from 'react';
import { injectIntl } from 'react-intl';
import { Input, Menu } from '@mui/material';
import {
  SearchOutlined, FilterList, FormatLineSpacing, ImportExportOutlined, LockOutlined, Lock, LockOpenOutlined, LockOpen,
} from '@mui/icons-material';
import MenuItem from '@mui/material/MenuItem';
import { makeStyles } from 'mui-styles';
import { light } from '../../../styles/palette';
import SideFilters from '../SideFilters';
import { filterParams, User } from '../../../redux/users/types';
import Button from '../../../components/Button';
import { IMPORT_TYPES, ORDER_TYPES, RESPONSE_STATUS } from '../../../helpers/consts';

import './styles.css';
import { captureEvent } from '../../../analytics';
import ImportModal from '../../../components/ImportModal';
import ExportModal from '../../../components/ExportModal';
import exporterService from '../../../services/exporterService';

type Props = {
  intl: {
    messages: [];
  };
};

type StateProps = {
  inputSearchValue: string,
  usersList: Array<User>,
  emailsList: Array<User>,
  groupsList: Array<any>,
  typesOfUserList: Array<any>,
  exportObject: Blob,
  filterParams: filterParams,
  filterModalIsOpen: boolean,
  selectedUsersIds: Array<number>,
  action: string,
  exportStatus: string,
  importStatus: string,
  importRowErrors: [],
};

type DispatchProps = {
  onSort: Function,
  setInputSearchValue: Function,
  handleSearchRequest: Function,
  updateFilterParams: Function,
  changeFilterModalStatus: Function,
  updateUsers: Function,
  setSelectedUsersIds: Function,
  listsDataRequest: Function,
  handleExport: Function,
  clearExportStatus: Function,
  importUsersRequest: Function,
  clearImportStatus: Function,
  triggerSnackBarError: Function,
};

const MenuItemStyle = (props: any) => {
  const classes = makeStyles((theme) => ({
    root: {
      color: '#6A6A6A',
      fontSize: 12,
    }
  }));

  return <MenuItem classes={{ ...classes }} {...props} />
}

const sortItems = [
  {
    label: 'users.nameAscending',
    sort: ORDER_TYPES.ALPHABETICAL_ASCENDING,
  },
  {
    label: 'users.nameDescending',
    sort: ORDER_TYPES.ALPHABETICAL_DESCENDING,
  },
];

const SearchBar: React.FC<Props & DispatchProps & StateProps> = ({
  intl,
  inputSearchValue,
  setInputSearchValue,
  handleSearchRequest,
  filterParams,
  updateFilterParams,
  filterModalIsOpen,
  changeFilterModalStatus,
  usersList,
  emailsList,
  groupsList,
  exportObject,
  typesOfUserList,
  updateUsers,
  setSelectedUsersIds,
  selectedUsersIds,
  action,
  listsDataRequest,
  exportStatus,
  handleExport,
  clearExportStatus,
  importUsersRequest,
  importStatus,
  importRowErrors,
  clearImportStatus,
  triggerSnackBarError,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorBatchActionsEl, setAnchorBatchActionsEl] = useState(null);
  const totalSelectedUsers = selectedUsersIds.length > 0 ? `(${selectedUsersIds.length})` : '';
  const [openImport, setOpenImport] = useState(false);
  const [openExport, setOpenExport] = useState(false);

  const sortType = filterParams.sort || 'ALPHABETICAL_ASCENDING';

  useEffect(() => {
    if (exportStatus === RESPONSE_STATUS.SUCCESS) {
      exporterService({
        fileName: 'users',
        exportObject,
        clearCallBack: clearExportStatus,
      });
      setOpenExport(false);
    }
  }, [exportStatus]);

  const handleSort = type => {
    const newFilters = { ...filterParams, sort: type };
    updateFilterParams(newFilters);
    handleSearch(newFilters);
    handleCloseSort();
    captureEvent('sortUsers', { sort: type });
  };

  const handleOpenSort = event => {
    captureEvent('openSortUsers');
    setAnchorEl(event.currentTarget);
  };

  const handleCloseSort = () => {
    setAnchorEl(null);
  };

  const handleSearch = params => {
    handleSearchRequest(params, inputSearchValue);
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      handleSearch(filterParams);
      captureEvent('searchUsers');
    }
  };

  const handleOpenBatchActions = event => {
    captureEvent('openBatchActionsUsers');
    setAnchorBatchActionsEl(event.currentTarget);
  };

  const handleCloseBatchActions = () => {
    setAnchorBatchActionsEl(null);
  };

  const handleActivateInactivateUsers = () => {
    // eslint-disable-next-line object-shorthand
    captureEvent('openActivateUsers', { action: action });
    handleCloseBatchActions();
    updateUsers();
  };

  const handleLoadFilter = () => {
    const hasData = groupsList.length
      && usersList.length;
    if (!hasData) {
      const requestParams = {
        groups: true,
        evaluators: true,
        evaluateds: true,
        admins: true,
      };
      listsDataRequest(requestParams);
    }
    changeFilterModalStatus(true);
    captureEvent('openFilterUsers');
  };

  const renderSortMenu = (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleCloseSort}
      PaperProps={{
        style: {
          padding: 0,
          transform: 'translateY(+25%)',
        },
      }}
    >
      {sortItems.map(item => (
        <MenuItemStyle
          style={{
            color: (item.sort === sortType ? light.primaryDark : light.gray.dark),
            backgroundColor: (item.sort === sortType ? light.primaryLight : light.white),
          }}
          key={item.sort}
          onClick={() => handleSort(item.sort)}
        >
          {intl.messages[item.label]}
        </MenuItemStyle>
      ))}
    </Menu>
  );

  const batchActionsItems = [
    {
      label: 'import',
      key: 'import',
      action: () => { setOpenImport(true); setAnchorBatchActionsEl(null); },
    },
    {
      label: 'export.confirm',
      key: 'export',
      action: () => { setOpenExport(true); setAnchorBatchActionsEl(null); },
    },
  ];

  useEffect(() => {
    if (exportStatus === RESPONSE_STATUS.SUCCESS) {
      setOpenExport(false);
      clearExportStatus();
    }
  }, [exportStatus]);

  const renderActionsMenu = (
    <Menu
      anchorEl={anchorBatchActionsEl}
      open={Boolean(anchorBatchActionsEl)}
      onClose={handleCloseBatchActions}
      PaperProps={{
        style: {
          padding: 0,
          transform: 'translateY(+50%)',
        },
      }}
    >
      {batchActionsItems.map(item => (
        <MenuItemStyle
          key={item.label}
          onClick={item.action}
          style={{
            color: light.gray.dark,
          }}
        >
          {intl.messages[item.label] || item.label}
        </MenuItemStyle>
      ))}
    </Menu>
  );

  const renderActivateInactivate = () => (
    <>
      {filterParams.active
        ? <>{selectedUsersIds.length > 0 ? <Lock /> : <LockOpenOutlined />}</>
        : <>{selectedUsersIds.length > 0 ? <LockOpen /> : <LockOutlined />}</> }
      <p>{`${totalSelectedUsers} ${action}`}</p>
    </>
  );

  return (
    <>
      <div className="search-container">
        <div className="search-bar">
          <Input
            className="search-input"
            autoFocus
            onKeyDown={handleKeyPress}
            onChange={event => setInputSearchValue(event.target.value)}
            value={inputSearchValue}
            disableUnderline
            placeholder={`${intl.messages['users.searchUser']}`}
          />
          <div>
            <SearchOutlined
              className="searchIcon"
              onClick={() => {
                handleSearch(filterParams);
                captureEvent('searchUsers');
              }}
            />
          </div>
        </div>
        <SideFilters
          isOpen={filterModalIsOpen}
          changeFilterModalStatus={changeFilterModalStatus}
          intl={intl}
          users={usersList}
          emailsList={emailsList}
          groupsList={groupsList}
          typesOfUserList={typesOfUserList}
          filterParams={filterParams}
          updateFilterParams={updateFilterParams}
          handleSearch={handleSearch}
          inputSearchValue={inputSearchValue}

          setSelectedUsersIds={setSelectedUsersIds}
        />
        <div className="separator" />
        <div className="button-container">
          <Button
            disableRipple
            fullWidth
            variant="text"
            onClick={() => handleLoadFilter()}
          >
            <FilterList />
            <p>{intl.messages['users.filterSearch']}</p>
          </Button>
        </div>
        <div className="separator" />
        <div className="button-container">
          <Button
            fullWidth
            variant="text"
            onClick={handleOpenSort}
            disableRipple
          >
            <FormatLineSpacing />
            <p>{intl.messages['users.sortList']}</p>
          </Button>
        </div>
        {renderSortMenu}
        <div className="separator" />
        <div className="button-container">
          <Button
            fullWidth
            variant="text"
            onClick={handleOpenBatchActions}
            disableRipple
          >
            <ImportExportOutlined />
            <p>
              {intl.messages['users.batchActions']}
            </p>
          </Button>
        </div>
        {renderActionsMenu}
        <div className="separator" />
        <div className="button-container">
          <Button
            fullWidth
            variant="text"
            onClick={() => {
              if (selectedUsersIds.length > 0) {
                handleActivateInactivateUsers();
              } else {
                triggerSnackBarError();
              }
            }}
            disableRipple
          >
            {renderActivateInactivate()}
          </Button>
        </div>
      </div>
      <ImportModal
        open={openImport}
        onClose={() => setOpenImport(false)}
        importType={IMPORT_TYPES.USERS}
        importRequest={importUsersRequest}
        importStatus={importStatus}
        importRowErrors={importRowErrors}
        clearStatus={clearImportStatus}
        handleUpdateRequest={handleSearchRequest}
        hasEmailField
      />
      <ExportModal
        open={openExport}
        openFilters={handleLoadFilter}
        onClose={() => setOpenExport(false)}
        onConfirm={handleExport}
        type={IMPORT_TYPES.USERS}
      />
    </>
  );
};

export default injectIntl(SearchBar);
