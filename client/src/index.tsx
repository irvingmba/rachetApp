import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import redSignInData from './redux/reducers';

import LoginPage from './composedPages/login';
import RegistryPage from './composedPages/registry';

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const store = createStore(redSignInData);

const box:HTMLDivElement = document.getElementById('content') as HTMLDivElement;
ReactDOM.render(
    <Provider store={store}>
        <LoginPage />
    </Provider>,
    box
);