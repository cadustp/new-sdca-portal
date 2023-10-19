import React, { Component } from 'react';
import { Radar } from 'react-chartjs-2';
import Charts from '../../models/chart/Charts';
import './styles.css';

class ChartCardRadar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: new Charts.ChartOptions(),
    };
  }

  getDataSet = () => {
    const { data, lower, upper } = this.props;
    this.configureOptions();
    const dataset = new Charts.ChartDatasetRadar(upper, lower);
    dataset.SetLabels(
      data.map(item => `${Math.round(item.score)}%;${item.name}`),
    );
    dataset.SetData(
      'Qualidade',
      data.map(item => Math.round(item.score)),
      'gray',
    );
    return dataset;
  };

  formatStringSize = (myString, max) => {
    let trimmedString = myString;
    if (myString.length > max) trimmedString = `${myString.substring(0, max)}...`;
    return trimmedString;
  };

  configureOptions = () => {
    const { options } = this.state;
    options.plugins = {
      datalabels: {
        display: false,
      },
    };
    options.legend = { display: false };
    options.tooltips = {
      enabled: true,
      mode: 'index',
      intersect: true,
      position: 'nearest',
      backgroundColor: '#454444',
      bodyMarginTop: 6,
      bodyFontSize: 12,
      bodyFontStyle: 'bold',
      bodyFontColor: '#FFFFFF',
      bodySpacing: 2,
      xPadding: 9,
      yPadding: 9,
      cornerRadius: 4,
      displayColors: false,
      borderWidth: 0,
      callbacks: {
        label(tooltipItem, data) {
          const label = data.labels[tooltipItem.index];
          if (label) {
            const labelArr = label.split(';');
            return labelArr[1];
          }
          return '';
        },
        title() {
          return '';
        },
      },
    };
    options.scale = {
      ticks: {
        display: false,
        beginAtZero: true,
        max: 100,
      },
      pointLabels: {
        fontSize: 11,
        callback: (label) => {
          if (label) {
            const labelArr = label.split(';');
            return [labelArr[0], this.formatStringSize(labelArr[1], 100)];
          }
          return null;
        },
      },
    };
  };

  render() {
    const { options } = this.state;
    return (
      <div className="chart">
        <Radar
          width={600}
          height={400}
          data={this.getDataSet}
          options={options}
        />
      </div>
    );
  }
}

export default ChartCardRadar;
