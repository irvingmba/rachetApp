import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from "react-redux";
import createSagaMiddleware  from 'redux-saga';
import combinedReducer from "./StateManagement/redux/reducers";
import { sagaLogin } from "./StateManagement/reduxSaga/sagaLogin";
import { sagaRegister } from "./StateManagement/reduxSaga/sagaRegister";
import RoutedApp from "./router";
import { sagaContacts } from './StateManagement/reduxSaga/sagaContacts';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(combinedReducer, applyMiddleware(sagaMiddleware));

const descLogin = sagaMiddleware.run(sagaLogin);
const descRegister = sagaMiddleware.run(sagaRegister);
const descContacts = sagaMiddleware.run(sagaContacts);

const RedSagApp:React.FunctionComponent = () => {
  return (
    <Provider store={store}>
      <RoutedApp />
    </Provider>
  );
};

export const dispatch = store.dispatch;

export default RedSagApp;