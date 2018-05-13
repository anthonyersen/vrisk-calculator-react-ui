import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Label from 'reactstrap/lib/Label';
import Button from 'reactstrap/lib/Button';
import Input from 'reactstrap/lib/Input';
import CashFlow from '../../components/CashFlow';

describe('<CashFlow />', () => {
  it('should display the label, input and remove button', () => {
    const cb = sinon.fake();
    const wrapper = shallow(<CashFlow yearNumber={2} onChange={cb} onRemove={cb} />);

    expect(wrapper.find(Label).render().text()).toBe('Year 2');
    expect(wrapper.find(Input)).toHaveLength(1);
    expect(wrapper.find(Button).render().text()).toBe('-');
  });

  it('should call onRemove callback with yearNumber', () => {
    const cb = sinon.fake();
    const onRemove = sinon.spy();

    const wrapper = shallow(<CashFlow yearNumber={2} onChange={cb} onRemove={onRemove} />);
    wrapper.find(Button).simulate('click');

    expect(onRemove.calledOnce).toBe(true);
    expect(onRemove.calledWith(2)).toBe(true);
  });

  describe('onChange', () => {
    it('should call callback with yearNumber and value', () => {
      const cb = sinon.fake();
      const onChange = sinon.spy();

      const wrapper = shallow(<CashFlow yearNumber={2} onChange={onChange} onRemove={cb} />);
      wrapper.find(Input).simulate('change', {target: {value: '4500.77'}});

      expect(onChange.calledOnce).toBe(true);
      expect(onChange.calledWith(2, 4500.77)).toBe(true);
    });

    it('should call callback with yearNumber and null when value is empty string', () => {
      const cb = sinon.fake();
      const onChange = sinon.spy();

      const wrapper = shallow(<CashFlow yearNumber={2} onChange={onChange} onRemove={cb} />);
      wrapper.find(Input).simulate('change', {target: {value: ''}});

      expect(onChange.calledOnce).toBe(true);
      expect(onChange.calledWith(2, null)).toBe(true);
    });
  });

});
