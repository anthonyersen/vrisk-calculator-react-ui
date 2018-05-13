import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import Input from 'reactstrap/lib/Input';
import FormGroup from 'reactstrap/lib/FormGroup';
import Label from 'reactstrap/lib/Label';

export default class ChartOptions extends PureComponent {
  static propTypes = {
    chartType: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    chartType: 'bar',
  };

  handleChange = (e) => {
    this.props.onChange(e.target.value);
  }

  render() {
    const { chartType } = this.props;
    const isLineChecked = chartType === 'line';
    const isBarChecked = !isLineChecked;

    return (
      <Fragment>
        <FormGroup check inline>
          <Label check>
            <Input type="radio" name="chart-type" value="bar" checked={isBarChecked} onChange={this.handleChange} />{' '}
            Bar
          </Label>
        </FormGroup>
        <FormGroup check inline>
          <Label check>
            <Input type="radio" name="chart-type" value="line" checked={isLineChecked} onChange={this.handleChange} />{' '}
            Line
          </Label>
        </FormGroup>
      </Fragment>
    );
  }
}
