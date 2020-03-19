import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { typeRootState } from "../../../StateManagement/redux/reducers";
import { Dispatch } from "redux";
import { actionSelUserMsg, ISelUserMsg } from "../../../StateManagement/redux/actionCreators";
import { Redirect } from "react-router-dom";
import { PATH_MSGS_V } from "../../../globalConfig";

/* -------- REACT COMPONENT -------- */

const ContactOptions:React.FunctionComponent<props> = ({user, active}) => {
  const elements = optionsToComp(options);
  const dispatch = useDispatch();
  const handleClick = user ? getData(user, dispatch) : undefined;
  console.log("Option\n", active);

  return (
    <>
    {
      active ?
      <Redirect to={PATH_MSGS_V}/>
      :
      <>
      <h5>What do you want to do?</h5>
      <ul onClick={handleClick}>
        {elements}
      </ul>
      </>
    }
    </>
  );
};

/* -------- LOCAL FUNCTIONS ------ */

interface Ioptions {
  text: string;
  data: {
    "data-id": string
  }
};

const options:Ioptions[] = [{
  text: "Get info",
  data: {
    "data-id": "info"
  }
}, {
  text: "Send message",
  data: {
    "data-id": "msg"
  }
}];

function optionsToComp(arrData: Ioptions[]){
  const components = arrData.reduce(function(acc:JSX.Element[], data, index){
    const component = <li
    key={index.toString()}
    {...data.data}
    >
      {data.text}
    </li>;
    return acc.concat([component]);
  }, []);
  return components;
};

const optActions = {
  // info:,
  msg: select4Msg
};

type TpOptActions = keyof typeof optActions;

function getData(data:{username: string}, dispatch: Dispatch) {
  return function handleClick(event: React.MouseEvent<HTMLUListElement, MouseEvent>) {
    const target = event.target as HTMLLIElement;
    const dataElement = target.dataset["id"];
    console.log(dataElement);
    if(target.tagName.toUpperCase() !== "LI" || !dataElement ||!(dataElement in optActions)) return;
    switch(dataElement) {
      case "msg":
        dispatch(optActions[dataElement as TpOptActions](data));
        return;
    };
    return;
  };
};

function select4Msg(data: ISelUserMsg) {
  return actionSelUserMsg(data);
};

/* ------- REDUX FUNCTIONS ------- */

function getUser(state: typeRootState) {
  return state.contacts.currentContact;
};

function getUnkActive(state: typeRootState) {
  const active = state.conversations.unkActive;
  if(active) return active;
  return false;
};

function mapStateToProps(state: typeRootState) {
  return {
    user: getUser(state),
    active: getUnkActive(state)
  };
};

type props = ReturnType<typeof mapStateToProps>;

const ConnContactOptions = connect(mapStateToProps)(ContactOptions);

export default ConnContactOptions;