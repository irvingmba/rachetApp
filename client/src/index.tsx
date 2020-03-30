import React from 'react';
import ReactDOM from 'react-dom';
import App from './reduxSaga';

const box:HTMLDivElement = document.getElementById('content') as HTMLDivElement;

ReactDOM.render(
        <App />
    , box
);
