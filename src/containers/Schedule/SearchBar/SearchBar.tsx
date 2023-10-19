import React, { useState, useEffect } from 'react';
import {
  Input, Menu, MenuItem, makeStyles,
} from '@mui/material';
import {
  SearchOutlined,
  FilterList,
  FormatLineSpacing,
  DeleteOutline,
  Delete,
  ImportExportOutlined,
} from '@mui/icons-material';
import { IMPORT_TYPES, ORDER_TYPES, RESPONSE_STATUS } from '../../../helpers/consts';
import { light } from '../../../styles/palette';
import SideFilters from '../SideFilters';
import Button from '../../../components/Button';
import ExportModal from '../../../components/ExportModal';
import ImportModal from '../../../components/ImportModal';
import { filterParams } from '../../../redux/schedule/types';
import { User } from '../../../redux/users/types';
import { IForm } from '../../../redux/RemindersSideFilters/types';
import exporterService from '../../../services/exporterService';

import '../styles.css';
import { captureEvent } from '../../../analytics';

type Props = {
  intl: {
    messages: [];
  };
};

type StateProps = {
  evaluatedsList: Array<User>,
  evaluatorsList: Array<User>,
  exportStatus: string,
  exportObject: Blob,
  formsList: Array<IForm>,
  filterModalIsOpen: boolean,
  filterParams: filterParams,
  selectedReminders: Array<number>,
  importRowErrors: Array<string>,
  importStatus: string,
  inputSearchValue: string,
  filter: {
    inputSearchValue: string,
    form: any,
    appUser: any,
    evaluatedUser: any,
    startDate: any,
    endDate: any,
    status: any,
    sort: string,
  },
};

type DispatchProps = {
  changeFilterModalStatus: Function
  clearExportStatus: Function,
  clearImportStatus: Function,
  deleteReminders: Function,
  handleSearchRequest: Function,
  importRemindersRequest: Function,
  triggerError: Function,
  updateFilterParams: Function,
  setFilter: Function,
  handleLoadFilter: Function,
  handleExport: Function,
};

const sortItems = [
  {
    label: 'schedule.nameAscending',
    sort: ORDER_TYPES.ALPHABETICAL_ASCENDING,
  },
  {
    label: 'schedule.nameDescending',
    sort: ORDER_TYPES.ALPHABETICAL_DESCENDING,
  },
  {
    label: 'schedule.startDateAscending',
    sort: ORDER_TYPES.START_DATE_ASCENDING,
  },
  {
    label: 'schedule.startDateDescending',
    sort: ORDER_TYPES.START_DATE_DESCENDING,
  },
];

const SearchBar: React.FC<Props & StateProps & DispatchProps> = ({
  changeFilterModalStatus,
  clearImportStatus,
  deleteReminders,
  evaluatedsList,
  evaluatorsList,
  filter,
  filterModalIsOpen,
  filterParams,
  formsList,
  handleSearchRequest,
  importRemindersRequest,
  importRowErrors,
  importStatus,
  intl,
  selectedReminders,
  setFilter,
  triggerError,
  updateFilterParams,
  handleLoadFilter,
  exportStatus,
  handleExport,
  exportObject,
  clearExportStatus,
}) => {
  const [openImport, setOpenImport] = useState(false);
  const [openExport, setOpenExport] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorBatchActionsEl, setAnchorBatchActionsEl] = useState(null);
  const totalSelectedReminders = selectedReminders.length > 0 ? `(${selectedReminders.length})` : '';

  const batchActionsItems = [
    {
      label: 'import',
      key: 'import',
      action: () => {
        setOpenImport(true);
        setAnchorBatchActionsEl(null);
        captureEvent('openImport');
      },
    },
    {
      label: 'export.confirm',
      key: 'export',
      action: () => {
        setOpenExport(true);
        setAnchorBatchActionsEl(null);
        captureEvent('openExport');
      },
    },
  ];

  useEffect(() => {
    if (exportStatus === RESPONSE_STATUS.SUCCESS) {
      exporterService({
        fileName: "reminders",
        exportObject: exportObject,
        clearCallBack: clearExportStatus
      })
      setOpenExport(false);
    }
  }, [exportStatus]);

  const sortType = filterParams.sort || ORDER_TYPES.START_DATE_ASCENDING;

  const handleSearch = () => {
    updateFilterParams(filter);
    handleSearchRequest(filter);
  };

  const clearFilters = () => {
    const clearedFilter = {
      inputSearchValue: '',
      form: [],
      appUser: [],
      evaluatedUser: [],
      startDate: '',
      endDate: '',
      status: [],
    };
    setFilter({
      ...clearedFilter,
      sort: filter.sort,
    });
    updateFilterParams(clearedFilter);
    handleSearchRequest(clearedFilter);
  };

  useEffect(() => {
    window.onbeforeunload = null;
    updateFilterParams({
      inputSearchValue: '',
      form: [],
      appUser: [],
      evaluatedUser: [],
      startDate: filterParams.startDate,
      endDate: filterParams.endDate,
      status: [],
    });
  }, []);

  const handleSort = type => {
    const newFilters = { ...filterParams, sort: type };
    setFilter({
      ...newFilters,
      sort: type,
    });
    updateFilterParams(newFilters);
    handleSearchRequest(newFilters);
    setAnchorEl(null);
    captureEvent('sortReminders', { sort: type });
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      handleSearch();
      captureEvent('searchRemindersSchedule');
    }
  };

  const renderActionsMenu = (
    <Menu
      anchorEl={anchorBatchActionsEl}
      open={Boolean(anchorBatchActionsEl)}
      onClose={() => setAnchorBatchActionsEl(null)}
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
          disabled={false}
        >
          {intl.messages[item.label] || item.label}
        </MenuItemStyle>
      ))}
    </Menu>
  );

  const renderSortMenu = (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={() => setAnchorEl(null)}
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

  return (
    <>
      <div className="sc-search-container">
        <div className="search-bar">
          <Input
            className="search-input"
            autoFocus
            onKeyPress={handleKeyPress}
            onChange={event => setFilter({ ...filter, inputSearchValue: event.target.value })}
            value={filter.inputSearchValue}
            disableUnderline
            placeholder={`${intl.messages['schedule.searchSchedule']}`}
          />
          <div>
            <SearchOutlined
              className="searchIcon"
              onClick={() => {
                handleSearch();
                captureEvent('searchReminders');
              }}
            />
          </div>
        </div>
        <SideFilters
          changeFilterModalStatus={changeFilterModalStatus}
          evaluateds={evaluatedsList}
          evaluators={evaluatorsList}
          filter={filter}
          forms={formsList}
          handleSearch={handleSearch}
          intl={intl}
          isOpen={filterModalIsOpen}
          setFilter={setFilter}
          clearFilters={clearFilters}
        />
        <div className="separator" />
        <div className="button-container">
          <Button
            disableRipple
            fullWidth
            variant="text"
            onClick={handleLoadFilter}
          >
            <FilterList />
            <p>{intl.messages['schedule.filterSearch']}</p>
          </Button>
        </div>
        <div className="separator" />
        <div className="button-container">
          <Button
            fullWidth
            variant="text"
            onClick={event => {
              setAnchorEl(event.currentTarget);
              captureEvent('openSortSchedule');
            }}
            disableRipple
          >
            <FormatLineSpacing />
            <p>{intl.messages['schedule.sortList']}</p>
          </Button>
          {renderSortMenu}
        </div>
        <div className="separator" />
        <div className="button-container">
          <Button
            fullWidth
            variant="text"
            onClick={event => {
              setAnchorBatchActionsEl(event.currentTarget);
              captureEvent('openActions');
            }}
            disableRipple
          >
            <ImportExportOutlined />
            <p>{intl.messages['schedule.bulkAction']}</p>
          </Button>
        </div>
        {renderActionsMenu}
        <div className="separator" />
        <div className="button-container">
          <Button
            fullWidth
            variant="text"
            onClick={() => {
              if (selectedReminders.length > 0) {
                deleteReminders();
                captureEvent('openDeleteReminders', { action: 'delete' });
              } else {
                triggerError(intl.messages['reminders.errors.unselected_reminders']);
                captureEvent('openDeleteReminders', {
                  action: 'delete',
                  error: intl.messages['reminders.errors.unselected_reminders'],
                });
              }
            }}
            disableRipple
          >
            {selectedReminders.length > 0 ? <Delete /> : <DeleteOutline />}
            <p>{`${totalSelectedReminders} ${intl.messages['utils.delete']}`}</p>
          </Button>
        </div>
      </div>
      <ImportModal
        open={openImport}
        onClose={() => setOpenImport(false)}
        importType={IMPORT_TYPES.REMINDERS}
        importRequest={importRemindersRequest}
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
        type={IMPORT_TYPES.REMINDERS}
      />
    </>
  );
};

const MenuItemStyle = makeStyles({
  root: {
    color: '#6A6A6A',
    fontSize: 12,
  },
})(MenuItem);

export default SearchBar;
