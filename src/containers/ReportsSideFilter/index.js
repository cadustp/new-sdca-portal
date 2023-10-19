import PropTypes from 'prop-types';
import React from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import moment from '../../timezones/moment';
import { captureEvent } from '../../analytics';
import Button from '../../components/Button';
import SideMenu from '../../components/SideBar';
import { translateLabels } from '../../helpers/utils';
import {
  clearFilterParams,
  fetchReports,
  fetchReportsWithPagination,
  openSnackbar,
  setEmptyStateTrue,
  updateFilterParams,
  clearSearchReports,
} from '../../redux/actions/reports-actions';
import {
  ClearFilters,
  Content,
  FilterButton,
  Filters,
  Header,
  StyledDatePicker,
  StyledSelectInput,
  Title,
} from './styles';

function SideFilter({
  intl,
  forms,
  statuses,
  groups,
  userType,
  active,
  appUsers,
  handleUpdateFilterParams,
  valuatedUsers,
  sideFilterParams,
  inputText,
  onClose,
  handleOpenSnackbarAction,
  handleFetchReports,
  handleClearFilterParams,
  handleClearSearch,
}) {
  const formatDate = date => (date === null ? date : moment(date));

  const formatLabel = ({ isForm, item, isUser }) => {
    if (isForm) {
      return item.name;
    }
    if (isUser) {
      return `${item.name} - ${item.email}` || item.label;
    }

    return `${item.name}` || item.label;
  };

  const handleFormChange = selectedForms => {
    handleUpdateFilterParams({ selectedForms });
  };

  const handleDateChange = (selectedStartDate, selectedEndDate) => {
    handleUpdateFilterParams({ selectedStartDate, selectedEndDate });
  };

  const handleStatusChange = selectedStatuses => {
    handleUpdateFilterParams({ selectedStatuses });
  };

  const handleGroupChange = selectedGroups => {
    handleUpdateFilterParams({ selectedGroups });
  };

  const handleAppUserChange = selectedAppUsers => {
    handleUpdateFilterParams({ selectedAppUsers });
  };

  const handleValuatedUserChange = selectedValuatedUsers => {
    handleUpdateFilterParams({ selectedValuatedUsers });
  };

  const handleClearFilters = () => {
    handleClearFilterParams();
    captureEvent('clearFiltersReports');
  };

  const filterParamsEmpty = sideFilterParams => Object.values(sideFilterParams).every(
    param => param === null || param.length === 0
  );

  const handleSearchReports = () => {
    const searchParams = {
      ...sideFilterParams,
      inputText,
    };

    if (!filterParamsEmpty(sideFilterParams) || inputText) {
      handleClearSearch();
      handleFetchReports({
        params: searchParams,
        paginate: true,
        page: 1,
      });
    } else {
      handleClearFilters();
      handleOpenSnackbarAction('filterSnackbar');
    }
    onClose();
  };

  const renderButtonFooter = () => (
    <FilterButton>
      <Button variant="contained" onClick={handleSearchReports}>
        {intl.messages['report_side_filter.filter_button']}
      </Button>
    </FilterButton>
  );

  const formatDataSet = ({ items, isForm, isUser }) => {
    if (items) {
      return items.map(item => ({
        value: item.id || item.value,
        label: formatLabel({ isForm, isUser, item }),
      }));
    }
    return items;
  };

  const renderContent = () => (
    <Content>
      <Header>
        <Title>{intl.messages['report_side_filter.filter']}</Title>
        <ClearFilters onClick={handleClearFilters}>
          {intl.messages['report_side_filter.clear_filters']}
        </ClearFilters>
      </Header>
      <Filters>
        <StyledSelectInput
          title={intl.messages['report_side_filter.form_title']}
          placeholder={intl.messages['report_side_filter.form_placeholder']}
          setSelectedItems={handleFormChange}
          items={formatDataSet({ items: forms, isForm: true })}
          selectedItems={sideFilterParams.selectedForms}
          isMulti
        />
        <StyledDatePicker
          title={intl.messages['report_side_filter.date_title']}
          selectedStartDate={formatDate(sideFilterParams.selectedStartDate)}
          selectedEndDate={formatDate(sideFilterParams.selectedEndDate)}
          onChange={handleDateChange}
        />
        <StyledSelectInput
          title={intl.messages['report_side_filter.status_title']}
          placeholder={intl.messages['report_side_filter.status_placeholder']}
          setSelectedItems={handleStatusChange}
          items={translateLabels(intl, statuses)}
          selectedItems={sideFilterParams.selectedStatuses}
          isMulti
        />
        { userType !== 'app_user' && (
          <StyledSelectInput
            isAutoComplete
            title={intl.messages['report_side_filter.evaluator_group_title']}
            placeholder={intl.messages['report_side_filter.group_placeholder']}
            setSelectedItems={handleGroupChange}
            items={formatDataSet({ items: groups })}
            selectedItems={sideFilterParams.selectedGroups}
            isMulti
          />
        )}
        { userType !== 'app_user' && (
          <StyledSelectInput
            title={intl.messages['report_side_filter.app_user_title']}
            placeholder={
                intl.messages['report_side_filter.app_user_placeholder']
              }
            setSelectedItems={handleAppUserChange}
            items={formatDataSet({ items: appUsers, isUser: true })}
            selectedItems={sideFilterParams.selectedAppUsers}
            isMulti
          />
        )}
        <StyledSelectInput
          title={intl.messages['report_side_filter.evaluated_title']}
          placeholder={
              intl.messages['report_side_filter.evaluated_placeholder']
            }
          setSelectedItems={handleValuatedUserChange}
          items={formatDataSet({ items: valuatedUsers, isUser: true })}
          selectedItems={sideFilterParams.selectedValuatedUsers}
          isMulti
        />
      </Filters>
    </Content>
  );

  return (
    <SideMenu
      active={active}
      content={(
        <>
          {renderContent()}
          {renderButtonFooter()}
        </>
      )}
      onClose={onClose}
    />
  );
}

const dataShape = PropTypes.shape({
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
});

const dataArrayShape = PropTypes.arrayOf(
  PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })
);

SideFilter.propTypes = {
  // expected props
  active: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  appUsers: dataArrayShape.isRequired,
  forms: dataArrayShape.isRequired,
  groups: dataArrayShape.isRequired,
  valuatedUsers: dataShape.isRequired,

  // redux related props
  handleClearFilterParams: PropTypes.func.isRequired,
  handleOpenSnackbarAction: PropTypes.func.isRequired,
  handleFetchReports: PropTypes.func.isRequired,
  handleClearSearch: PropTypes.func.isRequired,

  handleUpdateFilterParams: PropTypes.func.isRequired,
  inputText: PropTypes.string.isRequired,
  intl: PropTypes.shape({
    messages: PropTypes.objectOf(PropTypes.object).isRequired,
  }).isRequired,
  sideFilterParams: PropTypes.shape({
    selectedForms: dataArrayShape,
    selectedStartDate: PropTypes.instanceOf(Date),
    selectedEndDate: PropTypes.instanceOf(Date),
    selectedStatuses: dataArrayShape,
    selectedGroups: dataArrayShape,
    selectedAppUsers: dataArrayShape,
    selectedValuatedUsers: dataArrayShape,
  }).isRequired,
  statuses: dataShape.isRequired,
};

const mapStateToProps = state => ({
  statuses: state.reminderStatusesReducer.statuses,
  sideFilterParams: state.reportsReducer.sideFilterParams,
  inputText: state.reportsReducer.inputText,
});

const mapDispatchToProps = dispatch => ({
  handleUpdateFilterParams: (...args) => dispatch(updateFilterParams(dispatch, ...args)),
  handleClearFilterParams: () => dispatch(clearFilterParams()),
  handleOpenSnackbarAction: (...args) => dispatch(openSnackbar(...args)),
  handleSetEmptyStateTrue: () => dispatch(setEmptyStateTrue()),
  handleClearSearch: () => dispatch(clearSearchReports()),
  handleFetchReports: requestParams => {
    const { page } = requestParams;

    if (page === 1) {
      dispatch(fetchReports(requestParams));
    } else {
      dispatch(fetchReportsWithPagination(requestParams));
    }
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(SideFilter));
