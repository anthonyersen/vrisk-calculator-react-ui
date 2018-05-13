import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Input from 'reactstrap/lib/Input';
import ChartOptions from '../../components/ChartOptions';

describe('<ChartOptions />', () => {
  it('should create bar and line options', () => {
    const cb = sinon.fake();
    const wrapper = shallow(<ChartOptions onChange={cb} />);

    const inputs = wrapper.find(Input);
    expect(inputs).toHaveLength(2);

    expect(inputs.get(0).props.value).toBe('bar');
    expect(inputs.get(1).props.value).toBe('line');
    expect(inputs.get(0).props.name).toBe(inputs.get(1).props.name);
  });

  it('should select bar by default', () => {
    const cb = sinon.fake();
    const wrapper = shallow(<ChartOptions onChange={cb} />);

    const inputs = wrapper.find(Input);
    expect(inputs.get(0).props.checked).toBe(true);
    expect(inputs.get(1).props.checked).toBe(false);
  });

  it('should select line when chartType is line', () => {
    const cb = sinon.fake();
    const wrapper = shallow(<ChartOptions chartType="line" onChange={cb} />);

    const inputs = wrapper.find(Input);
    expect(inputs.get(0).props.checked).toBe(false);
    expect(inputs.get(1).props.checked).toBe(true);
  });

  it('should call onChange callback with the option name', () => {
    const onChange = sinon.spy();

    const wrapper = shallow(<ChartOptions chartType="bar" onChange={onChange} />);
    wrapper.find(Input).first().simulate('change', {target: {value: 'line'}});

    expect(onChange.calledOnce).toBe(true);
    expect(onChange.calledWith('line')).toBe(true);
  });
});

