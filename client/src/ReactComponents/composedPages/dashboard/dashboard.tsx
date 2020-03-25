import React from 'react';
import DashboardMenu from "../../composedBlocks/dashboard/dashMenu";
import { Route, Switch, NavLink, Redirect } from "react-router-dom";
import AddContact from "../../composedBlocks/contacts/addContact";
import DashDisplay from '../../composedBlocks/dashboard/dashDisplay';
import DashOptions from '../../composedBlocks/dashboard/dashOptions';
import { connect, useDispatch } from 'react-redux';
import { asyncGetContacts, asyncSocketInit } from "../../../StateManagement/reduxSaga/asyncActions";
import { dashbStyles } from "./styles";
import { CssBaseline, AppBar, Toolbar, IconButton, Typography, Badge, Drawer, Divider, List, Container, Grid, Paper, Box } from '@material-ui/core';
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import clsx from "clsx";
import { Ostatus } from '../../../StateManagement/redux/actionCreators';
import { PATH_LOGIN_VIEW } from '../../../globalConfig';

const DashboardPage:React.FunctionComponent<{status:Ostatus}> = ({status}) => {
  const styles = dashbStyles();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  // Call an asynchronous method to restore the state of the application
  const dispatch = useDispatch();
  dispatch(asyncGetContacts({}));
  dispatch(asyncSocketInit());

  return (<>
  {status === Ostatus.offline  ? <Redirect to={PATH_LOGIN_VIEW} /> : ""}
  <div className={styles.root}>
  <CssBaseline />
      <AppBar position="absolute" className={clsx(styles.appBar, open && styles.appBarShift)}>
        <Toolbar className={styles.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(styles.menuButton, open && styles.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={styles.title}>
            Dashboard
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(styles.drawerPaper, !open && styles.drawerPaperClose),
        }}
        open={open}
      >
        <div className={styles.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List><DashboardMenu /></List>
        <Divider />
      </Drawer>
  <main className={styles.content}>
    <div className={styles.appBarSpacer} />
      <Grid container spacing={0}>
        <Grid item xs={12} md={4} lg={4}>
          <DashOptions />
        </Grid>
        <Grid item xs={12} md={4} lg={8}>
          <DashDisplay />
        </Grid>
      </Grid>
    </main>
    </div>
    </>
  );
};

const ConnectedDashboard = connect(null)(DashboardPage);

export default ConnectedDashboard;