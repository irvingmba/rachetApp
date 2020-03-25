import React from 'react';
import ReactDOM from 'react-dom';
import App from './reduxSaga';
import CssBaseline from '@material-ui/core/CssBaseline';

const box:HTMLDivElement = document.getElementById('content') as HTMLDivElement;

ReactDOM.render(
        <App />
    , box
);
