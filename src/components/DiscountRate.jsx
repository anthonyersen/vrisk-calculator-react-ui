import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import InputGroup from 'reactstrap/lib/InputGroup';
import InputGroupAddon from 'reactstrap/lib/InputGroupAddon';
import Input from 'reactstrap/lib/Input';
import Label from 'reactstrap/lib/Label';
import Col from 'reactstrap/lib/Col';
import { toNumber, formatNumber } from '../utils';

export default class DiscountRate extends PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    value: 0,
  };

  handleChange = (e) => {
    const value = toNumber(e.target.value);
    if (value && value < 0) {
      return;
    }

    this.props.onChange(this.props.id, value);
  }

  render() {
    return (
      <Fragment>
        <Label xs={12} sm={4} md={3} lg={2} for={this.props.id}>{this.props.label}</Label>
        <Col xs={12} sm={8} md={9} lg={10}>
          <InputGroup>
            <Input id={this.props.id} type="number" step="1" value={formatNumber(this.props.value)} onChange={this.handleChange} />
            <InputGroupAddon addonType="append">%</InputGroupAddon>
          </InputGroup>
        </Col>
      </Fragment>
    );
  }
}

