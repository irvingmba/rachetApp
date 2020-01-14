import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DashboardMenu from "../composedBlocks/dashboard/dashMenu";
import { Route, Switch } from "react-router-dom";
import ContactList from '../composedBlocks/dashboard/contacts';
import { PATH_DASHBOARD_CONTACTS_V } from '../globalConfig';

const DashboardPage = () => {
  return (<>
    <Container fluid={true}>
      <Row>
        <Col>
          <h3>Menu</h3>
          <DashboardMenu />
        </Col>
        <Col>
          <h3>Options</h3>
          <Switch>
            <Route path={PATH_DASHBOARD_CONTACTS_V}>
              <h5>Contact list</h5>
            </Route>
          </Switch>
        </Col>
        <Col>
          <h3>Display</h3>
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default DashboardPage;