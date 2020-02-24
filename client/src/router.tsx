import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import RegistryPage from './ReactComponents/composedPages/registry';
import LoginPage from './ReactComponents/composedPages/login';
import DashboardPage from './ReactComponents/composedPages/dashboard';
import { PATH_REGISTER_VIEW, PATH_LOGIN_VIEW, PATH_DASHBOARD_VIEW } from './globalConfig';
import { connect } from 'react-redux';
import { loginState, typeRootState } from './StateManagement/redux/reducers';
import { Ostatus } from './StateManagement/redux/actionCreators';

const RoutedApp:React.FunctionComponent<props> = ({status}) => {
  return (
    <BrowserRouter>
    <div>
      <Route exact path={PATH_REGISTER_VIEW} component={RegistryPage} /> 
      <Route path={PATH_DASHBOARD_VIEW}>
        {status === Ostatus.online ? <DashboardPage /> : <Redirect to={PATH_LOGIN_VIEW} />}
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

function mapStateToProps(state:typeRootState){
  return {
    status: userLogged(state)
  };
};
type props = ReturnType<typeof mapStateToProps>;

const RdxRoutedApp = connect(mapStateToProps)(RoutedApp);

export default RdxRoutedApp;