import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FormGroup from 'reactstrap/lib/FormGroup';
import DiscountRate from './DiscountRate';

export default class DiscountRates extends PureComponent {
  static propTypes = {
    increment: PropTypes.number,
    lowerBound: PropTypes.number,
    upperBound: PropTypes.number,
    onChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    increment: 0,
    lowerBound: 0,
    upperBound: 0,
  };

  render() {
    return (
      <FormGroup tag="fieldset">
        <legend>Discount Rate</legend>
        <FormGroup row>
          <DiscountRate id="discountLowerBound" label="Lower Bound" value={this.props.lowerBound} onChange={this.props.onChange} />
        </FormGroup>
        <FormGroup row>
          <DiscountRate id="discountUpperBound" label="Upper Bound" value={this.props.upperBound} onChange={this.props.onChange} />
        </FormGroup>
        <FormGroup row>
          <DiscountRate id="discountIncrement" label="Increment" value={this.props.increment} onChange={this.props.onChange} />
        </FormGroup>
      </FormGroup>
    );
  }
}

