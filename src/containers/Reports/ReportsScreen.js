import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { InfiniteLoader } from 'react-virtualized';

import Skeleton from 'react-loading-skeleton';
import Button from '../../components/Button';
import Table from '../../components/Table';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import EmptyState from './EmptyState';
import ExportModal from './ExportModal';

import CustomSnackbar from '../../components/shared/CustomSnackbar/CustomSnackbar';
import SearchIcon from '../../components/shared/Icons/SearchIcon';
import FilterIcon from '../../components/shared/Icons/FilterIcon';
import ReportsSideFilter from '../ReportsSideFilter';
import Loading from '../../components/Loading';
import NoSearchIcon from '../../components/shared/Icons/NoSearchIcon';

import WithFailure from '../../hocs/withFailure';
import CustomModal from '../../components/CustomModal';
import AvatarList from './AvatarList';

import {
  SearchBar,
  StyledInput,
  Separator,
  ButtonStyledContainer,
  AvatarListContainer,
  StyledIconContainer,
  SkeletonButtonWrapper,
} from './styles';
import useDefaultFilterDate from "../../hooks/useDefaultFilterDate";
import { 
  REPORT_TYPE_STATUSES, 
  RESPONSE_STATUS, 
  SNACKBAR_VARIANTS 
} from '../../helpers/consts';
import { captureEvent } from '../../analytics';
import Header from "./Header";
const TableWithLoadingAndFailure = WithFailure(Table);

const LoadingTable = ({ searchLoading }) => {
  if (searchLoading) {
    return <Loading />;
  }
  return <></>;
};

 function ReportsScreen({
  listsDataRequest,
  appUsers,
  forms,
  groups,
  valuatedUsers,
  failure,
  loggedUser,
  handleFetchReports,
  intl,
  exportModalOpened,
  handleOpenExportModal,
  handleCloseExportModal,
  handleOpenSnackbarAction,
  handleSetEmptyStateTrue,
  handleUpdateFilterParams,
  searchLoading,
  loadingLists,
  handleCloseSnackbarAction,
  snackbarState,
  handleInputTextChange,
  exportReportTypes,
  reports,
  inputText,
  exportScheduleRequest,
  exportAnswersRequest,
  exportObject,
  exportStatus,
  clearExportStatus,
  loadingReport,
  sideFilterParams
 }) {
  const { startDate, endDate } = useDefaultFilterDate();
  const [listModalOpened, setListModalOpened] = useState(false);
  const [listModalData, setListModalData ] = useState({
    list: [],
    reminderEndDate: null,
    modalTitle: '',
    reminderId: null
  })

  const [sideFilterOpened, setSideFilterOpened] = useState(false);

  const handleCloseSideFilter = () => setSideFilterOpened(false);

  const reportFailed = failure || exportStatus === RESPONSE_STATUS.FAILURE

  const snackBarMessage = reportFailed ? intl.messages.rel_export_failure : intl.messages.rel_export_success; 

  const noFilterError = intl.messages['export_report.no_params_warning'];

  const snackBarType = reportFailed ? SNACKBAR_VARIANTS.ERROR : SNACKBAR_VARIANTS.SUCCESS;

  const paramsToExport = { selectedName: inputText, ...sideFilterParams }

  const initialSelectedStartDate = sideFilterParams.selectedStartDate === null ? startDate : sideFilterParams.selectedStartDate

  const initialSelectedEndDate = sideFilterParams.selectedEndDate === null ? endDate : sideFilterParams.selectedEndDate

  const handleOpenListModal = listModalData => {
    setListModalOpened(true);
    setListModalData(listModalData);
  };

  const handleCloseListModal = () => {
    setListModalOpened(false);
  };

  useEffect(() => {
    if(exportStatus === RESPONSE_STATUS.FAILURE){
      handleOpenSnackbarAction('exportSnackbar');
    }
  }, [exportStatus])

  const handleExport = type => {
    switch(type) {
      case REPORT_TYPE_STATUSES.TYPES[1].label:
        exportAnswersRequest(paramsToExport);
        break;
      case REPORT_TYPE_STATUSES.TYPES[0].label:
        exportScheduleRequest(paramsToExport);
        break;
      default:
        exportAnswersRequest(paramsToExport);
    }
  };

  const handleOpenSideFilter = () => {
    const hasData = appUsers.length
      && forms.length
      && groups.length
      && valuatedUsers.length;
    if (!hasData) {
      const requestParams = {
        forms: true,
        groups: true,
        evaluators: true,
        evaluateds: true,
      };
      listsDataRequest(requestParams);
    }
    captureEvent('openFilterReports');
    setSideFilterOpened(true);
  };

  const getSnackbarText = () => {
    switch(snackbarState.context){
      case 'exportSnackbar':
        return snackBarMessage;
      case 'filterSnackbar':
        return noFilterError;
    }
  }

  useEffect(() => {
    handleUpdateFilterParams({
      selectedStartDate: initialSelectedStartDate,
      selectedEndDate: initialSelectedEndDate
    })
    handleSearch(); 
  }, [])

  const getSnackbarType = () => {
    switch(snackbarState.context){
      case 'exportSnackbar':
        return snackBarType;
      case 'filterSnackbar':
        return SNACKBAR_VARIANTS.WARNING;
    }
  }

  const handleSearch = (sideFilterParams, inputText, page = 1) => {
    const searchParams = {
      ...sideFilterParams,
      inputText,
    };
    handleFetchReports({
      params: searchParams,
      email: loggedUser?.email,
      password: loggedUser?.password,
      paginate: true,
      page,
    });
  };

  const filterParamsEmpty = sideFilterParams => Object.values(sideFilterParams).every(
    param => param === null || param.length === 0
  );

  const handleClickExport = () => {
    handleOpenExportModal();
    captureEvent('openExportReports');
  }

  const handleSearchRequest = e => {

    captureEvent('searchReport', { enterKey: e.key === 'Enter' });
    if (!filterParamsEmpty(sideFilterParams) || inputText) {
      handleSearch(sideFilterParams, inputText);

      if (snackbarState.context === 'filterSnackbar' && snackbarState.open) {
        handleCloseSnackbarAction('filterSnackbar');
      }
    } else {
      handleOpenSnackbarAction('filterSnackbar');
      handleSetEmptyStateTrue();
    }
  };

  const callNextPage = () => {
    const { pagination } = reports;

    if (pagination.links["'next'"]) {
      const { page } = pagination.links["'next'"];
      // eslint-disable-next-line object-shorthand
      captureEvent('loadMoreRowsReports', { page: page });
      return handleSearch(sideFilterParams, inputText, page);
    }
    return false;
  };

  const isRowLoaded = ({ index }) => {
    return !!reports.data[index];
  };

    const reportItems = exportReportTypes.map(type => ({
      id: type.id,
      value: type.label,
      label: intl.messages[type.label.toLowerCase()],
    }));

    const localUser = JSON.parse(localStorage.getItem('user') || '{}');
    const userType = localUser?.majority_type;

    const modalData = {
      reportItems,
    };

    return (
      <>
        <LoadingTable searchLoading={searchLoading || loadingLists} />
          <ReportsSideFilter
            active={sideFilterOpened}
            onClose={handleCloseSideFilter}
            userType={userType}
            appUsers={appUsers}
            forms={forms}
            groups={groups}
            valuatedUsers={valuatedUsers}
          />
          <div className="sc-screen">
            <Header
              buttonAction={handleClickExport}
              intl={intl}
              startDate={sideFilterParams.selectedStartDate}
              endDate={sideFilterParams.selectedEndDate}
              buttonLabel={intl.messages['reports.export_label']}
            />
            <div class="sc-search-container">
              <SearchBar>
                {searchLoading ? (
                  <Skeleton width={400} />
                ) : (
                  <>
                    <StyledInput
                      onKeyPress={e => { if (e.key === 'Enter') { handleSearchRequest(e); } }}
                      autoFocus
                      onChange={event => handleInputTextChange(event.target.value)}
                      value={inputText}
                      placeholder={`${intl.messages['reports.search_label']}`}
                    />
                    <StyledIconContainer onClick={handleSearchRequest}>
                      <SearchIcon />
                    </StyledIconContainer>
                  </>
                )}
              </SearchBar>
              <Separator />
              <ButtonStyledContainer>
                {searchLoading ? (
                  <SkeletonButtonWrapper>
                    <Skeleton width={100} />
                  </SkeletonButtonWrapper>
                ) : (
                  <Button
                    fullWidth
                    variant="text"
                    onClick={handleOpenSideFilter}
                    disableRipple
                  >
                    <FilterIcon />
                    <p>{intl.messages['reports.filter_label']}</p>
                  </Button>
                )}
              </ButtonStyledContainer>
            </div>
            <>
              <InfiniteLoader
                isRowLoaded={isRowLoaded}
                loadMoreRows={callNextPage}
                rowCount={Number(reports.pagination.total)}
                minimumBatchSize={50}
                threshold={25}
              >
                {({ onRowsRendered, registerChild }) => (
                  <TableWithLoadingAndFailure
                    onRowsRendered={onRowsRendered}
                    ref={registerChild}
                    isLoading={searchLoading}
                    failure={failure}
                    rowHeight={88}
                    rowCount={reports.data.length}
                    rowGetter={({ index }) => reports.data[index]}
                    onRowClick={() => {}}
                    headerRowRenderer={(props, width) => (
                      <TableHeader {...props} width={width} />
                    )}
                    rowRenderer={({ rowData, style, key }) => (
                      <TableRow
                        key={key}
                        style={style}
                        rowData={rowData}
                        handleOpenListModal={handleOpenListModal}
                        modalStatus={listModalOpened}
                        handleCloseListModal={handleCloseListModal}
                      />
                    )}
                    noRowsRenderer={() => !searchLoading && (
                    <EmptyState
                      icon={<NoSearchIcon />}
                      descriptionText={
                          intl.messages['reports.empty_state.description_text']
                        }
                      mainText={intl.messages['reports.empty_state.main_title']}
                    />
                    )}
                  />
                )}
              </InfiniteLoader>
              <ExportModal
                data={modalData}
                exportObject={exportObject}
                loadingReport={loadingReport}
                exportStatus={exportStatus}
                clearExportStatus={clearExportStatus}
                exportReportBackend={handleExport}
                open={exportModalOpened}
                handleCloseModal={handleCloseExportModal}
              />
              <CustomModal
                title={listModalData.modalTitle}
                open={listModalOpened}
                onClose={handleCloseListModal}
              >
                <AvatarListContainer>
                  <AvatarList
                    data={listModalData.list}
                    reminderEndDate={listModalData.reminderEndDate}
                    reminderId={listModalData.reminderId}
                  />
                </AvatarListContainer>
              </CustomModal>
            </>
          </div>
          <CustomSnackbar
            data={{
              message: getSnackbarText(intl),
              type: getSnackbarType(),
              open: snackbarState.open,
            }}
            handleClose={() => handleCloseSnackbarAction()}
          />
      </>
    );
}

const valueLabelShape = PropTypes.shape({
  value: PropTypes.number,
  label: PropTypes.string,
});

LoadingTable.propTypes = {
  searchLoading: PropTypes.bool.isRequired,
  loadingLists: PropTypes.bool.isRequired,
  infiniteLoading: PropTypes.bool.isRequired,
};

const dataArrayShape = PropTypes.arrayOf(
  PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })
);

const dataShape = PropTypes.shape({
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
});

ReportsScreen.propTypes = {
  // automatic props
  intl: PropTypes.shape({
    messages: PropTypes.objectOf(PropTypes.object),
  }).isRequired,

  // redux related props
  appUsers: dataArrayShape.isRequired,
  forms: dataArrayShape.isRequired,
  groups: dataArrayShape.isRequired,
  valuatedUsers: dataShape.isRequired,
  clearExportStatus: PropTypes.func,
  exportObject: PropTypes.instanceOf(Blob),
  exportStatus: PropTypes.string,
  exportScheduleRequest: PropTypes.func,
  exportAnswersRequest: PropTypes.func,
  loadingReport: PropTypes.bool,
  exportModalOpened: PropTypes.bool.isRequired,
  failure: PropTypes.bool.isRequired,
  handleCloseSnackbarAction: PropTypes.func.isRequired,
  listsDataRequest: PropTypes.func.isRequired,
  handleUpdateFilterParams: PropTypes.func,
  handleOpenExportModal: PropTypes.func.isRequired,
  handleOpenSnackbarAction: PropTypes.func.isRequired,
  handleCloseExportModal: PropTypes.func.isRequired,
  handleInputTextChange: PropTypes.func.isRequired,
  handleSearchReportsRequest: PropTypes.func.isRequired,
  handleFetchReports: PropTypes.func.isRequired,
  handleSetEmptyStateTrue: PropTypes.func.isRequired,
  inputText: PropTypes.string.isRequired,
  loggedUser: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
  }).isRequired,
  noSearches: PropTypes.bool.isRequired,
  infiniteLoading: PropTypes.bool.isRequired,
  reports: PropTypes.shape({
    length: PropTypes.func,
    pagination: PropTypes.shape(),
    data: PropTypes.shape(),
  }).isRequired,
  exportReportTypes: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  searchLoading: PropTypes.bool.isRequired,
  loadingLists: PropTypes.bool.isRequired,
  sideFilterParams: PropTypes.shape({
    selectedForms: valueLabelShape,
    selectedStartDate: PropTypes.instanceOf(Date),
    selectedEndDate: PropTypes.instanceOf(Date),
    selectedStatuses: valueLabelShape,
    selectedGroups: valueLabelShape,
    selectedAppUsers: valueLabelShape,
    selectedValuatedUsers: valueLabelShape,
  }).isRequired,
  snackbarState: PropTypes.shape({
    context: PropTypes.string,
    type: PropTypes.string,
    open: PropTypes.bool,
  }).isRequired,
};

export default ReportsScreen;
