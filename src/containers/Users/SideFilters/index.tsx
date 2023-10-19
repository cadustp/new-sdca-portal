import React, { useState } from 'react';
import SideMenu from '../../../components/SideBar';
import Button from '../../../components/Button';
import {
  formatDataSet, translateLabels, sortAlphabeticalAscending, getUniqueItemsByKey,
} from '../../../helpers/utils';
import { filterParams, User } from '../../../redux/users/types';

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
  users: Array<User>,
  emailsList: Array<User>,
  groupsList: Array<any>,
  typesOfUserList: Array<any>,
  filterParams: filterParams,
  inputSearchValue: string,
};

interface DispatchProps {
  updateFilterParams: Function,
  handleSearch: Function,
  changeFilterModalStatus: Function,
  setSelectedUsersIds: Function,
};

const SideFilters: React.FC<StateProps & DispatchProps> = ({
  isOpen,
  intl,
  users,
  filterParams,
  updateFilterParams,
  handleSearch,
  changeFilterModalStatus,
  emailsList,
  groupsList,
  typesOfUserList,
  inputSearchValue,
  setSelectedUsersIds,
}) => {
  const {
    startDate,
    endDate,
    groups,
    names,
    emails,
    typesOfUsers,
    active,
  } = filterParams;

  const [selectedStartDate, setSelectedStartDate] = useState(startDate);
  const [selectedEndDate, setSelectedEndDate] = useState(endDate);
  const [selectedGroups, setSelectedGroups] = useState(groups);
  const [selectedNames, setSelectedNames] = useState(names);
  const [selectedEmails, setSelectedEmails] = useState(emails);
  const [selectedTypesOfUsers, setSelectedTypesOfUsers] = useState(typesOfUsers);
  const [selectedActive, setSelectedActive] = useState(active);

  const handleDateChange = (selectedStartDate, selectedEndDate) => {
    if (selectedStartDate) setSelectedStartDate(selectedStartDate);
    if (selectedEndDate) setSelectedEndDate(selectedEndDate);
  };

  const clearFilters = () => {
    setSelectedNames([]);
    setSelectedEmails([]);
    setSelectedGroups([]);
    setSelectedTypesOfUsers([]);
    setSelectedStartDate('');
    setSelectedEndDate('');
    setSelectedUsersIds([]);
    captureEvent('clearFiltersUsers');
  };

  const handleUpdateFilterParams = () => {
    setSelectedUsersIds([]);

    const newFilters = {
      text: inputSearchValue,
      names: selectedNames,
      emails: selectedEmails,
      groups: selectedGroups,
      typesOfUsers: selectedTypesOfUsers,
      startDate: selectedStartDate,
      endDate: selectedEndDate,
      active: selectedActive,
    };
    updateFilterParams(newFilters);
    handleSearch(newFilters);
    captureEvent('filterUsers', {
      hasNames: selectedNames?.length,
      hasEmails: selectedEmails?.length,
      hasGroups: selectedGroups?.length,
      hasUserTypes: selectedTypesOfUsers?.map(t => t.label),
      hasDates: !!selectedStartDate && !!selectedEndDate,
      active: selectedActive,
    });
  };

  const getFormattedUsers = (userList, label) => formatDataSet(getUniqueItemsByKey(userList, 'id').sort(sortAlphabeticalAscending), [label]);

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
                  title={intl.messages['users.filters.selectNames']}
                  placeholder={intl.messages['users.filters.placeholderSelectNames']}
                  onChange={users => setSelectedNames(users)}
                  items={getFormattedUsers(users, 'name')}
                  selectedItems={selectedNames}
                  isMulti
                />
                <StyledSelectInput
                  isAutoComplete
                  title={intl.messages['users.filters.selectEmails']}
                  placeholder={intl.messages['users.filters.placeholderSelectEmails']}
                  onChange={emailsList => setSelectedEmails(emailsList)}
                  items={getFormattedUsers(emailsList, 'email')}
                  selectedItems={selectedEmails}
                  isMulti
                />
                <StyledSelectInput
                  isAutoComplete
                  title={intl.messages['users.filters.selectGroups']}
                  placeholder={intl.messages['users.filters.placeholderSelectGroups']}
                  onChange={groupsList => setSelectedGroups(groupsList)}
                  items={formatDataSet(groupsList)}
                  selectedItems={selectedGroups}
                  isMulti
                />
                <StyledSelectInput
                  isAutoComplete
                  title={intl.messages['users.filters.selectTypesOfUsers']}
                  placeholder={intl.messages['users.filters.placeholderSelectTypesOfUsers']}
                  onChange={typesOfUserList => setSelectedTypesOfUsers(typesOfUserList)}
                  items={translateLabels(intl, typesOfUserList)}
                  selectedItems={selectedTypesOfUsers}
                  isMulti
                />
                <StyledDatePicker
                  title={intl.messages['users.filters.created_at']}
                  selectedStartDate={selectedStartDate}
                  selectedEndDate={selectedEndDate}
                  onChange={handleDateChange}
                  onClose={() => {}}
                />
                <StyledSwitch
                  title={intl.messages['reports.active_label']}
                  color="primary"
                  onChange={e => {
                    setSelectedActive(e.target.checked);
                    captureEvent('toggleActiveUsers', { active: e.target.checked });
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
