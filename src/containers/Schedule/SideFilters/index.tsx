import React from 'react';
import moment from '../../../timezones/moment';
import SideMenu from '../../../components/SideBar';
import Button from '../../../components/Button';
import {
  User,
} from '../../../redux/users/types';
import {
  ClearFilters,
  Content,
  FilterButton,
  Filters,
  Header,
  StyledDatePicker,
  StyledSelectInput,
  Title,
  NameInput,
} from './styles';
import { IForm } from '../../../redux/RemindersSideFilters/types';
import { formatDataSet } from '../../../helpers/utils';
import { captureEvent } from '../../../analytics';

type Props = {
  intl: {
    messages: [],
  },
  filter: {
    inputSearchValue: string,
    form: Array<any>,
    appUser: Array<any>,
    evaluatedUser: Array<any>,
    startDate: string,
    endDate: string,
    status: Array<any>,
  }
};

type StateProps = {
  evaluateds: Array<User>,
  evaluators: Array<User>,
  isOpen: boolean,
  forms: Array<IForm>,
};

type DispatchProps = {
  changeFilterModalStatus: Function,
  handleSearch: Function,
  setFilter: Function,
  clearFilters: Function,
};

const SideFilters: React.FC<Props & StateProps & DispatchProps> = ({
  changeFilterModalStatus,
  clearFilters,
  evaluateds,
  evaluators,
  filter,
  forms,
  handleSearch,
  intl,
  isOpen,
  setFilter,
}) => {
  const handleDateChange = (selectedStartDate, selectedEndDate) => {
    setFilter({
      ...filter,
      startDate: selectedStartDate,
      endDate: selectedEndDate,
    });
  };

  const options = [
    { key: 0, value: 0, label: `${intl.messages['schedule.status.pending']}` },
    { key: 1, value: 1, label: `${intl.messages['schedule.status.late']}` },
    { key: 2, value: 2, label: `${intl.messages['schedule.status.done']}` },
    { key: 3, value: 3, label: `${intl.messages['schedule.status.canceled']}` },
  ];

  const formatList = list => formatDataSet(list).sort((a, b) => ((a.label > b.label) ? 1 : -1));

  const handleFilter = () => {
    handleSearch();
    captureEvent('filterRemindersSchedule', {
      hasName: !!filter?.inputSearchValue,
      hasForms: filter?.form?.length,
      hasEvaluators: filter?.appUser?.length,
      hasEvaluateds: filter?.evaluatedUser?.length,
      hasStatus: filter?.status?.map(s => s.key),
      hasDates: !!filter?.startDate && !!filter?.endDate,
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
                  captureEvent('clearFiltersSchedule');
                }}
                >
                  {intl.messages['report_side_filter.clear_filters']}
                </ClearFilters>
              </Header>
              <Filters>
                <NameInput
                  title={intl.messages['schedule.filters.name']}
                  onChange={event => setFilter({ ...filter, inputSearchValue: event.target.value })}
                  value={filter.inputSearchValue}
                  disableUnderline
                  placeholder={`${intl.messages['schedule.filters.name.placeholder']}`}
                />
                <StyledSelectInput
                  title={intl.messages['schedule.filters.form']}
                  placeholder={intl.messages['schedule.filters.form.placeholder']}
                  setSelectedItems={form => setFilter({ ...filter, form })}
                  items={formatList(forms)}
                  selectedItems={filter.form}
                  isMulti
                />
                <StyledSelectInput
                  title={intl.messages['schedule.filters.appuser']}
                  placeholder={intl.messages['schedule.filters.appuser.placeholder']}
                  setSelectedItems={appUser => setFilter({ ...filter, appUser })}
                  items={formatList(evaluators)}
                  selectedItems={filter.appUser}
                  isMulti
                />
                <StyledSelectInput
                  title={intl.messages['schedule.filters.evaluated']}
                  placeholder={intl.messages['schedule.filters.evaluated.placeholder']}
                  setSelectedItems={evaluatedUser => setFilter({ ...filter, evaluatedUser })}
                  items={formatList(evaluateds)}
                  selectedItems={filter.evaluatedUser}
                  isMulti
                />
                <StyledSelectInput
                  title={intl.messages['schedule.filters.status']}
                  placeholder={intl.messages['schedule.filters.status.placeholder']}
                  setSelectedItems={status => setFilter({ ...filter, status })}
                  items={options}
                  selectedItems={filter.status}
                  isMulti
                />
                <StyledDatePicker
                  title={intl.messages['schedule.created']}
                  selectedStartDate={moment(filter.startDate)}
                  selectedEndDate={moment(filter.endDate)}
                  onChange={handleDateChange}
                  onClose={() => {}}
                />
              </Filters>
            </Content>
            <FilterButton>
              <Button variant="contained" onClick={handleFilter}>
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
