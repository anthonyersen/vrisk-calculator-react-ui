import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Navbar from 'reactstrap/lib/Navbar';
import Input from 'reactstrap/lib/Input';
import Button from 'reactstrap/lib/Button';
import Loader from 'react-loader-advanced';
import { NpvForm } from '../../components/NpvFormContainer';
import DiscountRates from '../../components/DiscountRates';
import CashFlows from '../../components/CashFlows';
import { initialState } from '../../redux/npvReducer';

function createNpvForm(paramsObj = {}) {
  const cb = sinon.fake();
  return (
    <NpvForm
      npv={initialState}
      calculateNpv={cb}
      setProperty={cb}
      setYearCashFlow={cb}
      addYear={cb}
      removeYear={cb}
      {...paramsObj}
    />
  );
}

describe('<NpvForm />', () => {
  it('should create initial investment, DiscountRates, CashFlows and buttons', () => {
    const cb = sinon.fake();
    const wrapper = shallow(createNpvForm());

    // Initial Investment
    expect(wrapper.find('#initialInvestment')).toHaveLength(1);

    // DiscountRates
    expect(wrapper.find(DiscountRates)).toHaveLength(1);

    // CashFlows
    expect(wrapper.find(CashFlows)).toHaveLength(1);

    // Buttons
    const buttons = wrapper.find(Button);
    expect(buttons).toHaveLength(2);
    expect(buttons.at(0).render().text()).toBe('Add Year');
    expect(buttons.at(1).render().text()).toBe('Calculate');
  });

  it('should show Loader when calculating is true', () => {
    const cb = sinon.fake();
    const wrapper = shallow(createNpvForm({ npv: { ...initialState, calculating: true } }));

    const loader = wrapper.find(Loader);
    expect(loader).toHaveLength(1);
    expect(loader.props().show).toBe(true);
  });

  it('should call addYear from props when button is clicked', () => {
    const addYearSpy = sinon.spy();
    const wrapper = shallow(createNpvForm({ addYear: addYearSpy }));
    const addYearButton = wrapper.find(Button).at(0);

    addYearButton.simulate('click');

    expect(addYearSpy.calledOnce).toBe(true);
  });

  it('should call calculateNpv from props when button is clicked', () => {
    const calculateNpvSpy = sinon.spy();
    const npv = {
      initialInvestment: 10000,
      discountLowerBound: null,
      discountIncrement: 0.25,
      calculating: false,
      cashFlows: [1000, 0, 2000, null, 3000],
    };
    const wrapper = shallow(createNpvForm({ npv, calculateNpv: calculateNpvSpy }));
    const calculateButton = wrapper.find(Button).at(1);

    calculateButton.simulate('click');

    expect(calculateNpvSpy.calledOnce).toBe(true);
    const calculateNpvRequest = calculateNpvSpy.getCall(0).args[0];

    expect(calculateNpvRequest.initialInvestment).toBe(10000);
    expect(calculateNpvRequest.discountRateDetail.lowerBoundPercentage).toBe(0);
    expect(calculateNpvRequest.discountRateDetail.upperBoundPercentage).toBe(0);
    expect(calculateNpvRequest.discountRateDetail.incrementPercentage).toBe(0.25);
    expect(calculateNpvRequest.cashFlows).toEqual([1000, 0, 2000, 0, 3000]);
  });
});
