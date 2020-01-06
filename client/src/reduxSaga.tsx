import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from "react-redux";
import createSagaMiddleware  from 'redux-saga';
import combinedReducer from "./redux/reducers"
import { asLogin } from "./reduxSaga/sagaLogin"
import RoutedApp from "./router";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(combinedReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(asLogin);

const RedSagApp:React.FunctionComponent = () => {
  return (
    <Provider store={store}>
      <RoutedApp />
    </Provider>
  );
};

export const dispatch = store.dispatch;

export default RedSagApp;