import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DashboardMenu from "../composedBlocks/dashboard/dashMenu";
import { Route, Switch, NavLink } from "react-router-dom";
import ContactList from '../composedBlocks/contacts/contacts';
import { PATH_DASHBOARD_CONTACTS_V, PATH_DASH_CONT_DISPLAY_V } from '../globalConfig';
import DashDisplay from '../composedBlocks/dashboard/dashDisplay';
import DashOptions from '../composedBlocks/dashboard/dashOptions';

const DashboardPage = () => {
  return (<>
    <Container fluid={true}>
      <Row>
        <Col>
          <h3>Menu</h3>
          <DashboardMenu />
        </Col>
        <Col>
          <DashOptions />
        </Col>
        <Col>
          <DashDisplay />
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default DashboardPage;