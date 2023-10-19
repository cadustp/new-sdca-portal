import React, { Component } from 'react';
import { connect } from 'react-redux';
import { defineMessages, injectIntl } from 'react-intl';
import ChartCardBar from '../../../../components/ChartCardBar';
import { tabs } from '../../../../components/shared/NewFilter/FilterDialog/FilterDialog';
import { fetchQualityByGroups } from '../../../../redux/actions/quality-actions';
import { dashboardDataRequest } from '../../../../redux/dashboard/actions.ts';
import FilterIcon from '../../../../components/shared/Icons/FilterIcon';
import { FilterTabs } from '../../../../helpers/consts';

let chartCardBarTitleLabel = '';
let chartCardBarDataTitleLabel = '';

const mapDispatchToProps = dispatch => ({
  handleFetchQualityByGroups: body => dispatch(fetchQualityByGroups({ body })),
  dashboardDataRequest: () => dispatch(dashboardDataRequest()),
});

const mapStateToProps = state => ({
  user: state.login.information,
  company: state.companyReducer.company,
  formsIds: state.formReducer.notTraining.ids,
  formsLabels: state.formReducer.notTraining.labels,
  forms: state.formReducer.notTraining.forms,
  groups: state.groupReducer.data,
  userGroups: state.groupReducer.data.userGroups.groups,
  loading: state.qualityReducer.loading,
  isLoading: state.dashboard.isLoading,
  qualityGroups: state.qualityReducer.group,
  userEmployees: state.valuatedUsersReducer.valuatedUsers,
});

class QualityGroupsChart extends Component {
  state = {
    selectedGroups: [],
    selected_forms: [],
    selectedUsers: [],
  };

  translate(intl) {
    chartCardBarTitleLabel = intl.formatMessage({
      id: 'quality_groups_chart.chart_card_bar_title',
      defaultMessage: 'Qualidade por Grupo',
    });
    chartCardBarDataTitleLabel = intl.formatMessage({
      id: 'quality_groups_chart.group',
      defaultMessage: 'Qualidade',
    });

    defineMessages({
      chartCardBarTitleLabel: {
        id: 'quality_groups_chart.chart_card_bar_title',
        defaultMessage: 'Qualidade por Grupo',
      },
      chartCardBarDataTitleLabel: {
        id: 'quality_groups_chart.group',
        defaultMessage: 'Qualidade',
      },
    });
  }

  componentDidMount() {
    this.fetchData(null);
  }

  componentDidUpdate = prevProps => {
    const {
      groups, forms, userGroups, user, date,
    } = this.props;
    const propsHaveChanged = groups !== prevProps.groups
      || forms !== prevProps.forms
      || userGroups !== prevProps.userGroups
      || user !== prevProps.user
      || date.startDate !== prevProps.date.startDate
      || date.endDate !== prevProps.date.endDate;
    if (propsHaveChanged) {
      const isDataReady = groups
        && groups.userGroups
        && forms.length
        && userGroups.length
        && user
        && user.id;
      if (isDataReady) {
        this.fetchData(null);
      }
    }
  };

  selectUserGroupAndImmediateChildren = () => {
    const { user, userGroups } = this.props;
    const loggedUserGroupId = user.company_group_id;
    const initialSelectedGroups = userGroups.filter(
      group => group.id === loggedUserGroupId || group.parent_id === loggedUserGroupId
    );
    return initialSelectedGroups.map(group => group.id);
  };

  fetchData = selecteds => {
    const { handleFetchQualityByGroups, dashboardDataRequest, userGroups } = this.props;
    if (!userGroups.length) {
      dashboardDataRequest();
    }
    const defaultGroups = this.selectUserGroupAndImmediateChildren();
    const groups = selecteds && selecteds.groups ? selecteds.groups : defaultGroups;
    const forms = selecteds && selecteds.forms ? selecteds.forms : this.props.formsIds;
    const users = selecteds && selecteds.users ? selecteds.users : [];
    this.setState({
      selectedGroups: groups,
      selected_forms: forms,
      selectedUsers: users,
    });
    handleFetchQualityByGroups(this.buildBody(groups, forms, users));
  };

  buildBody = (groups, forms, users) => ({
    data: {
      start_date: this.props.date.startDate,
      end_date: this.props.date.endDate,
      action_plan: this.props.company.has_action_plan,
      groups: groups || this.props.groups.userGroups.ids,
      forms: forms || this.props.formsIds,
      users,
    },
  });

  getSelectedGroupsLabels = () => {
    let labels = [];
    if (this.state.selectedGroups && this.state.selectedGroups.length > 0) {
      labels = this.state.selectedGroups.map(
        id => this.props.userGroups.find(group => group.id === +id).name
      );
    }
    return labels;
  };

  getSelectedUsersLabels = () => {
    const { selectedUsers } = this.state;
    const { userEmployees } = this.props;
    return selectedUsers.map(
      id => userEmployees.find(employee => employee.id === +id).name
    );
  };

  getSelectedFormsLabels() {
    const labels = [];
    if (this.state.selected_forms && this.state.selected_forms.length > 0) {
      this.state.selected_forms.forEach(id => {
        for (const index in this.props.formsIds) {
          if (this.props.formsIds[index] === +id) {
            labels.push(this.props.formsLabels[index]);
          }
        }
      });
    }
    return labels;
  }

  render() {
    const {
      intl,
      qualityGroups,
      loading,
      isLoading,
      forms,
      userGroups,
      company,
      userEmployees,
    } = this.props;
    this.translate(intl);
    return (
      <>
        <ChartCardBar
          filterIcon={<FilterIcon color="primary" />}
          selectedTab={tabs.GROUP}
          onFilter={this.fetchData.bind(this)}
          title={chartCardBarTitleLabel}
          labels={qualityGroups.labels}
          sublabels={qualityGroups.subLabels}
          data={[
            {
              title: chartCardBarDataTitleLabel,
              values: qualityGroups.values,
              color: 'primary',
            },
          ]}
          subtitles={{
            subtitleLimit: 3,
            allFormsLength: forms.length,
            allGroupsLength: userGroups.length,
            filteredGroupsLabels: this.getSelectedGroupsLabels(),
            filteredFormsLabels: this.getSelectedFormsLabels(),
          }}
          includeTraining={false}
          lower={company.min_adherence}
          upper={company.max_adherence}
          enabledTabs={[FilterTabs.GROUP, FilterTabs.FORM]}
          loading={loading || isLoading}
        />
      </>
    );
  }
}

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(QualityGroupsChart)
);
