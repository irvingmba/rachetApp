import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import RegistryPage from './composedPages/registry';
import LoginPage from './composedPages/login';
import DashboardPage from './composedPages/dashboard';

const RoutedApp = () => {
  return (
    <BrowserRouter>
    <div>
      <Route exact path="/registry" component={RegistryPage} /> 
      <Route exact path="/dashboard" component={DashboardPage} />
      <Route exact path="/" component={LoginPage} />
    </div>
    </BrowserRouter>
  );
};

export default RoutedApp;