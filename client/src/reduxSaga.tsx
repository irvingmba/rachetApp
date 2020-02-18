import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from "react-redux";
import createSagaMiddleware  from 'redux-saga';
import combinedReducer from "./StateManagement/redux/reducers";
import { sagaLogin } from "./StateManagement/reduxSaga/sagaLogin";
import { sagaRegister } from "./StateManagement/reduxSaga/sagaRegister";
import RoutedApp from "./router";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(combinedReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(sagaLogin);
sagaMiddleware.run(sagaRegister);

const RedSagApp:React.FunctionComponent = () => {
  return (
    <Provider store={store}>
      <RoutedApp />
    </Provider>
  );
};

export const dispatch = store.dispatch;

export default RedSagApp;