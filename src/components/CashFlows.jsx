import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FormGroup from 'reactstrap/lib/FormGroup';
import CashFlow from './CashFlow';

export default class CashFlows extends PureComponent {
  static propTypes = {
    values: PropTypes.arrayOf(PropTypes.number).isRequired,
    onCashFlowChange: PropTypes.func.isRequired,
    onRemoveYear: PropTypes.func.isRequired,
  };

  createCashFlow = (yearNumber, value) => {
    return (
      <CashFlow
        key={yearNumber}
        yearNumber={yearNumber}
        value={value}
        onRemove={this.props.onRemoveYear}
        onChange={this.props.onCashFlowChange}
      />
    );
  }

  render() {
    return (
      <FormGroup tag="fieldset">
        <legend>Cash Flows</legend>
        {this.props.values.map((v, i) => this.createCashFlow(i + 1, v))}
      </FormGroup>
    );
  }
}
