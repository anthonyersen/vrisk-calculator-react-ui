import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import CashFlows from '../../components/CashFlows';
import CashFlow from '../../components/CashFlow';

describe('<CashFlows />', () => {
  it('should create CashFlows depending on the length of the values prop', () => {
    const cb = sinon.fake();
    const wrapper = shallow(<CashFlows values={[3000, 2000, 7000]} onCashFlowChange={cb} onRemoveYear={cb} />);

    expect(wrapper.find(CashFlow)).toHaveLength(3);
  });
});

