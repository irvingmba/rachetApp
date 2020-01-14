import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import RegistryPage from './composedPages/registry';
import LoginPage from './composedPages/login';
import DashboardPage from './composedPages/dashboard';
import { PATH_REGISTER_VIEW, PATH_LOGIN_VIEW, PATH_DASHBOARD_VIEW } from './globalConfig';

const RoutedApp = () => {
  return (
    <BrowserRouter>
    <div>
      <Route exact path={PATH_REGISTER_VIEW} component={RegistryPage} /> 
      <Route path={PATH_DASHBOARD_VIEW} component={DashboardPage} />
      <Route exact path={PATH_LOGIN_VIEW} component={LoginPage} />
    </div>
    </BrowserRouter>
  );
};

export default RoutedApp;