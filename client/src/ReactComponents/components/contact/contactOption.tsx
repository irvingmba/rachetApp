import React from "react";
import { connect, useDispatch } from "react-redux";
import { typeRootState } from "../../../StateManagement/redux/reducers";
import { Dispatch } from "redux";
import { actionSelUserMsg } from "../../../StateManagement/redux/actionCreators";

/* -------- REACT COMPONENT -------- */

const ContactOptions:React.FunctionComponent<props> = ({user}) => {
  const elements = optionsToComp(options);
  const dispatch = useDispatch();
  const handleClick = user ? getData(user, dispatch) : undefined;

  return (
    <>
    <h5>What do you want to do?</h5>
    <ul onClick={handleClick}>
      {elements}
    </ul>
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

function getData(data:{username: string}, dispatch: Dispatch) {
  return function handleClick(event: React.MouseEvent<HTMLUListElement, MouseEvent>) {
    const target = event.target as HTMLLIElement;
    if(target.tagName.toUpperCase() !== "LI") return;
    dispatch(actionSelUserMsg(data));
    console.log(target.dataset["id"]);
    return;
  };
};

/* ------- REDUX FUNCTIONS ------- */

function getUser(state: typeRootState) {
  return state.contacts.currentContact;
};

function mapStateToProps(state: typeRootState) {
  return {
    user: getUser(state)
  };
};

type props = ReturnType<typeof mapStateToProps>;

const ConnContactOptions = connect(mapStateToProps)(ContactOptions);

export default ConnContactOptions;