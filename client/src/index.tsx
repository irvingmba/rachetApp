const { FormInput } = require('./components/formComponents');

const box:HTMLDivElement = document.getElementById('content') as HTMLDivElement;
ReactDOM.render(
    <FormInput />, box
);