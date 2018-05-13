import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from 'react-loader-advanced';
import Form from 'reactstrap/lib/Form';
import InputGroup from 'reactstrap/lib/InputGroup';
import InputGroupAddon from 'reactstrap/lib/InputGroupAddon';
import Input from 'reactstrap/lib/Input';
import Button from 'reactstrap/lib/Button';
import FormGroup from 'reactstrap/lib/FormGroup';
import Label from 'reactstrap/lib/Label';
import Col from 'reactstrap/lib/Col';
import DiscountRates from './DiscountRates';
import CashFlows from './CashFlows';
import {
  calculateNpv,
  setProperty,
  setYearCashFlow,
  addYear,
  removeYear,
} from '../redux/action';
import { toNumber, formatNumber } from '../utils';

export class NpvForm extends PureComponent {
  static propTypes = {
    npv: PropTypes.object.isRequired,
    calculateNpv: PropTypes.func.isRequired,
    setProperty: PropTypes.func.isRequired,
    setYearCashFlow: PropTypes.func.isRequired,
    addYear: PropTypes.func.isRequired,
    removeYear: PropTypes.func.isRequired,
  };

  handlePropertyChange = (property, value) => {
    this.props.setProperty(property, value);
  }

  handleInitialInvestmentChange = (e) => {
    const investment = toNumber(e.target.value);
    this.handlePropertyChange('initialInvestment', investment);
  }

  handleCalculate = () => {
    const calculateNpvRequest = {
      initialInvestment: this.props.npv.initialInvestment || 0,
      discountRateDetail: {
        upperBoundPercentage: this.props.npv.discountUpperBound || 0,
        lowerBoundPercentage: this.props.npv.discountLowerBound || 0,
        incrementPercentage: this.props.npv.discountIncrement || 0,
      },
      cashFlows: this.props.npv.cashFlows.map(cf => cf || 0),
    };

    this.props.calculateNpv(calculateNpvRequest);
  }

  renderInitialInvestment = () => {
    return (
      <FormGroup row>
        <Label xs={12} sm={4} md={3} lg={2} for="initialInvestment">Investment</Label>
        <Col xs={12} sm={8} md={9} lg={10}>
          <InputGroup>
            <InputGroupAddon addonType="prepend">$</InputGroupAddon>
            <Input
              id="initialInvestment"
              type="number"
              step="1"
              value={formatNumber(this.props.npv.initialInvestment)}
              onChange={this.handleInitialInvestmentChange}
            />
          </InputGroup>
        </Col>
      </FormGroup>
    );
  }

  render() {
    return (
      <Loader show={this.props.npv.calculating} message="Loading Results...">
        <Form>
          {this.renderInitialInvestment()}

          <DiscountRates
            increment={this.props.npv.discountIncrement}
            lowerBound={this.props.npv.discountLowerBound}
            upperBound={this.props.npv.discountUpperBound}
            onChange={this.handlePropertyChange}
          />

          <CashFlows
            values={this.props.npv.cashFlows}
            onCashFlowChange={this.props.setYearCashFlow}
            onRemoveYear={this.props.removeYear}
          />

          <div className="float-right npv-form-buttons">
            <Button color="primary" onClick={this.props.addYear}>Add Year</Button>
            <Button color="success" onClick={this.handleCalculate}>Calculate</Button>
          </div>
        </Form>
      </Loader>
    );
  }
}

function mapStateToProps(state) {
  return {
    npv: state.npv,
  };
}

export default connect(mapStateToProps, {
  calculateNpv,
  setProperty,
  setYearCashFlow,
  addYear,
  removeYear,
})(NpvForm);
