import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { Bar, Line } from 'react-chartjs-2';
import ChartOptions from '../../components/ChartOptions';
import { NpvResults } from '../../components/NpvResultsContainer';

describe('<NpvResults />', () => {
  const results = [
    { discountPercentage: 1.25, npv: 3525, periodNpvs: [7000, 8000, 9525] },
    { discountPercentage: 1.25, npv: 3525, periodNpvs: [4000, 5000, 6525] },
    { discountPercentage: 1.25, npv: 3525, periodNpvs: [1000, 2000, 3525] },
  ];

  it('should not render when npvs is empty', () => {
    const cb = sinon.fake();
    const wrapper = shallow(<NpvResults npvs={[]} setChartType={cb} />);

    expect(wrapper.type()).toBeNull();
  });

  it('should render ChartOptions', () => {
    const cb = sinon.fake();
    const wrapper = shallow(<NpvResults npvs={results} setChartType={cb} />);

    expect(wrapper.find(ChartOptions)).toHaveLength(1);
  });

  describe('chartType', () => {
    it('should render Bar by default', () => {
      const cb = sinon.fake();
      const wrapper = shallow(<NpvResults npvs={results} setChartType={cb} />);

      expect(wrapper.find(Bar)).toHaveLength(1);
      expect(wrapper.find(Line)).toHaveLength(0);
    });

    it('should render Bar when chartType is bar', () => {
      const cb = sinon.fake();
      const wrapper = shallow(<NpvResults npvs={results} chartType="bar" setChartType={cb} />);

      expect(wrapper.find(Bar)).toHaveLength(1);
      expect(wrapper.find(Line)).toHaveLength(0);
    });

    it('should render Line when chartType is line', () => {
      const cb = sinon.fake();
      const wrapper = shallow(<NpvResults npvs={results} chartType="line" setChartType={cb} />);

      expect(wrapper.find(Bar)).toHaveLength(0);
      expect(wrapper.find(Line)).toHaveLength(1);
    });

    it('should render Bar when chartType is unsupported', () => {
      const cb = sinon.fake();
      const wrapper = shallow(<NpvResults npvs={results} chartType="pie" setChartType={cb} />);

      expect(wrapper.find(Bar)).toHaveLength(1);
      expect(wrapper.find(Line)).toHaveLength(0);
    });
  });
});

