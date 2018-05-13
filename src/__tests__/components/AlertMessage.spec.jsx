import React from 'react';
import { shallow } from 'enzyme';
import { AlertMessage } from '../../components/AlertMessageContainer';
import Alert from 'reactstrap/lib/Alert';

describe('<AlertMessage />', () => {
  it('should not render when errorMessage is not available', () => {
    const wrapper = shallow(<AlertMessage />);

    expect(wrapper.type()).toBeNull();
  });

  it('should not render when errorMessage is not available', () => {
    const wrapper = shallow(<AlertMessage errorMessage="Something has gone wrong" />);

    expect(wrapper.find(Alert)).toHaveLength(1);
  });
});
