import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';

const local = useRouteMatch();

const DashboardMenu = () => {

  return (
    <>
    <ul>
      <li>
        <NavLink to={`${local.path}/contacts`}>Contacts</NavLink>
      </li>
    </ul>
    </>
  );
};

export default DashboardMenu;