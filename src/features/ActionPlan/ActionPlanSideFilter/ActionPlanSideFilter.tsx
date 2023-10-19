import React from 'react';
import { Moment } from 'moment-timezone';
import SideMenu from '../../../components/SideBar';
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
import Button from '../../../components/Button';
import { formatDataSet } from '../../../helpers/utils';

type dataShape = {
  value: string,
  label: string,
};

interface StateProps {
  intl: {
    messages: Array<dataShape>;
  },
  sideFilterParams: {
    startRange: Moment,
    endRange: Moment,
    planUserIds: [],
    planUserGroupIds: [],
    assetIds: [],
    assetGroupIds: [],
    appUserIds: [],
    appUserGroupIds: [],
  },
  groups: Array<any>,
  appUsers: Array<any>,
  valuatedUsers: Array<any>,
  actionPlanUsers: Array<any>,
}

interface DispatchProps {
  handleClearFilterParams: Function
  handleUpdateFilters: Function
}

interface OwnProps {
  open: boolean,
  onClose: Function,
  onSearch: Function,
  groups: Array<any>,
  appUsers: Array<any>,
  valuatedUsers: Array<any>,
}

type Props = StateProps & DispatchProps & OwnProps;

const ActionPlanSideFilter: React.FC<Props> = ({
  intl,
  open,
  onClose,
  onSearch,
  sideFilterParams,
  groups,
  appUsers,
  valuatedUsers,
  actionPlanUsers,
  handleUpdateFilters,
  handleClearFilterParams,
}) => (
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
              }}
              >
                {intl.messages['report_side_filter.clear_filters']}
              </ClearFilters>
            </Header>
            <Filters>
              <StyledDatePicker
                title={intl.messages['report_side_filter.date_title']}
                selectedStartDate={sideFilterParams.startRange}
                selectedEndDate={sideFilterParams.endRange}
                onChange={(startRange, endRange) => handleUpdateFilters({ startRange, endRange })}
                onClose={() => {}}
              />
              <StyledSelectInput
                title={intl.messages['action_plan.side_filter.responsible']}
                placeholder={intl.messages['action_plan.side_filter.responsible.placeholder']}
                setSelectedItems={planUserIds => handleUpdateFilters({ planUserIds })}
                items={formatDataSet(actionPlanUsers)}
                selectedItems={sideFilterParams.planUserIds}
                isMulti
              />
              <StyledSelectInput
                title={intl.messages['action_plan.side_filter.responsible_group']}
                placeholder={intl.messages['action_plan.side_filter.responsible_group.placeholder']}
                setSelectedItems={planUserGroupIds => handleUpdateFilters({ planUserGroupIds })}
                items={formatDataSet(groups)}
                selectedItems={sideFilterParams.planUserGroupIds}
                isMulti
              />
              <div>
                <StyledSelectInput
                  title={intl.messages['action_plan.side_filter.asset']}
                  placeholder={intl.messages['action_plan.side_filter.asset.placeholder']}
                  setSelectedItems={assetIds => handleUpdateFilters({ assetIds })}
                  items={formatDataSet(valuatedUsers)}
                  selectedItems={sideFilterParams.assetIds}
                  isMulti
                />
                <StyledSelectInput
                  title={intl.messages['action_plan.side_filter.asset_group']}
                  placeholder={intl.messages['action_plan.side_filter.asset_group.placeholder']}
                  setSelectedItems={assetGroupIds => handleUpdateFilters({ assetGroupIds })}
                  items={formatDataSet(groups)}
                  selectedItems={sideFilterParams.assetGroupIds}
                  isMulti
                />
                <StyledSelectInput
                  title={intl.messages['action_plan.side_filter.evaluator']}
                  placeholder={intl.messages['action_plan.side_filter.evaluator.placeholder']}
                  setSelectedItems={appUserIds => handleUpdateFilters({ appUserIds })}
                  items={formatDataSet(appUsers)}
                  selectedItems={sideFilterParams.appUserIds}
                  isMulti
                />
                <StyledSelectInput
                  title={intl.messages['action_plan.side_filter.evaluator_group']}
                  placeholder={intl.messages['action_plan.side_filter.evaluator_group.placeholder']}
                  setSelectedItems={appUserGroupIds => handleUpdateFilters({ appUserGroupIds })}
                  items={formatDataSet(groups)}
                  selectedItems={sideFilterParams.appUserGroupIds}
                  isMulti
                />
              </div>
            </Filters>
          </Content>
          <FilterButton>
            <Button
              variant="contained"
              onClick={
                onSearch
              }
            >
              {intl.messages['report_side_filter.filter_button']}
            </Button>
          </FilterButton>
        </>
        )}
      onClose={() => onClose()}
    />
  </div>
);

export default ActionPlanSideFilter;
