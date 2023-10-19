import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from '../../../helpers/withRouter';
import Grid from '@mui/material/Grid';
import { defineMessages, injectIntl } from 'react-intl';
import QualityRanking from '../../QualityRanking';
import DateFilter from '../../../components/shared/DateFilter/DateFilter';
import QualityGroupsChart from './QualityGroupsChart/QualityGroupsChart';
import QualityUnfolding from '../../QualityUnfolding';
import { setDatesFilter } from '../../../redux/app/filters/duck';
import RemindersMapCard from '../../../components/RemindersMapCard';
import { captureEvent } from '../../../analytics';

let titleLabel = '';
let subtitleLabel = '';

const mapStateToProps = state => ({
  startDate: state.filters.date.start,
  endDate: state.filters.date.end,
});

class QualityDashboard extends Component {
  translate(intl) {
    titleLabel = intl.formatMessage({
      id: 'quality_dashboard.title',
      defaultMessage: 'Qualidade',
    });
    subtitleLabel = intl.formatMessage({
      id: 'quality_dashboard.subtitle',
      defaultMessage: 'Dashboard',
    });

    defineMessages({
      titleLabel: {
        id: 'quality_dashboard.title',
        defaultMessage: 'Qualidade',
      },
      subtitleLabel: {
        id: 'quality_dashboard.subtitle',
        defaultMessage: 'Dashboard',
      },
    });
  }

  constructor(props) {
    super(props);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  handleDateChange(dateState) {
    captureEvent('setDatesQuality');
    const { dispatch } = this.props;
    dispatch(
      setDatesFilter({
        start: dateState.startDate,
        end: dateState.endDate,
      })
    );
  }

  render() {
    const { intl, startDate, endDate } = this.props;
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
                <DateFilter
                  onChange={this.handleDateChange}
                  startDate={startDate}
                  endDate={endDate}
                />
              </div>
            </Grid>
          </Grid>
        </div>
        <div>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={7}>
              <QualityGroupsChart
                date={{
                  startDate,
                  endDate,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <QualityRanking startDate={startDate} endDate={endDate} />
            </Grid>
            <Grid item xs={12}>
              <QualityUnfolding
                startDate={startDate}
                endDate={endDate}
              />
            </Grid>
            <Grid item xs={12} sm={12} />
          </Grid>
          <Grid item xs={12} sm={12}>
            <RemindersMapCard
              date={{
                startDate,
                endDate,
              }}
            />
          </Grid>
        </div>
      </div>
    );
  }
}

QualityDashboard.propTypes = {
  startDate: PropTypes.objectOf(PropTypes.object).isRequired,
  endDate: PropTypes.objectOf(PropTypes.object).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default injectIntl(
  withRouter(connect(mapStateToProps)(QualityDashboard))
);
