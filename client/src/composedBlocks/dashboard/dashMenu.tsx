import React from 'react';
import { NavLink } from 'react-router-dom';
import { PATH_DASHBOARD_CONTACTS_V } from '../../globalConfig';


const DashboardMenu = () => {
  return (
    <>
    <ul>
      <li>
        <NavLink to={PATH_DASHBOARD_CONTACTS_V}>Contacts</NavLink>
      </li>
    </ul>
    </>
  );
};

export default DashboardMenu;