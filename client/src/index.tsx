import React from 'react';
import ReactDOM from 'react-dom';
import App from './reduxSaga';
import "bootstrap/scss/bootstrap.scss"

const box:HTMLDivElement = document.getElementById('content') as HTMLDivElement;
ReactDOM.render(
    <App />,
    box
);