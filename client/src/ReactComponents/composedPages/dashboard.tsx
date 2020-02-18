import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DashboardMenu from "../../composedBlocks/dashboard/dashMenu";
import { Route, Switch, NavLink } from "react-router-dom";
import ContactList from '../composedBlocks/contacts/contacts';
import AddContact from "../composedBlocks/contacts/addContact";
import DashDisplay from '../../composedBlocks/dashboard/dashDisplay';
import DashOptions from '../../composedBlocks/dashboard/dashOptions';
import { connect } from 'react-redux';

const DashboardPage = () => {

  // Call an asynchronous method to restore the state of the application

  return (<>
    <Container fluid={true}>
      <Row>
        <Col>
          <h3>Menu</h3>
          <DashboardMenu />
        </Col>
        <Col>
          <DashOptions />
          <AddContact />
        </Col>
        <Col>
          <DashDisplay />
        </Col>
      </Row>
    </Container>
    </>
  );
};

const ConnectedDashboard = connect(null)(DashboardPage);

export default ConnectedDashboard;