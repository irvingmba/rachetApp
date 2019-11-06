const { FormInput } = require('./components/formComponents'),
React = require('react'),
ReactDOM = require('react-dom');

const box:HTMLDivElement = document.getElementById('content') as HTMLDivElement;
ReactDOM.render(
    <FormInput />, box
);