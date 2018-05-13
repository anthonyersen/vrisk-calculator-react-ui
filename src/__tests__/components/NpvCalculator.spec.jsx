import React from 'react';
import { shallow } from 'enzyme';
import Navbar from 'reactstrap/lib/Navbar';
import NpvCalculator from '../../components/NpvCalculator';

describe('<NpvCalculator />', () => {
  it('should create NavBar', () => {
    const wrapper = shallow(<NpvCalculator />);

    expect(wrapper.find(Navbar)).toHaveLength(1);
  });
});

