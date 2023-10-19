import React, { useState, useEffect } from 'react';
import { injectIntl } from 'react-intl';
import { Input, Menu } from '@material-ui/core';
import {
  SearchOutlined, FilterList, FormatLineSpacing, ImportExportOutlined,
} from '@material-ui/icons';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import { light } from '../../../styles/palette';
import { IMPORT_TYPES, ORDER_TYPES, RESPONSE_STATUS } from '../../../helpers/consts';
import SideFilters from '../SideFilters';
import { filterParams, GroupMembers } from '../../../redux/groups/types';
import ImportModal from '../../../components/ImportModal';
import ExportModal from '../../../components/ExportModal';

import Button from '../../../components/Button';
import '../styles.css';
import { captureEvent } from '../../../analytics';
import exporterService from '../../../services/exporterService';

type Props = {
  intl: {
    messages: [];
  };
};

type StateProps = {
  inputSearchValue: string,
  filterGroups: Array<any>,
  filterMembers: Array<GroupMembers>,
  filterParams: filterParams,
  filterModalIsOpen: boolean,
  importStatus: string,
  exportObject: Blob,
  exportStatus: string,
  importRowErrors: [],
};

type DispatchProps = {
  onSort: Function,
  setInputSearchValue: Function,
  handleSearchRequest: Function,
  updateFilterParams: Function,
  changeFilterModalStatus: Function,
  listsDataRequest: Function,
  importGroupsRequest: Function,
  clearImportStatus: Function,
  handleExport: Function,
  clearExportStatus: Function,
};

const MenuItemStyle = withStyles({
  root: {
    color: '#6A6A6A',
    fontSize: 12,
  },
})(MenuItem);

const sortItems = [
  {
    label: 'groups.nameAscending',
    sort: ORDER_TYPES.ALPHABETICAL_ASCENDING,
  },
  {
    label: 'groups.nameDescending',
    sort: ORDER_TYPES.ALPHABETICAL_DESCENDING,
  },
  {
    label: 'groups.creationDateAscending',
    sort: ORDER_TYPES.CREATION_DATE_ASCENDING,
  },
  {
    label: 'groups.creationDateDescending',
    sort: ORDER_TYPES.CREATION_DATE_DESCENDING,
  },
];

const SearchBar: React.FC<Props & DispatchProps & StateProps> = ({
  intl,
  inputSearchValue,
  setInputSearchValue,
  handleSearchRequest,
  filterGroups,
  filterParams,
  updateFilterParams,
  filterModalIsOpen,
  changeFilterModalStatus,
  filterMembers,
  listsDataRequest,
  importGroupsRequest,
  importStatus,
  importRowErrors,
  clearImportStatus,
  handleExport,
  exportStatus,
  exportObject,
  clearExportStatus,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorBatchActionsEl, setAnchorBatchActionsEl] = useState(null);
  const [openImport, setOpenImport] = useState(false);
  const [openExport, setOpenExport] = useState(false);

  useEffect(() => {
    if(exportStatus === RESPONSE_STATUS.SUCCESS) {
      exporterService({
        fileName: "Groups",
        exportObject: exportObject,
        clearCallBack: clearExportStatus
      })
    }
  }, [exportStatus])

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
      setOpenExport(false);
      clearExportStatus();
    }
  }, [exportStatus]);

  const sortType = filterParams.selectedSortType || 'ALPHABETICAL_ASCENDING';

  const handleSort = type => {
    const newFilters = { ...filterParams, selectedSortType: type };
    updateFilterParams(newFilters);
    handleSearch(newFilters);
    handleCloseSort();
    captureEvent('sortGroups', { sort: type });
  };

  const handleOpenSort = event => {
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
      captureEvent('searchGroups');
      handleSearch(filterParams);
    }
  };

  const handleLoadFilter = () => {
    const hasData = filterGroups.length
      && filterMembers.length;
    if (!hasData) {
      const requestParams = {
        groups: true,
        evaluators: true,
        evaluateds: true,
      };
      listsDataRequest(requestParams);
    }
    changeFilterModalStatus(true);
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
      onClose={handleCloseSort}
      PaperProps={{
        style: {
          padding: 0,
          transform: 'translateY(+20%)',
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
      <div className="gp-search-container">
        <div className="search-bar">
          <Input
            className="search-input"
            autoFocus
            onKeyPress={handleKeyPress}
            onChange={event => setInputSearchValue(event.target.value)}
            value={inputSearchValue}
            disableUnderline
            placeholder={`${intl.messages['groups.searchGroup']}`}
          />
          <div>
            <SearchOutlined
              className="searchIcon"
              onClick={() => {
                handleSearch(filterParams);

                captureEvent('searchGroups');
              }}
            />
          </div>
        </div>
        <SideFilters
          isOpen={filterModalIsOpen}
          changeFilterModalStatus={changeFilterModalStatus}
          intl={intl}
          groups={filterGroups}
          filterMembers={filterMembers}
          filterParams={filterParams}
          updateFilterParams={updateFilterParams}
          handleSearch={handleSearch}
        />
        <div className="separator" />
        <div className="button-container">
          <Button
            disableRipple
            fullWidth
            variant="text"
            onClick={() => {
              handleLoadFilter();
              captureEvent('openFilterGroups');
            }}
          >
            <FilterList />
            <p>{intl.messages['groups.filterSearch']}</p>
          </Button>
        </div>
        <div className="separator" />
        <div className="button-container">
          <Button
            fullWidth
            variant="text"
            onClick={e => {
              handleOpenSort(e);
              captureEvent('openSortGroups');
            }}
            disableRipple
          >
            <FormatLineSpacing />
            <p>{intl.messages['groups.sortList']}</p>
          </Button>
        </div>
        {renderSortMenu}
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
      </div>
      <ImportModal
        open={openImport}
        onClose={() => setOpenImport(false)}
        importType={IMPORT_TYPES.GROUPS}
        importRequest={importGroupsRequest}
        importStatus={importStatus}
        importRowErrors={importRowErrors}
        clearStatus={clearImportStatus}
        handleUpdateRequest={handleSearchRequest}
      />
      <ExportModal
        open={openExport}
        openFilters={handleLoadFilter}
        onClose={() => setOpenExport(false)}
        onConfirm={handleExport}
        type={IMPORT_TYPES.GROUPS}
      />
    </>
  );
};

export default injectIntl(SearchBar);
