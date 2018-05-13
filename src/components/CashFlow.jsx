import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import InputGroup from 'reactstrap/lib/InputGroup';
import InputGroupAddon from 'reactstrap/lib/InputGroupAddon';
import Input from 'reactstrap/lib/Input';
import FormGroup from 'reactstrap/lib/FormGroup';
import Label from 'reactstrap/lib/Label';
import Button from 'reactstrap/lib/Button';
import Col from 'reactstrap/lib/Col';
import { toNumber, formatNumber } from '../utils';

export default class CashFlow extends PureComponent {
  static propTypes = {
    yearNumber: PropTypes.number.isRequired,
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
  };

  static defaultProps = {
    value: 0,
  };

  handleRemove = () => {
    this.props.onRemove(this.props.yearNumber);
  }

  handleChange = (e) => {
    const cashFlow = toNumber(e.target.value);
    if (cashFlow && cashFlow < 0) {
      return;
    }
    this.props.onChange(this.props.yearNumber, cashFlow);
  }

  render() {
    const id = `year-${this.props.yearNumber}-cashflow`;
    return (
      <FormGroup row>
        <Label xs={12} sm={4} md={3} lg={2} for={id}>{`Year ${this.props.yearNumber}`}</Label>
        <Col xs={12} sm={8} md={9} lg={10}>
          <InputGroup>
            <InputGroupAddon addonType="prepend">$</InputGroupAddon>
            <Input type="number" step="1" value={formatNumber(this.props.value)} onChange={this.handleChange} />
            <InputGroupAddon addonType="append">
              <Button color="danger" onClick={this.handleRemove}>-</Button>
            </InputGroupAddon>
          </InputGroup>
        </Col>
      </FormGroup>
    );
  }
}
