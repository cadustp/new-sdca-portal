class ChartDatasetRadar {
  constructor(upper, lower) {
    this.upper = upper;
    this.lower = lower;
    this.labels = [];
    this.datasets = [];

    this.colors = {
      gray: { background: 'rgba(168, 178, 185, 0.15)', border: '#a8b2b9' },
    };
  }

  SetLabels(labels) {
    this.labels.push(...labels);
  }

  SetData(label, data, color) {
    const radarColor = this.colors[color].background;
    const colors = [];
    data.forEach((value) => {
      if (value <= this.lower) return colors.push('rgba(200, 109, 97, 1)');
      if (value <= this.upper) return colors.push('rgba(236, 193, 95, 1)');
      return colors.push('rgba(82, 173, 140, 1)');
    });

    const dataset = {
      data,
      backgroundColor: radarColor,
      hoverBackgroundColor: radarColor,
      hoverBorderColor: 'rgba(255,99,132,1)',
      borderColor: this.colors[color].border,
      borderWidth: 1,
      pointBackgroundColor: colors,
      pointBorderColor: 'rgba(0, 0, 0, 0)',
      pointRadius: 4,
    };

    this.datasets.push(dataset);
  }
}

export default ChartDatasetRadar;
