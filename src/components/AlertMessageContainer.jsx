import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Alert from 'reactstrap/lib/Alert';

export class AlertMessage extends PureComponent {
  static propTypes = {
    errorMessage: PropTypes.string,
  };

  render() {
    if (!this.props.errorMessage) {
      return null;
    }

    return (
      <Alert color="danger">
        {this.props.errorMessage}
      </Alert>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.npv.error,
  };
}

export default connect(mapStateToProps)(AlertMessage);
