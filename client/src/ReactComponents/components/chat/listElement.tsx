import React from "react";
import { InOwnData } from "../../composedBlocks/chat/conversationList"

function ConvListElem(data: IConvListElem) {
  console.log("inside comp\n", data);
  const name = data.chatName ? data.chatName : data.participants
  .find(function(member){
    return member.username != data.ownData.username;
  });

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
  update: number;
  ownData: InOwnData;
};

export type TConvListElem = ReturnType<typeof ConvListElem>;

export default ConvListElem;