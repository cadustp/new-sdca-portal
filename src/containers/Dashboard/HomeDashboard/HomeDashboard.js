import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import React, { useEffect, useMemo } from 'react';
import { captureEvent } from '../../../analytics';
import DateFilter from '../../../components/shared/DateFilter/DateFilter';
import AdherenceGroupsChart from '../AdherenceDashboard/AdherenceGroupsChart/AdherenceGroupsChart';
import StatusGroupsChart from '../StatusDashboard/StatusGroupsChart/StatusGroupsChart';
import HomeCards from './HomeCards/HomeCards';

function HomeDashboard({
  user,
  status,
  formsIds,
  groups,
  adherence,
  quality,
  startDate,
  endDate,
  qualityByGroups,
  setDates,
  intl,
  loading,
  isLoading,
  selectedForms,
  selectedEmployees,
  selectedGroups,
  dashboardDataRequest,
}) {
  const translate = intl => intl.formatMessage({
    id: 'home_dashboard.title',
    defaultMessage: 'Dashboard',
  });
  const titleLabel = useMemo(() => translate(intl), []);

  const handleData = () => {
    const body = {
      data: {
        start_date: startDate,
        end_date: endDate,
        ...{
          groups: [user.company_group_id],
          forms: formsIds,
          users: [],
        },
      },
    };
    qualityByGroups(body);
  };

  useEffect(() => {
    const isInformationReady = Boolean(
      Object.entries(groups.userGroups.groups).length
    );
    if (isInformationReady) {
      handleData();
    } else {
      dashboardDataRequest();
    }
  }, [
    groups,
    formsIds,
    user,
  ]);

  useEffect(() => {
    const isDataReady = Boolean(
      Object.entries(selectedGroups).length
        && Object.entries(selectedForms).length
        && Object.entries(selectedEmployees).length
    );
    if (isDataReady) {
      handleData();
    }
  }, [selectedGroups, selectedForms, selectedEmployees]);

  const handleDateChange = dateState => {
    captureEvent('setDatesAdherence');
    setDates({
      start: dateState.startDate,
      end: dateState.endDate,
    });
    handleData();
  };

  return (
    <div className="dashboard-content">
      <div className="header-title">
        <Grid container spacing={24}>
          <Grid item xs={12} sm={8}>
            <p className="dash-title">{titleLabel}</p>
          </Grid>
          <Grid item xs={12} sm={4}>
            <div className="date-filter">
              <DateFilter
                onChange={handleDateChange}
                startDate={startDate}
                endDate={endDate}
              />
            </div>
          </Grid>
        </Grid>
      </div>
      <div>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={12}>
            <HomeCards
              loading={loading || isLoading}
              quality={quality}
              adherence={adherence}
              status={status}
              user={user}
            />
          </Grid>
          <Box mt={5} width="100%">
            <Grid item xs={12} sm={12}>
              <AdherenceGroupsChart
                date={{
                  startDate,
                  endDate,
                }}
              />
            </Grid>
          </Box>

          <Box mt={5} width="100%">
            <Grid item xs={12} sm={12}>
              <StatusGroupsChart
                date={{
                  startDate,
                  endDate,
                }}
              />
            </Grid>
          </Box>
        </Grid>
      </div>
    </div>
  );
}
HomeDashboard.propTypes = {
  startDate: PropTypes.objectOf(PropTypes.object).isRequired,
  endDate: PropTypes.objectOf(PropTypes.object).isRequired,
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
    company_group_id: PropTypes.number.isRequired,
  }).isRequired,
  qualityByGroups: PropTypes.func.isRequired,
  adherenceByGroups: PropTypes.func.isRequired,
  statusByGroups: PropTypes.func.isRequired,
  setDates: PropTypes.func.isRequired,
  dashboardDataRequest: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
export default HomeDashboard;
