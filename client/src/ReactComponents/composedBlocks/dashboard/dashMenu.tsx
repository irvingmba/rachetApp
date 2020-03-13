import React from 'react';
import { NavLink } from 'react-router-dom';
import { PATH_DASHBOARD_CONTACTS_V } from '../../../globalConfig';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import Conversations from "@material-ui/icons/Forum";
import Friends from "@material-ui/icons/Contacts";

const DashboardMenu = () => {
  return (
    <>
    <div>
    <NavLink to={PATH_DASHBOARD_CONTACTS_V}>
    <ListItem button>
      <ListItemIcon>
        <Conversations />
      </ListItemIcon>
      <ListItemText primary="Messages" />
    </ListItem>
    </NavLink>
    <ListItem button>
      <ListItemIcon>
        <Friends />
      </ListItemIcon>
      <ListItemText primary="Friends" />
    </ListItem>
    </div>
    </>
  );
};

export default DashboardMenu;