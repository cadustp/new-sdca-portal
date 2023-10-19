import React, { Component } from 'react';
import { connect } from 'react-redux';
import { defineMessages, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import NewFilter from '../../components/shared/NewFilter/NewFilter';
import './styles.css';
import Subtitle from '../../components/Subtitles/Subtitle/Subtitle';
import Subtitles from '../../components/Subtitles/Subtitles';
import RankedList from '../../components/RankedList';
import WithLoading from '../../hocs/withLoading';
import WithEmptyData from '../../hocs/withEmptyData';
import FilterIcon from '../../components/shared/Icons/FilterIcon';
import { tabs } from '../../components/shared/NewFilter/FilterDialog/FilterDialog';
import { fetchQualityGroupsRankings } from '../../redux/actions/quality-actions';
import { FilterTabs } from '../../helpers/consts';

let formsLabel = '';
let rankCardTitleLabel = '';

const mapDispatchToProps = dispatch => ({
  handleFetchQualityByGroups: body => dispatch(fetchQualityGroupsRankings({ body })),
});

const mapStateToProps = state => ({
  user: state.login.information,
  forms: state.formReducer.notTraining,
  userGroups: state.groupReducer.data.userGroups.groups,
  loading: state.qualityReducer.rankings.loading,
  isLoading: state.dashboard.isLoading,
  rankings: state.qualityReducer.rankings.groups,
});

const RankedListLoading = WithLoading(WithEmptyData(RankedList));

class QualityRanking extends Component {
  state = {
    selectedGroups: [],
    selectedForms: [],
  };

  translate = intl => {
    formsLabel = intl.formatMessage({
      id: 'quality_ranking.forms',
      defaultMessage: 'Formulários',
    });
    rankCardTitleLabel = intl.formatMessage({
      id: 'quality_ranking.ranking_card_title',
      defaultMessage: 'Ranking por Qualidade',
    });

    defineMessages({
      formsLabel: {
        id: 'quality_ranking.forms',
        defaultMessage: 'Formulários',
      },
      rankCardTitleLabel: {
        id: 'quality_ranking.ranking_card_title',
        defaultMessage: 'Ranking por Qualidade',
      },
    });
  };

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate = prevProps => {
    const {
      forms, userGroups, user, startDate, endDate,
    } = this.props;
    const { selectedGroups, selectedForms } = this.state;
    const propsHaveChanged = forms !== prevProps.forms
      || userGroups !== prevProps.userGroups
      || user !== prevProps.user
      || startDate !== prevProps.startDate
      || endDate !== prevProps.endDate;
    if (propsHaveChanged) {
      const isDataReady = forms && forms.forms.length && userGroups.length && user && user.id;
      if (isDataReady) {
        this.fetchData(selectedGroups, selectedForms);
      }
    }
  };

  buildBody = (filteredGroups, filteredForms) => {
    const {
      userGroups, forms, startDate, endDate,
    } = this.props;
    const selectedGroups = filteredGroups && filteredGroups.length > 0
      ? filteredGroups
      : userGroups.map(group => group.id);
    const selectedForms = filteredForms && filteredForms.length > 0 ? filteredForms : forms.ids;
    return {
      data: {
        start_date: startDate,
        end_date: endDate,
        groups: this.removeLoggedUserGroup(selectedGroups),
        forms: selectedForms,
        users: [],
      },
    };
  };

  fetchData = (groups, forms) => {
    const { handleFetchQualityByGroups } = this.props;
    handleFetchQualityByGroups(this.buildBody(groups, forms));
  };

  applyFilter = selecteds => {
    this.fetchData(
      this.removeLoggedUserGroup(selecteds.groups),
      selecteds.forms
    );
    this.setState({
      selectedGroups: selecteds.groups,
      selectedForms: selecteds.forms,
    });
  };

  getSelectedFormLabel = formIds => {
    const { forms } = this.props;
    if (formIds.length !== 1) return forms.labels;
    const index = forms.ids.indexOf(parseInt(formIds[0], 10));
    return [forms.labels[index]];
  };

  removeLoggedUserGroup = groupsIds => {
    const { user } = this.props;
    return groupsIds.filter(item => item !== user.company_group_id);
  };

  verifyEmptyData = (data = []) => {
    let valuesIsEmpty = true;
    data.forEach(item => {
      valuesIsEmpty = item.avaliations === 0 && valuesIsEmpty;
    });
    return valuesIsEmpty;
  };

  render() {
    const {
      intl, forms, loading, isLoading, rankings,
    } = this.props;
    const { selectedForms } = this.state;
    this.translate(intl);

    return (
      <>
        <div className="rank-card">
          <div className="title">
            {loading || isLoading ? (
              <Skeleton width={280} height={26} />
            ) : (
              <>
                <div>
                  <img
                    src={require('../../assets/icons/icon_ranking.svg')}
                    style={{ marginRight: '10px' }}
                    alt="ranking icon"
                  />
                </div>

                <div style={{ width: '90%' }}>
                  <p>{rankCardTitleLabel}</p>
                </div>
              </>
            )}
            {loading || isLoading ? (
              <Skeleton width={16} height={16} />
            ) : (
              <NewFilter
                callBack={this.applyFilter}
                filterIcon={<FilterIcon color="primary" />}
                selectedTab={tabs.FORM}
                includeTraining={false}
                isFormTabRadioButton
                enabledTabs={[FilterTabs.FORM]}
                isFormRadioButton
              />
            )}
          </div>
          {loading || isLoading ? (
            <Skeleton width={120} />
          ) : (
            <Subtitles>
              <Subtitle
                label={formsLabel}
                limit={3}
                total={forms.labels.length}
                values={this.getSelectedFormLabel(selectedForms)}
              />
            </Subtitles>
          )}
          {loading || isLoading ? (
            <Skeleton width={416} height={308} />
          ) : (
            <div className="rank-card-content">
              <RankedListLoading
                isEmpty={this.verifyEmptyData(rankings)}
                isLoading={loading || isLoading}
                groups={rankings}
              />
            </div>
          )}
        </div>
      </>
    );
  }
}

QualityRanking.propTypes = {
  intl: PropTypes.instanceOf(Object).isRequired,
  forms: PropTypes.instanceOf(Array).isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
  userGroups: PropTypes.instanceOf(Array).isRequired,
  dispatch: PropTypes.func.isRequired,
  startDate: PropTypes.instanceOf(Date).isRequired,
  endDate: PropTypes.instanceOf(Date).isRequired,
};

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(QualityRanking)
);
