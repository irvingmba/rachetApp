/** 
 * Here we are configuring a server to mock the schema and the resolvers
 */
import { GraphQLServer, Options } from 'graphql-yoga';
import fs from 'fs';
import path from 'path';

// Modules to be tested from the project
import { resolvers } from '../../userAccess/src/resolvers';
const typeDefs = './userServer/src/schema.graphql';

// Testing the resolvers in the mocks
import { data } from './data';

const mocks={
    Query: ()=>({
        info: ()=>resolvers.Query.info(),
    }),
    Mutation: ()=>({
        register: (parent:any,args:any,context:any)=>resolvers.Mutation.register(parent,args,context),
        login: (parent:any,args:any,context:any)=>resolvers.Mutation.login(parent,args,context),
    }),
};

// Testing the graphql server configuration
const options:Options = {
    https: {
      key: fs.readFileSync(path.resolve(__dirname,'../../userServer/keys/key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname,'../../userServer/keys/certificate.pem')),
    },
  };

const mockServer = new GraphQLServer({
    typeDefs,
    resolvers,
    mocks,
    context: data,
});

mockServer.start(options,()=>console.log(`Mocking on port 4000`));