import React from 'react';
import ReactDOM from 'react-dom';

import { LoginPage } from './composedPages/login';

const box:HTMLDivElement = document.getElementById('content') as HTMLDivElement;
ReactDOM.render(
    <LoginPage />, box
);