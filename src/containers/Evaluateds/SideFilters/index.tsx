import React, { useState } from 'react';
import SideMenu from '../../../components/SideBar';
import Button from '../../../components/Button';
import { formatDataSet } from '../../../helpers/utils';
import { filterParams, Evaluated } from '../../../redux/evaluateds/types';

import {
  ClearFilters,
  Content,
  FilterButton,
  Filters,
  Header,
  StyledDatePicker,
  StyledSelectInput,
  Title,
  StyledSwitch,
} from './styles';
import { captureEvent } from '../../../analytics';

interface StateProps {
  isOpen: boolean,
  intl: {
    messages: [],
  },
  evaluatedsList: Array<Evaluated>,
  emailsList: Array<Evaluated>,
  groupsList: Array<any>,
  filterParams: filterParams,
  inputSearchValue: string,
};

interface DispatchProps {
  updateFilterParams: Function,
  handleSearch: Function,
  changeFilterModalStatus: Function,
  setSelectedEvaluatedsIds: Function,
};

const SideFilters: React.FC<StateProps & DispatchProps> = ({
  isOpen,
  intl,
  evaluatedsList,
  emailsList,
  filterParams,
  updateFilterParams,
  handleSearch,
  changeFilterModalStatus,
  groupsList,
  inputSearchValue,
  setSelectedEvaluatedsIds,
}) => {
  const {
    startDate,
    endDate,
    groups,
    names,
    emails,
    active,
    sort,
  } = filterParams;

  const [selectedStartDate, setSelectedStartDate] = useState(startDate);
  const [selectedEndDate, setSelectedEndDate] = useState(endDate);
  const [selectedGroups, setSelectedGroups] = useState(groups);
  const [selectedNames, setSelectedNames] = useState(names);
  const [selectedEmails, setSelectedEmails] = useState(emails);
  const [selectedActive, setSelectedActive] = useState(active);

  const handleDateChange = (selectedStartDate, selectedEndDate) => {
    if (selectedStartDate) setSelectedStartDate(selectedStartDate);
    if (selectedEndDate) setSelectedEndDate(selectedEndDate);
  };

  const clearFilters = () => {
    setSelectedNames([]);
    setSelectedEmails([]);
    setSelectedGroups([]);
    setSelectedStartDate('');
    setSelectedEndDate('');
    setSelectedEvaluatedsIds([]);
    captureEvent('clearFiltersEvaluateds');
  };

  const handleUpdateFilterParams = () => {
    setSelectedEvaluatedsIds([]);
    const newFilters: filterParams = {
      text: inputSearchValue,
      names: selectedNames,
      emails: selectedEmails,
      groups: selectedGroups,
      startDate: selectedStartDate,
      endDate: selectedEndDate,
      active: selectedActive,
      sort,
    };
    updateFilterParams(newFilters);
    handleSearch(newFilters);
    captureEvent('filterEvaluateds', {
      hasNames: selectedNames?.length,
      hasEmails: selectedEmails?.length,
      hasGroups: selectedGroups?.length,
      hasDates: !!selectedStartDate && !!selectedEndDate,
      active: selectedActive,
    });
  };

  return (
    <>
      <SideMenu
        active={isOpen}
        onClose={() => changeFilterModalStatus(false)}
        content={(
          <>
            <Content>
              <Header>
                <Title>{intl.messages['report_side_filter.filter']}</Title>
                <ClearFilters onClick={clearFilters}>
                  {intl.messages['report_side_filter.clear_filters']}
                </ClearFilters>
              </Header>
              <Filters>
                <StyledSelectInput
                  isAutoComplete
                  title={intl.messages['evaluateds.filters.selectNames']}
                  placeholder={intl.messages['evaluateds.filters.placeholderSelectNames']}
                  onChange={evaluatedsList => setSelectedNames(evaluatedsList)}
                  items={formatDataSet(evaluatedsList, ['name'])}
                  selectedItems={selectedNames}
                  isMulti
                />
                <StyledSelectInput
                  isAutoComplete
                  title={intl.messages['evaluateds.filters.selectEmails']}
                  placeholder={intl.messages['evaluateds.filters.placeholderSelectEmails']}
                  onChange={emailsList => setSelectedEmails(emailsList)}
                  items={formatDataSet(emailsList, ['email'])}
                  selectedItems={selectedEmails}
                  isMulti
                />
                <StyledSelectInput
                  isAutoComplete
                  title={intl.messages['evaluateds.filters.selectGroups']}
                  placeholder={intl.messages['evaluateds.filters.placeholderSelectGroups']}
                  onChange={groupsList => setSelectedGroups(groupsList)}
                  items={formatDataSet(groupsList)}
                  selectedItems={selectedGroups}
                  isMulti
                />
                <StyledDatePicker
                  title={intl.messages['evaluateds.filters.created_at']}
                  selectedStartDate={selectedStartDate}
                  selectedEndDate={selectedEndDate}
                  onChange={handleDateChange}
                />
                <StyledSwitch
                  title={intl.messages['reports.active_label']}
                  color="primary"
                  onChange={e => {
                    setSelectedActive(e.target.checked);
                    captureEvent('toggleActiveEvaluateds', { active: e.target.checked });
                  }}
                  value={selectedActive}
                  checked={selectedActive}
                />
              </Filters>
            </Content>
            <FilterButton>
              <Button variant="contained" onClick={handleUpdateFilterParams}>
                {intl.messages['report_side_filter.filter_button']}
              </Button>
            </FilterButton>
          </>
        )}
      />
    </>
  );
};

export default SideFilters;
