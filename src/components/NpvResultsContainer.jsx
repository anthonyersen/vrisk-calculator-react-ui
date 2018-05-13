import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Bar, Line } from 'react-chartjs-2';
import ChartOptions from './ChartOptions';
import { setChartType } from '../redux/action';

export class NpvResults extends PureComponent {
  static propTypes = {
    npvs: PropTypes.arrayOf(PropTypes.object).isRequired,
    chartType: PropTypes.string,
    setChartType: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    const options = {
      tooltips: {
        mode: 'label',
        callbacks: {
          title: this.tooltipTitle,
          label: this.tooltipLabel,
        },
      },
    };

    this.state = {
      options,
    };
  }

  getPointColor = (npv, opacity) => {
    let r = 0;
    let g = 0;
    let b = 0;

    if (npv <= 0) {
      r = 255;
      g = 0;
      b = 0;
    } else {
      r = 75;
      g = 192;
      b = 192;
    }

    return `rgb(${r}, ${g}, ${b}, ${opacity})`;
  }

  getDataColors = (npvs, opacity) => {
    return npvs.map(npv => this.getPointColor(npv, opacity));
  }

  tooltipTitle = (tooltipItem) => {
    const discount = tooltipItem[0].xLabel;
    const npv = tooltipItem[0].yLabel;

    return `NPV is ${npv} at ${discount}% discount`;
  }

  tooltipLabel = (tooltipItem, data) => {
    const item = data.datasets[tooltipItem.datasetIndex];
    const npvs = item.subData[tooltipItem.index];

    return npvs.reduce((res, npv, i) => {
      const currentLabel = `Year ${i + 1}: ${npv}`;
      return `${res}    ${currentLabel}`;
    }, '');
  }

  constructData = () => {
    const { npvs } = this.props;

    const data = {
      labels: [],
      datasets: [
        {
          label: null,
          fill: true,
          lineTension: 0.1,
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 3,
          pointHoverRadius: 5,
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [],
          subData: [],
          backgroundColor: null,
          borderColor: null,
          pointBorderColor: null,
          pointHoverBackgroundColor: null,
          pointHoverBorderColor: null,
        },
      ],
    };

    const firstDiscount = npvs[0].discountPercentage;
    const lastDiscount = npvs[npvs.length - 1].discountPercentage;
    const dataset = data.datasets[0];

    dataset.label = `NPVs from ${firstDiscount.toFixed(3)}% to ${lastDiscount.toFixed(3)}%`;

    npvs.forEach((result) => {
      data.labels.push(result.discountPercentage.toFixed(3));
      dataset.data.push(result.npv.toFixed(3));
      dataset.subData.push(result.periodNpvs.map(p => p.toFixed(3)));
    });

    dataset.backgroundColor = this.getDataColors(dataset.data, 0.4);
    const color = this.getDataColors(dataset.data, 1);
    dataset.borderColor = color;
    dataset.pointBorderColor = color;
    dataset.pointHoverBackgroundColor = color;
    dataset.pointHoverBorderColor = color;

    return data;
  }

  render() {
    if (this.props.npvs.length === 0) {
      return null;
    }

    const data = this.constructData();
    const ChartComponent = this.props.chartType === 'line' ? Line : Bar;

    return (
      <Fragment>
        <ChartOptions chartType={this.props.chartType} onChange={this.props.setChartType} />
        <ChartComponent data={data} options={this.state.options} />
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    npvs: state.npv.results,
    chartType: state.npv.chartType,
  };
}

export default connect(mapStateToProps, { setChartType })(NpvResults);
