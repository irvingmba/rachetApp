import React from "react";

function ConvListElem(data: IConvListElem, user: string) {
  const name = data.chatName ? data.chatName : data.participants.reduce(
    function(acc, val) {
      if(val.username === user){
        return acc;
      };
      return val.username;
    }, ""
  );

  return (
    <>
    <li>
    <p>{name}</p>
    </li>
    </>
  );
};

interface IConvListElem {
  chatName: string;
  participants: {
    username: string;
  }[];
  update: Date
};

export type TConvListElem = ReturnType<typeof ConvListElem>;

export default ConvListElem;