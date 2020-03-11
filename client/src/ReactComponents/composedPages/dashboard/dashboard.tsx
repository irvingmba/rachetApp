import React from 'react';
import DashboardMenu from "../../composedBlocks/dashboard/dashMenu";
import { Route, Switch, NavLink } from "react-router-dom";
import AddContact from "../../composedBlocks/contacts/addContact";
import DashDisplay from '../../composedBlocks/dashboard/dashDisplay';
import DashOptions from '../../composedBlocks/dashboard/dashOptions';
import { connect, useDispatch } from 'react-redux';
import { asyncGetContacts, asyncSocketInit } from "../../../StateManagement/reduxSaga/asyncActions";

const DashboardPage = () => {

  // Call an asynchronous method to restore the state of the application
  const dispatch = useDispatch();
  dispatch(asyncGetContacts({}));
  dispatch(asyncSocketInit());

  return (<>
    <h3>Menu</h3>
    <DashboardMenu />
    <DashOptions />
    <DashDisplay />
    </>
  );
};

const ConnectedDashboard = connect(null)(DashboardPage);

export default ConnectedDashboard;