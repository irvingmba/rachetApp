import React from 'react';
import ReactDOM from 'react-dom';

import RoutedApp from './router';


const box:HTMLDivElement = document.getElementById('content') as HTMLDivElement;
ReactDOM.render(
    <RoutedApp />,
    box
);