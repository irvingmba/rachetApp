/**
 * I will use this data as a little database to mock the schema and the resolvers of the graphql interface
 */
export const data=[
    {
        id: 1,
        name: "Homero",
        nickname: "Dad",
        birthday: (new Date("1970-05-30")).toDateString(),
        email: "homer@springfield.com"
    },
    {
        id: 2,
        name: "March",
        nickname: "Mom",
        birthday: (new Date("1973-03-25")).toDateString(),
        email: "march@springfield.com"
    },
    {
        id: 3,
        name: "Lisa",
        nickname: "Daughter",
        birthday: (new Date("2000-01-5")).toDateString(),
        email: "lisa@springfield.com"
    },
    {
        id: 4,
        name: "Bart",
        nickname: "The kid",
        birthday: (new Date("1998-11-17")).toDateString(),
        email: "bart@springfield.com"
    },
    {
        id: 5,
        name: "Maggie",
        nickname: "The baby",
        birthday: (new Date("2005-02-22")).toDateString(),
        email: "maggie@springfield.com"
    },
];