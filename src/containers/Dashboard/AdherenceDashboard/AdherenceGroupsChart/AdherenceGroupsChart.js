import React, { Component } from 'react';
import { connect } from 'react-redux';
import { defineMessages, injectIntl } from 'react-intl';
import ChartCardBar from '../../../../components/ChartCardBar';
import { tabs } from '../../../../components/shared/NewFilter/FilterDialog/FilterDialog';
import { fetchAdherenceByGroups } from '../../../../redux/actions/adherence-actions';
import FilterIcon from '../../../../components/shared/Icons/FilterIcon';
import { FilterTabs } from '../../../../helpers/consts';
import { getItemIds } from '../../../../helpers/utils';

let chartCardBarTitleLabel = '';
let chartCardBarDataTitleLabel = '';

const mapDispatchToProps = dispatch => ({
  handleFetchAdherenceByGroups: body => dispatch(fetchAdherenceByGroups({ body })),
});

const mapStateToProps = state => ({
  user: state.login.information,
  company: state.companyReducer.company,
  formsIds: state.formReducer.ids,
  formsLabels: state.formReducer.labels,
  forms: state.formReducer.forms,
  groups: state.groupReducer.data.userGroups,
  userGroups: state.groupReducer.data.userGroups.groups,
  loading: state.adherenceReducer.loading,
  isLoading: state.dashboard.isLoading,
  graph: state.adherenceReducer.graph,
  selectedGroups: state.filters.data.groups,
  selectedForms: state.filters.data.forms,
  selectedEmployees: state.filters.data.employees,
});

class AdherenceGroupsChart extends Component {
  state = {
    selectedGroups: [],
    selected_forms: [],
  };

  translate(intl) {
    chartCardBarTitleLabel = intl.formatMessage({
      id: 'adherence_groups_chart.chart_card_bar_title',
      defaultMessage: 'Aderência por grupo',
    });
    chartCardBarDataTitleLabel = intl.formatMessage({
      id: 'adherence_groups_chart.chart_card_bar_data_title',
      defaultMessage: 'Aderência',
    });

    defineMessages({
      chartCardBarTitleLabel: {
        id: 'adherence_groups_chart.chart_card_bar_title',
        defaultMessage: 'Aderência por grupo',
      },
      chartCardBarDataTitleLabel: {
        id: 'adherence_groups_chart.chart_card_bar_data_title',
        defaultMessage: 'Aderência',
      },
    });
  }

  componentDidMount() {
    this.fetchData(null);
  }

  componentDidUpdate = prevProps => {
    const {
      groups,
      forms,
      userGroups,
      user,
      date,
      selectedGroups,
    } = this.props;
    const propsHaveChanged = groups !== prevProps.groups
      || forms !== prevProps.forms
      || userGroups !== prevProps.userGroups
      || user !== prevProps.user
      || date.startDate !== prevProps.date.startDate
      || date.endDate !== prevProps.date.endDate;
    if (propsHaveChanged) {
      const isDataReady = groups
        && groups.ids
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
    const { handleFetchAdherenceByGroups } = this.props;
    const defaultGroups = this.selectUserGroupAndImmediateChildren();
    const groups = selecteds && selecteds.groups ? selecteds.groups : defaultGroups;
    const forms = selecteds && selecteds.forms ? selecteds.forms : this.props.formsIds;
    this.setState({
      selectedGroups: groups,
      selected_forms: forms,
    });
    handleFetchAdherenceByGroups(this.buildBody(groups, forms));
  };

  buildBody = (groups, forms) => ({
    data: {
      start_date: this.props.date.startDate,
      end_date: this.props.date.endDate,
      action_plan: this.props.company.has_action_plan,
      groups,
      forms,
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
      intl, graph, loading, isLoading, forms, userGroups, company,
    } = this.props;
    this.translate(intl);
    return (
      <>
        <ChartCardBar
          filterIcon={<FilterIcon color="primary" />}
          selectedTab={tabs.GROUP}
          onFilter={this.fetchData.bind(this)}
          title={chartCardBarTitleLabel}
          labels={graph.labels}
          sublabels={graph.subLabels}
          data={[
            {
              title: chartCardBarDataTitleLabel,
              values: graph.values,
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
  connect(mapStateToProps, mapDispatchToProps)(AdherenceGroupsChart)
);
