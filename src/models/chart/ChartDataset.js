class ChartDataset {
  constructor() {
    this.labels = [];
    this.datasets = [];

    this.colors = {
      primary: { start: '#5294c2', end: '#81c0ea', border: '#ffffff' },
      red: { start: '#D9857A', end: '#C86D61', border: '#ffffff' },
      green: { start: '#79BAA2', end: '#52AD8C', border: '#ffffff' },
      yellow: { start: '#F5DFAD', end: '#E1AF3F', border: '#ffffff' },
    };
  }

  breakLabel(label, maxLength) {
    if (label && label.length > maxLength) {
      return `${label.substring(0, maxLength)}...`;
    }
    return label;
  }

  SetLabels(labels) {
    if (labels) {
      this.labels.push(...labels);
    }
  }

  SetData(label, data, color, ctx, lower, upper, stacked) {
    const gradient = ctx.createLinearGradient(0, 150, 0, 0);
    gradient.addColorStop(0, this.colors[color].start);
    gradient.addColorStop(1, this.colors[color].end);
    let backgroundColors;

    if (!stacked) {
      backgroundColors = [];
      for (const value of data) {
        const stackedGradient = ctx.createLinearGradient(0, 150, 0, 0);
        let currentColor;
        if (value >= upper) currentColor = 'green';
        else if (value > lower) currentColor = 'yellow';
        else currentColor = 'red';
        stackedGradient.addColorStop(0, this.colors[currentColor].start);
        stackedGradient.addColorStop(1, this.colors[currentColor].end);
        backgroundColors.push(stackedGradient);
      }
    } else {
      gradient.addColorStop(0, this.colors[color].start);
      gradient.addColorStop(1, this.colors[color].end);
      backgroundColors = gradient;
    }

    const dataset = {
      label,
      data,
      backgroundColor: backgroundColors,
      hoverBackgroundColor: backgroundColors,
      hoverBorderColor: 'rgba(255,99,132,1)',
      borderColor: this.colors[color].border,
      borderWidth: 0,
    };

    this.datasets.push(dataset);
  }
}

export default ChartDataset;
