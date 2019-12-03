export interface IntUserInfo {
    id: string;
    name: string;
    birthday: string;
    email: string;
};
export interface IntUserAccess {
    id: string;
    nickname: string;
    password: string;
};
export interface IntContactInfo {
    id: string;
    contacts: string[];
    conversations: string[];
};

export interface IntUser {
    id: string;
    name: string;
    nickname: string;
    birthday: string;
    email: string;
};