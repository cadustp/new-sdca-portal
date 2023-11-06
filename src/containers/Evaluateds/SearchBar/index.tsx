import React, { useState, useEffect } from 'react';
import { injectIntl } from 'react-intl';
import { Input, Menu } from '@mui/material';
import {
  SearchOutlined, FilterList, FormatLineSpacing, ImportExportOutlined, LockOutlined, Lock, LockOpenOutlined, LockOpen,
} from '@mui/icons-material';
import MenuItem from '@mui/material/MenuItem';
import { makeStyles } from 'mui-styles';
import Button from '../../../components/Button';
import { Evaluated, filterParams } from '../../../redux/evaluateds/types';
import SideFilters from '../SideFilters';
import { light } from '../../../styles/palette';
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
  evaluatedsList: Array<Evaluated>,
  emailsList: Array<Evaluated>,
  groupsList: Array<any>,
  filterParams: filterParams,
  exportObject: Blob,
  filterModalIsOpen: boolean,
  selectedEvaluatedsIds: Array<number>,
  action: string,
  exportStatus: string,
  importStatus: string,
  importRowErrors: [],
};

type DispatchProps = {
  handleSearchRequest: Function,
  setInputSearchValue: Function,
  updateFilterParams: Function,
  changeFilterModalStatus: Function,
  updateEvaluateds: Function,
  setSelectedEvaluatedsIds: Function,
  listsDataRequest: Function,
  handleExport: Function,
  clearExportStatus: Function,
  triggerSnackBarError: Function,
  importEvaluatedsRequest: Function,
  clearImportStatus: Function,
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
    label: 'evaluateds.nameAscending',
    sort: ORDER_TYPES.ALPHABETICAL_ASCENDING,
  },
  {
    label: 'evaluateds.nameDescending',
    sort: ORDER_TYPES.ALPHABETICAL_DESCENDING,
  },
];

const SearchBar: React.FC<Props & DispatchProps & StateProps> = ({
  intl,
  inputSearchValue,
  evaluatedsList,
  emailsList,
  groupsList,
  filterParams,
  filterModalIsOpen,
  setInputSearchValue,
  handleSearchRequest,
  updateFilterParams,
  changeFilterModalStatus,
  updateEvaluateds,
  setSelectedEvaluatedsIds,
  selectedEvaluatedsIds,
  action,
  listsDataRequest,
  exportStatus,
  exportObject,
  handleExport,
  clearExportStatus,
  triggerSnackBarError,
  importEvaluatedsRequest,
  importStatus,
  importRowErrors,
  clearImportStatus,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorBatchActionsEl, setAnchorBatchActionsEl] = useState(null);
  const totalSelectedEvaluateds = selectedEvaluatedsIds.length > 0 ? `(${selectedEvaluatedsIds.length})` : '';
  const [openImport, setOpenImport] = useState(false);
  const [openExport, setOpenExport] = useState(false);

  const sortType = filterParams.sort;

  useEffect(() => {
    if (exportStatus === RESPONSE_STATUS.SUCCESS) {
      exporterService({
        fileName: "evaluateds",
        exportObject: exportObject,
        clearCallBack: clearExportStatus
      })
      setOpenExport(false);
    }
  }, [exportStatus]);

  const handleSort = type => {
    const newFilters = { ...filterParams, sort: type };
    updateFilterParams(newFilters);
    handleSearch(newFilters);
    handleCloseSort();
    captureEvent('sortEvaluateds', { sort: type });
  };

  const handleOpenSort = event => {
    captureEvent('openSortEvaluateds');
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
      captureEvent('searchEvaluateds');
    }
  };

  const handleOpenBatchActions = event => {
    captureEvent('openBatchActionsEvaluateds');
    setAnchorBatchActionsEl(event.currentTarget);
  };

  const handleCloseBatchActions = () => {
    setAnchorBatchActionsEl(null);
  };

  const handleActivateInactivateEvaluateds = () => {
    // eslint-disable-next-line object-shorthand
    captureEvent('openActivateEvaluateds', { action: action });
    handleCloseBatchActions();
    updateEvaluateds();
  };

  const handleLoadFilter = () => {
    const hasData = evaluatedsList.length
      && groupsList.length;
    if (!hasData) {
      const requestParams = {
        groups: true,
        evaluateds: true,
        evaluators: true,
      };
      listsDataRequest(requestParams);
    }
    changeFilterModalStatus(true);
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
        ? <>{selectedEvaluatedsIds.length > 0 ? <Lock /> : <LockOpenOutlined />}</>
        : <>{selectedEvaluatedsIds.length > 0 ? <LockOpen /> : <LockOutlined />}</> }
      <p>{`${totalSelectedEvaluateds} ${action}`}</p>
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
            onChange={e => setInputSearchValue(e.target.value)}
            value={inputSearchValue}
            disableUnderline
            placeholder={`${intl.messages['evaluateds.search']}`}
          />
          <div>
            <SearchOutlined
              className="searchIcon"
              onClick={() => {
                handleSearch(filterParams);
                captureEvent('searchEvaluateds');
              }}
            />
          </div>
        </div>
        <SideFilters
          isOpen={filterModalIsOpen}
          changeFilterModalStatus={changeFilterModalStatus}
          intl={intl}
          evaluatedsList={evaluatedsList}
          emailsList={emailsList}
          groupsList={groupsList}
          filterParams={filterParams}
          updateFilterParams={updateFilterParams}
          handleSearch={handleSearch}
          inputSearchValue={inputSearchValue}
          setSelectedEvaluatedsIds={setSelectedEvaluatedsIds}
        />
        <div className="separator" />
        <div className="button-container">
          <Button
            disableRipple
            fullWidth
            variant="text"
            onClick={() => {
              handleLoadFilter();
              captureEvent('openFilterEvaluateds');
            }}
          >
            <FilterList />
            <p>{intl.messages['evaluateds.filterSearch']}</p>
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
            <p>{intl.messages['evaluateds.sortList']}</p>
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
              {intl.messages['evaluateds.batchActions']}
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
              if (selectedEvaluatedsIds.length > 0) {
                handleActivateInactivateEvaluateds();
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
        importType={IMPORT_TYPES.EVALUATEDS}
        importRequest={importEvaluatedsRequest}
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
        type={IMPORT_TYPES.EVALUATEDS}
      />
    </>
  );
};

export default injectIntl(SearchBar);
