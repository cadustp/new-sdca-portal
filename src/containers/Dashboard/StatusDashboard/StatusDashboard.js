import React, { Component } from 'react';
import { withRouter } from '../../helpers/withRouter';
import Grid from '@mui/material/Grid';
import { defineMessages, injectIntl } from 'react-intl';
import moment from '../../../timezones/moment';
import DateFilter from '../../../components/shared/DateFilter/DateFilter';
import StatusGroupsChart from './StatusDashboard';

let titleLabel = '';
let subtitleLabel = '';

class StatusDashboard extends Component {
  translate(intl) {
    titleLabel = intl.formatMessage({
      id: 'status_dashboard.title',
      defaultMessage: 'Status',
    });
    subtitleLabel = intl.formatMessage({
      id: 'status_dashboard.subtitle',
      defaultMessage: 'Dashboard',
    });

    defineMessages({
      titleLabel: { id: 'status_dashboard.title', defaultMessage: 'Status' },
      subtitleLabel: {
        id: 'status_dashboard.subtitle',
        defaultMessage: 'Dashboard',
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
              <StatusGroupsChart
                date={{
                  startDate: this.state.startDate,
                  endDate: this.state.endDate,
                }}
              />
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default injectIntl(withRouter(StatusDashboard));
