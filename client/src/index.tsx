import React from 'react';
import ReactDOM from 'react-dom';
import App from './reduxSaga';
import CssBaseline from '@material-ui/core/CssBaseline';

const box:HTMLDivElement = document.getElementById('content') as HTMLDivElement;
// box.style.boxSizing = "border-box";
// box.style.height = "100%";
// box.style.width = "100%";
// box.style.backgroundColor = "#602080";

ReactDOM.render(
        <App />
    , box
);

// const body = document.querySelector("body");
// function test(body: HTMLBodyElement|null) {
//     if(!body) return;
//     body.style.height = "100%";
//     body.style.width = "100%";
//     body.style.backgroundColor = "gray";
//     return;
// };
// test(body)