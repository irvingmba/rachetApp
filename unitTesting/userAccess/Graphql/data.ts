import { string } from "prop-types";

/**
 * I will use this data as a little database to mock the schema and the resolvers of the graphql interface
 */
export const userInfo=[
    {
        id: "1",
        name: "Homero",
        birthday: (new Date("1970-05-30")).toDateString(),
        email: "homer@springfield.com",
    },
    {
        id: "2",
        name: "March",
        birthday: (new Date("1973-03-25")).toDateString(),
        email: "march@springfield.com",
    },
    {
        id: "3",
        name: "Lisa",
        birthday: (new Date("2000-01-5")).toDateString(),
        email: "lisa@springfield.com",
    },
    {
        id: "4",
        name: "Bart",
        birthday: (new Date("1998-11-17")).toDateString(),
        email: "bart@springfield.com",
    },
    {
        id: "5",
        name: "Maggie",
        birthday: (new Date("2005-02-22")).toDateString(),
        email: "maggie@springfield.com",
    },
];

export const userAccess = [
    {
        id: 1,
        nickname: "Dad",
        password: "qwertyui",
    },
    {
        id: 2,
        nickname: "Mom",
        password: "asdfghjk",
    },
    {
        id: 3,
        nickname: "Daughter",
        password: "zxcvbnm,",
    },
    {
        id: 4,
        nickname: "The kid",
        password: "qazwsxed",
    },
    {
        id: 5,
        nickname: "The baby",
        password: "rfvtgbyh",
    },
];

export const contactInfo = [
    {
        id: 1,
        contacts: [
            2, 3
        ],
        conversation: [
            100, 101, 102
        ],
    },
];