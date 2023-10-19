class ChartOptions {
  constructor() {
    this.maintainAspectRatio = false;
    this.datalabelsDisplay = false;
    this.legend = false;
    this.onClick = () => {};
    this.scales = null;
    this.setLayout();
  }

  setLayout() {
    this.layout = {
      padding: {
        left: 0,
        right: 0,
        top: 30,
        bottom: 0,
      },
    };
  }

  Stacked() {
    this.scales = {
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
        },
      ],
    };
    return this;
  }

  SetOnClickAction(action) {
    this.onClick = action;
  }
}

export default ChartOptions;
