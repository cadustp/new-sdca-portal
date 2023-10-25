import { Chart } from 'chart.js';
import React, { Component } from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import ChartCardBar from '../../../../components/ChartCardBar';
import FilterIcon from '../../../../components/shared/Icons/FilterIcon';
import { tabs } from '../../../../components/shared/NewFilter/FilterDialog/FilterDialog';
import { fetchStatusByGroups } from '../../../../redux/actions/status-actions';
import { FilterTabs } from '../../../../helpers/consts';

let accomplishedLabel = '';
let lateLabel = '';
let pendingLabel = '';
let chartCardBarTitleLabel = '';

const mapDispatchToProps = dispatch => ({
  handleFetchStatusByGroups: body => dispatch(fetchStatusByGroups({ body })),
});

const mapStateToProps = state => ({
  user: state.login.information,
  company: state.companyReducer.company,
  formsIds: state.formReducer.ids,
  formsLabels: state.formReducer.labels,
  forms: state.formReducer.forms,
  groups: state.groupReducer.data.userGroups,
  userGroups: state.groupReducer.data.userGroups.groups,
  loading: state.statusReducer.loading,
  isLoading: state.dashboard.isLoading,
  graph: state.statusReducer.graph,
});

class StatusGroupsChart extends Component {
  state = {
    selectedGroups: [],
    selected_forms: [],
  };

  translate(intl) {
    accomplishedLabel = intl.formatMessage({
      id: 'status_groups_chart.accomplished',
      defaultMessage: 'Concluído',
    });
    lateLabel = intl.formatMessage({
      id: 'status_groups_chart.late',
      defaultMessage: 'Atrasado',
    });
    pendingLabel = intl.formatMessage({
      id: 'status_groups_chart.pending',
      defaultMessage: 'Previsto',
    });
    chartCardBarTitleLabel = intl.formatMessage({
      id: 'status_groups_chart.chart_card_bar_title',
      defaultMessage: 'Status por grupo',
    });

    defineMessages({
      accomplishedLabel: {
        id: 'status_groups_chart.accomplished',
        defaultMessage: 'Concluído',
      },
      lateLabel: { id: 'status_groups_chart.late', defaultMessage: 'Atrasado' },
      pendingLabel: {
        id: 'status_groups_chart.pending',
        defaultMessage: 'Previsto',
      },
      chartCardBarTitleLabel: {
        id: 'status_groups_chart.chart_card_bar_title',
        defaultMessage: 'Status por grupo',
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
    if (
      groups !== prevProps.groups
      || forms !== prevProps.forms
      || userGroups !== prevProps.userGroups
      || user !== prevProps.user
      || date.startDate !== prevProps.date.startDate
      || date.endDate !== prevProps.date.endDate
    ) {
      if (
        groups
        && groups.ids
        && forms.length
        && userGroups.length
        && user
        && user.id
      ) {
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
    const { handleFetchStatusByGroups } = this.props;
    const defaultGroups = this.selectUserGroupAndImmediateChildren();
    const groups = selecteds && selecteds.groups ? selecteds.groups : defaultGroups;
    const forms = selecteds && selecteds.forms ? selecteds.forms : this.props.formsIds;
    this.setState({
      selectedGroups: groups,
      selected_forms: forms,
    });
    handleFetchStatusByGroups(this.buildBody(groups, forms));
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

  errorFetchCallback = error => {
    // exibe erro
  };

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
      intl, graph, loading, isLoading, forms, userGroups,
    } = this.props;
    this.translate(intl);
    // Chart.defaults.bar.scales.xAxes[0].ticks = {
    //   beginAtZero: true,
    //   maxTicksLimit: 100,
    //   callback(value, index, values) {
    //     if (value.length > 80) {
    //       return `${value.substring(0, 80)}...`;
    //     }
    //     return value;
    //   },
    // };
    return (
      <>
        {/* <ChartCardBar
          filterIcon={<FilterIcon color="primary" />}
          selectedTab={tabs.GROUP}
          onFilter={this.fetchData.bind(this)}
          title={chartCardBarTitleLabel}
          labels={graph.labels}
          sublabels={graph.subLabels}
          data={[
            {
              title: accomplishedLabel,
              values: graph.values.accomplished,
              color: 'green',
            },
            {
              title: lateLabel,
              values: graph.values.late,
              color: 'red',
            },
            {
              title: pendingLabel,
              values: graph.values.pending,
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
          enabledTabs={[FilterTabs.GROUP, FilterTabs.FORM]}
          loading={loading || isLoading}
          shouldApplyLogarithmic={false}
        /> */}
      </>
    );
  }
}

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(StatusGroupsChart)
);
