import React from 'react';
import UserConnected from '../composedBlocks/notifications/contacts';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const DashboardPage = () => {

  return (<>
    <Container fluid={true}>
      <Row>
        <Col>
          <h3>Menu</h3>
        </Col>
        <Col>
          <h3>Options</h3>
        </Col>
        <Col>
          <h3>Display</h3>
        </Col>
      </Row>
    </Container>
    <h1>Dashboard</h1>
    <UserConnected />
    </>
  );
};

export default DashboardPage;