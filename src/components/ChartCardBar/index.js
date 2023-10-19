import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { defineMessages, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';

import Skeleton from 'react-loading-skeleton';
import NewFilter from '../shared/NewFilter/NewFilter';
import Charts from '../../models/chart/Charts';
import Subtitles from '../Subtitles/Subtitles';
import Subtitle from '../Subtitles/Subtitle/Subtitle';
import WithLoading from '../../hocs/withLoading';
import WithEmptyData from '../../hocs/withEmptyData';
import './styles.css';

let groupsLabel = '';
let formsLabel = '';
let usersLabel = '';

const BarWithLoading = WithLoading(WithEmptyData(Bar));

const defaultProps = {
  includeTraining: true,
  filterDisabled: false,
  showResultsWithZero: false,
  shouldApplyLogarithmic: true,
};

const propTypes = {
  intl: PropTypes.instanceOf(Object).isRequired,
  title: PropTypes.string.isRequired,
  subtitles: PropTypes.instanceOf(Object).isRequired,
  data: PropTypes.instanceOf(Array).isRequired,
  lower: PropTypes.number.isRequired,
  upper: PropTypes.number.isRequired,
  labels: PropTypes.instanceOf(Array).isRequired,
  sublabels: PropTypes.instanceOf(Array).isRequired,
  onFilter: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  activeTabs: PropTypes.instanceOf(Object).isRequired,
  selectedTab: PropTypes.string.isRequired,
  includeTraining: PropTypes.bool,
  filterDisabled: PropTypes.bool,
  showResultsWithZero: PropTypes.bool,
  shouldApplyLogarithmic: PropTypes.bool,
};

class ChartCardBar extends Component {

  configureStackedOptions = options => {
    const { shouldApplyLogarithmic } = this.props;
    const stakedOptions = options;
    stakedOptions.scales = {
      xAxes: [
        {
          gridLines: {
            display: false,
          },
          stacked: true,
        },
      ],
      yAxes: [
        {
          display: false,
          gridLines: {
            display: false,
          },
          stacked: true,
          afterSetDimensions: function(axis){
            if(axis.chart.realData === undefined){
              axis.chart.realData = Object.create(axis.chart.data)
            }
            
            axis.chart.data.datasets.map(function(dataSet,dataSetPosition) {
              dataSet.data = dataSet.data.map(function(dataSetValue, dataSetValueDataPosition){
                if (dataSetValue <= 0 || shouldApplyLogarithmic === false) return dataSetValue;

                if(dataSetValue && dataSetValue > 0 && dataSetValue <= 1){
                  return 0.15;
                };
                return Math.log10(dataSetValue).toFixed(5);
              })
            })
          }
        }, 
      ]
    };
    stakedOptions.legend = {
      display: true,
      position: 'bottom',
    };
    stakedOptions.plugins = {
      datalabels: {
        display: false,
      },
    };
    stakedOptions.tooltips.callbacks = {
      title(tooltipItem, data) {
        const label = data.labels[tooltipItem[0].index];
        if (label) {
          return label;
        }
        return '';
      },
      label(tooltipItem, data) {
        const { datasetIndex, index } = tooltipItem;
        const yLabel = this._chart.realData.datasets[datasetIndex].data[index]
        const dstLabel = data.datasets[datasetIndex].label;
        return `${dstLabel}: ${yLabel}`;
      },
    };
    return stakedOptions;
  };

  configureBarOptions = options => {
    const barOptions = options;
    barOptions.legend = {
      display: false,
      position: 'top',
      reverse: true,
      labels: {
        fontSize: 12,
        fontStyle: 'normal',
        fontColor: '#333333',
        padding: 10,
        usePointStyle: true,
      },
    };

    barOptions.scales = {
      xAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            beginAtZero: true,
            maxTicksLimit: 100,
            callback(value) {
              if (value.length > 80) {
                return `${value.substring(0, 80)}...`;
              }
              return value;
            },
          },
        },
      ],
      yAxes: [
        {
          display: false,
          gridLines: {
            display: false,
          },
          ticks: {
            beginAtZero: true,
            maxTicksLimit: 100,
            callback(value) {
              return `${value} %`;
            },
          },
        },
      ],
    };

    barOptions.plugins = {
      datalabels: {
        anchor: 'end',
        align: 'end',
        offset: '10',
        fontSize: '13px',
        formatter(value) {
          return `${value} %`;
        },
      },
    };
    return barOptions;
  };

  configureOptions = data => {
    const options = new Charts.ChartOptions();
    if (typeof data === 'undefined') return options;
    options.tooltips = {
      enabled: true,
      intersect: true,
      position: 'nearest',
      backgroundColor: '#454444',
      titleFontSize: 12,
      titleFontStyle: 'normal',
      titleFontColor: '#FFFFFF',
      titleMarginBottom: 6,
      bodyFontSize: 12,
      bodyFontStyle: 'bold',
      bodyFontColor: '#FFFFFF',
      bodySpacing: 2,
      xPadding: 9,
      yPadding: 9,
      cornerRadius: 4,
      displayColors: false,
      borderWidth: 0,
      mode: 'index',
      callbacks: {
        title(tooltipItem, chartData) {
          const label = chartData.labels[tooltipItem[0].index];
          if (label) {
            return label;
          }
          return '';
        },
        label(tooltipItem, chartData) {
          const { datasetIndex, yLabel } = tooltipItem;
          const dstLabel = chartData.datasets[datasetIndex].label;
          return `${dstLabel}: ${yLabel}%`;
        },
      },
    };
    return data.length > 1
      ? this.configureStackedOptions(options)
      : this.configureBarOptions(options);
  };

  getDataSet = canvas => {
    const { data, lower, upper, labels, sublabels } = this.props;
    const dataset = new Charts.ChartDataset();
    dataset.SetLabels(labels, sublabels);
    const stacked = data.length > 1;
    data.forEach(item => {
      const values = item.values ? item.values : [];
      dataset.SetData(
        item.title,
        values,
        item.color,
        canvas.getContext('2d'),
        lower,
        upper,
        stacked,
      );
    });
    return dataset;
  };

  verifyEmptyData = data => {
    const { showResultsWithZero } = this.props;
    const resultsWithZero = property =>
      showResultsWithZero ? property >= 0 : property > 0;
    let valuesIsEmpty = true;
    data.forEach(item => {
      valuesIsEmpty =
        typeof item.values.find(x => resultsWithZero(x)) === 'undefined' &&
        valuesIsEmpty;
    });
    return valuesIsEmpty;
  };

  translate = intl => {
    groupsLabel = intl.formatMessage({
      id: 'chart_card_bar.groups',
      defaultMessage: 'Grupos',
    });
    formsLabel = intl.formatMessage({
      id: 'chart_card_bar.forms',
      defaultMessage: 'Formulários',
    });
    usersLabel = intl.formatMessage({
      id: 'reports.evaluated_label',
      defaultMessage: 'Avaliados',
    });

    defineMessages({
      groupsLabel: {
        id: 'chart_card_bar.groups',
        defaultMessage: 'Grupos',
      },
      formsLabel: {
        id: 'chart_card_bar.forms',
        defaultMessage: 'Formulários',
      },
      usersLabel: {
        id: 'reports.evaluated_label',
        defaultMessage: 'Formulários',
      },
    });
  };

  renderSubtitles = subtitles => {
    if (!subtitles) return null;
    const {
      filteredGroupsLabels,
      subtitleLimit,
      allFormsLength,
      allGroupsLength,
      filteredFormsLabels,
      filteredUsersLabels,
      allUsersLength,
    } = subtitles;
    return (
      <Subtitles>
        <Subtitle
          label={groupsLabel}
          values={filteredGroupsLabels}
          limit={subtitleLimit}
          total={allGroupsLength}
        />
        <Subtitle
          label={formsLabel}
          values={filteredFormsLabels}
          limit={subtitleLimit}
          total={allFormsLength}
        />
        {filteredUsersLabels && filteredUsersLabels.length ? (
          <Subtitle
            label={usersLabel}
            values={filteredUsersLabels}
            limit={subtitleLimit}
            total={allUsersLength}
          />
        ) : null}
      </Subtitles>
    );
  };

  render() {
    const {
      intl,
      title,
      subtitles,
      loading,
      data,
      onFilter,
      selectedTab,
      enabledTabs,
      filterIcon,
      includeTraining,
      filterDisabled,
      customMessage,
    } = this.props;
    this.translate(intl);
    return (
      <div className="chart-card">
        <div className="title">
          {loading ? <Skeleton width={240} height={26} /> : <p>{title}</p>}
          {loading ? (
            <Skeleton width={16} height={16} />
          ) : (
            <div className="options">
              {!filterDisabled ? (
                <NewFilter
                  filterIcon={filterIcon}
                  selectedTab={selectedTab}
                  callBack={onFilter}
                  enabledTabs={enabledTabs}
                  includeTraining={includeTraining}
                />
              ) : null}
            </div>
          )}
        </div>
        {loading ? (
          <div className="title">
            <Skeleton width={480} />
          </div>
        ) : (
          <div>{this.renderSubtitles(subtitles)}</div>
        )}
        <div className="chart">
          {loading ? (
            <Skeleton width={622} height={310} />
          ) : (
            <BarWithLoading
              customMessage={customMessage}
              isEmpty={this.verifyEmptyData(data)}
              isLoading={loading}
              height={400}
              data={this.getDataSet}
              options={this.configureOptions(data)}
              plugins={[ChartDataLabels]}
            />
          )}
        </div>
      </div>
    );
  }
}

ChartCardBar.defaultProps = defaultProps;

ChartCardBar.propTypes = propTypes;

export default injectIntl(ChartCardBar);
