import { Registry } from './composedBlocks/registryBlock';
import React from 'react';
import ReactDOM from 'react-dom';

const box:HTMLDivElement = document.getElementById('content') as HTMLDivElement;
ReactDOM.render(
    <Registry />, box
);