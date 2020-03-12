export interface InConvo2Client {
  id: string;
  members: InMembers[];
  messages: InMessages[];
  updated: number;
  kind: TpKind;
  chatName: string;
};

interface InMembers {
  username: string;
  email?: string;
};

export interface InMessages {
  username: string;
  msg: string;
  date: number;
};

type TpKind = "simple" | "group";

export interface InDBContacts {
  id: string;
  nickname: string;
  email: string;
};

export interface InDBMessages {
  IDUser: string;
  message: string;
};

export interface InOwnInfo {
  id: string;
  name?: string;
  nickname?: string;
  birthday?: string;
  email?: string;
};