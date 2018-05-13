import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Input from 'reactstrap/lib/Input';
import DiscountRate from '../../components/DiscountRate';

describe('<DiscountRate />', () => {
  describe('onChange', () => {
    it('should not call callback when value is negative', () => {
      const cb = sinon.fake();
      const onChange = sinon.spy();

      const wrapper = shallow(<DiscountRate id="dc" value={10} onChange={onChange} />);
      wrapper.find(Input).simulate('change', {target: {value: '-1'}});

      expect(onChange.callCount).toBe(0);
    });

    it('should call callback when value is positive', () => {
      const cb = sinon.fake();
      const onChange = sinon.spy();

      const wrapper = shallow(<DiscountRate id="dc" value={10} onChange={onChange} />);
      wrapper.find(Input).simulate('change', {target: {value: '6.25'}});

      expect(onChange.calledOnce).toBe(true);
      expect(onChange.calledWith('dc', 6.25)).toBe(true);
    });

    it('should call callback when value is empty string', () => {
      const onChange = sinon.spy();

      const wrapper = shallow(<DiscountRate id="dc" value={10} onChange={onChange} />);
      wrapper.find(Input).simulate('change', {target: {value: ''}});

      expect(onChange.calledOnce).toBe(true);
      expect(onChange.calledWith('dc', null)).toBe(true);
    });
  });
});
