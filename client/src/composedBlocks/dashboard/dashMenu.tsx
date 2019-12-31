import React from 'react';
import { NavLink, Switch, BrowserRouter } from 'react-router-dom';

const DashboardMenu = () => {

  return (
    <>
    <BrowserRouter>
    <ul>
      <li>
        <NavLink to="/contacts">Contacts</NavLink>
      </li>
    </ul>
    </BrowserRouter>
    </>
  );
};