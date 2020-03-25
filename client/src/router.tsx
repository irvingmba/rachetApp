import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import RegistryPage from './ReactComponents/composedPages/registry/registry';
import LoginPage from './ReactComponents/composedPages/login/login';
import DashboardPage from './ReactComponents/composedPages/dashboard/dashboard';
import { PATH_REGISTER_VIEW, PATH_LOGIN_VIEW, PATH_DASHBOARD_VIEW } from './globalConfig';
import { connect, useDispatch } from 'react-redux';
import { typeRootState } from './StateManagement/redux/reducers';
import { Ostatus } from './StateManagement/redux/actionCreators';
import { asyncOwnProfile } from './StateManagement/reduxSaga/asyncActions';


/* ---- LOCAL FUNCTIONS ----- */

function loggedIn(user: {status: Ostatus}) {
  if(user.status === Ostatus.online) return;
  const dispatch = useDispatch();
  dispatch(asyncOwnProfile({}));
  return;
};

/* ----- REACT COMPONENT -------- */

const RoutedApp:React.FunctionComponent<props> = ({status, registry}) => {
  loggedIn({status});

  return (
    <BrowserRouter>
    <div>
      <Switch>
      <Route path={PATH_REGISTER_VIEW} >
        <RegistryPage registry={registry}/>
      </Route> 
      <Route path={PATH_DASHBOARD_VIEW}>
        <DashboardPage status={status} />
      </Route>
      <Route exact path={PATH_LOGIN_VIEW}>
        <LoginPage status={status}/>
      </Route>
      <Redirect to={PATH_LOGIN_VIEW}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
};

function userLogged(state:typeRootState) {
  if(state.login.status  === Ostatus.online){
    return Ostatus.online;
  };
  return Ostatus.offline;
};

function getRegistry(state: typeRootState) {
  if(state.login.registry === true) return true;
  return false;
};

function mapStateToProps(state:typeRootState){
  return {
    status: userLogged(state),
    registry: getRegistry(state)
  };
};
type props = ReturnType<typeof mapStateToProps>;

const RdxRoutedApp = connect(mapStateToProps)(RoutedApp);

export default RdxRoutedApp;