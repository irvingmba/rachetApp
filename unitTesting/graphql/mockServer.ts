/** 
 * Here we are configuring a server to mock the schema and the resolvers
 */
import { GraphQLServer } from 'graphql-yoga';

// Modules to be tested from the project
import { resolvers } from '../../userServer/src/resolvers';
const typeDefs = './userServer/src/schema.graphql';

// Testing the resolvers in the mocks
import { data } from './data';

const mocks={
    Query: ()=>({
        info: ()=>resolvers.Query.info(),
        getUser: (parent:any,args:any,context:any)=>resolvers.Query.getUser(parent,args,context)
    }),
    User: ()=>({
        id: (parent:any)=>resolvers.User.id(parent),
        name: (parent:any)=> resolvers.User.name(parent),
        nickname: (parent:any)=>resolvers.User.nickname(parent),
        birhtday: (parent:any)=>resolvers.User.birthday(parent),
        email: (parent:any)=>resolvers.User.email(parent),
    }),
    Mutation: ()=>({
        register: (parent:any,args:any,context:any)=>resolvers.Mutation.register(parent,args,context),
        login: (parent:any,args:any,context:any)=>resolvers.Mutation.login(parent,args,context),
    }),
};

const mockServer = new GraphQLServer({
    typeDefs,
    resolvers,
    mocks,
    context: data,
});

mockServer.start(()=>console.log(`Mocking on port 4000`));