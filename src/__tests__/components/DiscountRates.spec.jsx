import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import DiscountRates from '../../components/DiscountRates';
import DiscountRate from '../../components/DiscountRate';

describe('<DiscountRate />', () => {
  it('should create lower bound, upper bound and increment', () => {
    const cb = sinon.fake();
    const wrapper = shallow(<DiscountRates onChange={cb} />);

    const discountRate = wrapper.find(DiscountRate);
    expect(discountRate).toHaveLength(3);
    expect(discountRate.find('#discountLowerBound')).toHaveLength(1);
    expect(discountRate.find('#discountUpperBound')).toHaveLength(1);
    expect(discountRate.find('#discountIncrement')).toHaveLength(1);
  });
});

