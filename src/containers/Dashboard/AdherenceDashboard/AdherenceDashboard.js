import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from '../../helpers/withRouter';
import Grid from '@mui/material/Grid';
import { defineMessages, injectIntl } from 'react-intl';
import moment from '../../../timezones/moment';
import DateFilter from '../../../components/shared/DateFilter/DateFilter';
import ChartCardBar from '../../../components/ChartCardBar';
import { FilterTabs } from '../../../helpers/consts';

let titleLabel = '';
let subtitleLabel = '';
let chartCardBarTitleLabel = '';

const mapStateToProps = state => ({
  user: state.login.information,
  adherence: state.adherenceReducer.data,
});

class AdherenceDashboard extends Component {
  translate(intl) {
    titleLabel = intl.formatMessage({
      id: 'adherence_dashboard.adherence',
      defaultMessage: 'Aderência',
    });
    subtitleLabel = intl.formatMessage({
      id: 'adherence_dashboard.dashboard',
      defaultMessage: 'Dashboard',
    });
    chartCardBarTitleLabel = intl.formatMessage({
      id: 'adherence_dashboard.chart_card_bar_title',
      defaultMessage: 'Aderência por Grupo',
    });

    defineMessages({
      titleLabel: {
        id: 'adherence_dashboard.adherence',
        defaultMessage: 'Aderência',
      },
      subtitleLabel: {
        id: 'adherence_dashboard.dashboard',
        defaultMessage: 'Dashboard',
      },
      chartCardBarTitleLabel: {
        id: 'adherence_dashboard.chart_card_bar_title',
        defaultMessage: 'Aderência por Grupo',
      },
    });
  }

  constructor(props) {
    super(props);

    this.state = {
      startDate: moment()
        .locale('pt-br')
        .subtract(30, 'days'),
      endDate: moment().locale('pt-br'),
    };

    this.handleDateChange = this.handleDateChange.bind(this);
  }

  handleDateChange(dateState) {
    this.setState({
      startDate: dateState.startDate,
      endDate: dateState.endDate,
    });
  }

  render() {
    const { intl } = this.props;

    this.translate(intl);
    return (
      <div className="dashboard-content">
        <div className="header-title">
          <Grid container spacing={24}>
            <Grid item xs={12} sm={8}>
              <p className="dash-title">{titleLabel}</p>
              <span className="dash-subtitle">{subtitleLabel}</span>
            </Grid>
            <Grid item xs={12} sm={4}>
              <div className="date-filter">
                <DateFilter onChange={this.handleDateChange} />
              </div>
            </Grid>
          </Grid>
        </div>
        <div>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={12}>
              <ChartCardBar
                className="card"
                title={chartCardBarTitleLabel}
                data={this.props.adherence.group}
                barKey="groups"
                type="ADHERENCE"
                date={{
                  startDate: this.state.startDate,
                  endDate: this.state.endDate,
                }}
                enabledTabs={[
                  FilterTabs.FORM,
                  FilterTabs.GROUP,
                  FilterTabs.WORKER,
                  FilterTabs.ROLE,
                ]}
              />
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default injectIntl(
  withRouter(connect(mapStateToProps)(AdherenceDashboard))
);
