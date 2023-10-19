import React, { useState } from 'react';
import SideMenu from '../../../components/SideBar';
import Button from '../../../components/Button';
import { formatDataSet } from '../../../helpers/utils';
import { filterParams, GroupMembers } from '../../../redux/groups/types';

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
import { captureEvent } from '../../../analytics';

interface StateProps {
  isOpen: boolean,
  intl: {
    messages: [],
  },
  groups: Array<any>,
  filterParams: filterParams,
  filterMembers: Array<GroupMembers>,
};

interface DispatchProps {
  updateFilterParams: Function,
  handleSearch: Function,
  changeFilterModalStatus: Function,
};

const SideFilters: React.FC<StateProps & DispatchProps> = ({
  isOpen,
  intl,
  groups,
  filterParams,
  updateFilterParams,
  handleSearch,
  filterMembers,
  changeFilterModalStatus,
}) => {
  const [startDate, setStartDate] = useState(filterParams.selectedStartDate);
  const [endDate, setEndDate] = useState(filterParams.selectedEndDate);
  const [parentGroups, setParentGroups] = useState(filterParams.selectedParentGroups);
  const [selectedGroups, setSelectedGroups] = useState(filterParams.selectedGroups);
  const [selectedGroupMembers, setSelectedGroupMembers] = useState(filterParams.selectedGroupMembers);

  const handleDateChange = (selectedStartDate, selectedEndDate) => {
    if (selectedStartDate) setStartDate(selectedStartDate);
    if (selectedEndDate) setEndDate(selectedEndDate);
  };

  const clearFilters = () => {
    setStartDate('');
    setEndDate('');
    setParentGroups([]);
    setSelectedGroupMembers([]);
    setSelectedGroups([]);
  };

  const handleUpdateFilterParams = () => {
    const newFilters = {
      selectedStartDate: startDate,
      selectedEndDate: endDate,
      selectedParentGroups: parentGroups,
      selectedSortType: filterParams.selectedSortType,
      selectedGroupMembers,
      selectedGroups,
    };
    updateFilterParams(newFilters);
    handleSearch(newFilters);
    captureEvent('filterGroups', {
      hasNames: selectedGroups?.length,
      hasParents: parentGroups?.length,
      hasMembers: selectedGroupMembers?.length,
      hasDates: !!startDate && !!endDate,
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
                <ClearFilters onClick={() => {
                  clearFilters();
                  captureEvent('clearFiltersGroups');
                }}
                >
                  {intl.messages['report_side_filter.clear_filters']}
                </ClearFilters>
              </Header>
              <Filters>
                <StyledSelectInput
                  isAutoComplete
                  title={intl.messages['groups.filters.selectGroup']}
                  placeholder={intl.messages['groups.filters.placeholderSelectGroup']}
                  onChange={groups => setSelectedGroups(groups)}
                  items={formatDataSet(groups)}
                  selectedItems={selectedGroups}
                  isMulti
                />
                <StyledSelectInput
                  isAutoComplete
                  title={intl.messages['parentGroup.title']}
                  placeholder={intl.messages['groups.filters.placeholderSelectGroup']}
                  onChange={selectedParentGroups => setParentGroups(selectedParentGroups)}
                  items={formatDataSet(groups)}
                  selectedItems={parentGroups}
                  isMulti
                />
                <StyledSelectInput
                  isAutoComplete
                  title={intl.messages['groups.members']}
                  placeholder={intl.messages['filters.member.placeholder']}
                  onChange={users => setSelectedGroupMembers(users)}
                  items={formatDataSet(filterMembers, ['name', 'email'])}
                  selectedItems={selectedGroupMembers}
                  isMulti
                />
                <StyledDatePicker
                  title={intl.messages['groups.created']}
                  selectedStartDate={startDate}
                  selectedEndDate={endDate}
                  onChange={handleDateChange}
                  onClose={() => {}}
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
