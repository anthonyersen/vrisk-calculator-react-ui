import React, { PureComponent, Fragment } from 'react';
import Container from 'reactstrap/lib/Container';
import Card from 'reactstrap/lib/Card';
import CardHeader from 'reactstrap/lib/CardHeader';
import CardBody from 'reactstrap/lib/CardBody';
import Navbar from 'reactstrap/lib/Navbar';
import NavbarBrand from 'reactstrap/lib/NavbarBrand';
import NpvFormContainer from './NpvFormContainer';
import NpvResultsContainer from './NpvResultsContainer';
import AlertMessageContainer from './AlertMessageContainer';
import './NpvCalculator.css';

export default class NpvCalculator extends PureComponent {
  render() {
    return (
      <Fragment>
        <Navbar color="info" dark>
          <NavbarBrand href="/">Visual Risk</NavbarBrand>
        </Navbar>
        <Container className="main">
          <AlertMessageContainer />
          <Card>
            <CardHeader tag="h4">NPV Calculator</CardHeader>
            <CardBody>
              <NpvFormContainer />
            </CardBody>
          </Card>
        </Container>
        <Container className="main">
          <NpvResultsContainer />
        </Container>
      </Fragment>
    );
  }
}
