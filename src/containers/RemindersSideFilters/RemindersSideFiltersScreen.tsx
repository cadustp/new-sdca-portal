import React from 'react';
import { Moment } from 'moment-timezone';
import SideMenu from '../../components/SideBar';
import { translateLabels } from '../../helpers/utils';
import Button from '../../components/Button';
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

import {
  IForm,
} from '../../redux/RemindersSideFilters/types';
import { captureEvent } from '../../analytics';

type dataShape = {
  value: string,
  label: string,
};

interface StateProps {
  intl: {
    messages: Array<dataShape>;
  },
  forms: Array<IForm>,
  statuses: dataShape,
  valuatedUsers: dataShape,
  sideFilterParams: {
    selectedForms: Array<dataShape>,
    selectedStartDate: Moment,
    selectedEndDate: Moment,
    selectedStatuses: Array<dataShape>,
    selectedGroups: Array<dataShape>,
    selectedAppUsers: Array<dataShape>,
    selectedValuatedUsers: Array<dataShape>,
  },
  userType: string,
  inputText: string,
}
interface DispatchProps {
  handleClearFilterParams: Function
  handleOpenSnackbarAction: Function
  handleFetchAppUserReminders: Function
  handleClearSearch: Function
  handleUpdateFilterReminders: Function
}
interface OwnProps {
  open: boolean,
  onClose: Function,
}

type Props = StateProps & DispatchProps & OwnProps;

const RemindersSideFilters: React.FC<Props> = ({
  open,
  intl,
  forms,
  statuses,
  valuatedUsers,
  sideFilterParams,
  onClose,
  inputText,
  handleClearFilterParams,
  handleUpdateFilterReminders,
  handleFetchAppUserReminders,
}) => {
  const handleSearch = () => {
    const searchParams = {
      ...sideFilterParams,
      inputText,
      filter: true,
    };
    handleFetchAppUserReminders({
      params: searchParams,
      paginate: true,
      page: 1,
    });
    onClose();
  };

  const formatLabel = ({ isForm, item, isUser }) => {
    if (isForm) {
      return item.name;
    }
    if (isUser) {
      return `${item.name} - ${item.email}` || item.label;
    }

    return `${item.name}` || item.label;
  };

  const formatDataSet = ({ items, isForm, isUser }) => {
    if (items) {
      return items.map(item => ({
        value: item.id || item.value,
        label: formatLabel({ isForm, isUser, item }),
        key: (item.id || item.value || Math.random()),
      }));
    }
    return items;
  };

  return (
    <div>
      <SideMenu
        active={open}
        content={(
          <>
            <Content>
              <Header>
                <Title>{intl.messages['report_side_filter.filter']}</Title>
                <ClearFilters onClick={() => {
                  handleClearFilterParams();
                  captureEvent('clearFiltersReminders');
                }}
                >
                  {intl.messages['report_side_filter.clear_filters']}
                </ClearFilters>
              </Header>
              <Filters>
                <StyledSelectInput
                  title={intl.messages['report_side_filter.form_title']}
                  placeholder={intl.messages['report_side_filter.form_placeholder']}
                  setSelectedItems={selectedForms => handleUpdateFilterReminders({ selectedForms })}
                  items={formatDataSet({ items: forms, isForm: true, isUser: false })}
                  selectedItems={sideFilterParams.selectedForms}
                  isMulti
                />
                <StyledDatePicker
                  title={intl.messages['report_side_filter.date_title']}
                  selectedStartDate={sideFilterParams.selectedStartDate}
                  selectedEndDate={sideFilterParams.selectedEndDate}
                  onChange={(selectedStartDate, selectedEndDate) => handleUpdateFilterReminders({ selectedStartDate, selectedEndDate })}
                  onClose={() => {}}
                />
                <StyledSelectInput
                  title={intl.messages['report_side_filter.status_title']}
                  placeholder={intl.messages['report_side_filter.status_placeholder']}
                  setSelectedItems={selectedStatuses => handleUpdateFilterReminders({ selectedStatuses })}
                  items={translateLabels(intl, statuses)}
                  selectedItems={sideFilterParams.selectedStatuses}
                  isMulti
                />
                <StyledSelectInput
                  title={intl.messages['report_side_filter.evaluated_title']}
                  placeholder={
                      intl.messages['report_side_filter.evaluated_placeholder']
                    }
                  setSelectedItems={selectedValuatedUsers => handleUpdateFilterReminders({ selectedValuatedUsers })}
                  items={formatDataSet({ items: valuatedUsers, isForm: false, isUser: true })}
                  selectedItems={sideFilterParams.selectedValuatedUsers}
                  isMulti
                />
              </Filters>
            </Content>
            <FilterButton>
              <Button variant="contained" onClick={handleSearch}>
                {intl.messages['report_side_filter.filter_button']}
              </Button>
            </FilterButton>
          </>
            )}
        onClose={() => onClose()}
      />
    </div>
  );
};

export default RemindersSideFilters;
