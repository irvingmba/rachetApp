// Interface for complete records
export interface SchemUser {
    id: string;
    name: string;
    nickname: string;
    birthday: string;
    email: string;
    password: string;
};

export interface QUsers {
    id: string;
    name: string;
    nickname: string;
    birthday: string;
    email: string;
};

export interface MUser {
    name: string;
    nickname: string;
    birthday: string;
    email: string;
    password: string;
};

export interface MLogin {
    user: string;
    password: string;
};