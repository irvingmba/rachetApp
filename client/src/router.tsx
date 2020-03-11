import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import RegistryPage from './ReactComponents/composedPages/registry/registry';
import LoginPage from './ReactComponents/composedPages/login/login';
import DashboardPage from './ReactComponents/composedPages/dashboard/dashboard';
import { PATH_REGISTER_VIEW, PATH_LOGIN_VIEW, PATH_DASHBOARD_VIEW } from './globalConfig';
import { connect } from 'react-redux';
import { typeRootState } from './StateManagement/redux/reducers';
import { Ostatus } from './StateManagement/redux/actionCreators';

const RoutedApp:React.FunctionComponent<props> = ({status, registry}) => {
  return (
    <BrowserRouter>
    <div>
      <Route exact path={PATH_REGISTER_VIEW} >
        {registry === false ? <RegistryPage /> : <Redirect to={PATH_LOGIN_VIEW}/>}
      </Route> 
      <Route path={PATH_DASHBOARD_VIEW}>
        {status === Ostatus.offline ? <Redirect to={PATH_LOGIN_VIEW} /> : <DashboardPage />}
      </Route>
      <Route exact path={PATH_LOGIN_VIEW}>
        {status === Ostatus.online ? <Redirect to={PATH_DASHBOARD_VIEW} /> : <LoginPage />}
      </Route>
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