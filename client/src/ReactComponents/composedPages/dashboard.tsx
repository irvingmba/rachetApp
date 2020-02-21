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
import io from "socket.io-client";

const DashboardPage = () => {

  // Call an asynchronous method to restore the state of the application
  const dispatch = useDispatch();
  dispatch(asyncGetContacts({}));

  const ioOptions:SocketIOClient.ConnectOpts = {

  };
  const uri = "https://localhost:4020/listen";
  const socket = io.connect(uri, ioOptions);
  socket.on("connection", function(){console.log("Connected to server");});
  socket.emit("notification connected", "message sent");

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