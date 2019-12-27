import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import redSignInData from './redux/reducers';

import RoutedApp from './router';

const store = createStore(redSignInData);

const box:HTMLDivElement = document.getElementById('content') as HTMLDivElement;
ReactDOM.render(
    <Provider store={store}>
        <RoutedApp />
    </Provider>,
    box
);