import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { PATH_CONTACTS_V } from '../../../globalConfig';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import Conversations from "@material-ui/icons/Forum";
import Friends from "@material-ui/icons/Contacts";

const DashboardMenu = () => {
  const {path, url} = useRouteMatch();

  return (
    <>
    <div>
    <NavLink to={`${url}`}>
    <ListItem button>
      <ListItemIcon>
        <Conversations />
      </ListItemIcon>
      <ListItemText primary="Messages" />
    </ListItem>
    </NavLink>
    <NavLink to={`${url+PATH_CONTACTS_V}`}>
    <ListItem button>
      <ListItemIcon>
        <Friends />
      </ListItemIcon>
      <ListItemText primary="Friends" />
    </ListItem>
    </NavLink>
    </div>
    </>
  );
};

export default DashboardMenu;