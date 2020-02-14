import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import RegistryPage from './composedPages/registry';
import LoginPage from './composedPages/login';
import DashboardPage from './composedPages/dashboard';
import { PATH_REGISTER_VIEW, PATH_LOGIN_VIEW, PATH_DASHBOARD_VIEW } from './globalConfig';
import { connect } from 'react-redux';
import { stateType } from './redux/reducers';

const RoutedApp:React.FunctionComponent<props> = ({connected}) => {
  return (
    <BrowserRouter>
    <div>
      <Route exact path={PATH_REGISTER_VIEW} component={RegistryPage} /> 
      <Route path={PATH_DASHBOARD_VIEW}>
        {connected ? <DashboardPage /> : <Redirect to={PATH_LOGIN_VIEW} />}
      </Route>
      <Route exact path={PATH_LOGIN_VIEW}>
        {connected ? <Redirect to={PATH_DASHBOARD_VIEW} /> : <LoginPage />}
      </Route>
    </div>
    </BrowserRouter>
  );
};

function userLogged(state:stateType) {
  if("login" in state && "connected" in state["login"]){
    return state["login"]["connected"];
  };
  return false;
};

function mapStateToProps(state:stateType){
  return {
    connected: userLogged(state)
  };
};
type props = ReturnType<typeof mapStateToProps>;

const RdxRoutedApp = connect(mapStateToProps)(RoutedApp);

export default RdxRoutedApp;
// export default RoutedApp;