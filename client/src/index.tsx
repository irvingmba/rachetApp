import React from 'react';
import ReactDOM from 'react-dom';
import App from './reduxSaga';
import "bootstrap/dist/css/bootstrap.css";

const box:HTMLDivElement = document.getElementById('content') as HTMLDivElement;
ReactDOM.render(
    <App />,
    box
);