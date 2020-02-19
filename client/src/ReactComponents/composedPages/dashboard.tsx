import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DashboardMenu from "../../ReactComponents/composedBlocks/dashboard/dashMenu";
import { Route, Switch, NavLink } from "react-router-dom";
import AddContact from "../composedBlocks/contacts/addContact";
import DashDisplay from '../../ReactComponents/composedBlocks/dashboard/dashDisplay';
import DashOptions from '../../ReactComponents/composedBlocks/dashboard/dashOptions';
import { connect, useDispatch } from 'react-redux';
import { asyncGetContacts } from "../../StateManagement/reduxSaga/asyncActions";
import ConnContactList from '../composedBlocks/contacts/contacts';

const DashboardPage = () => {

  // Call an asynchronous method to restore the state of the application
  const dispatch = useDispatch();
  dispatch(asyncGetContacts({}));

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
          <ConnContactList />
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