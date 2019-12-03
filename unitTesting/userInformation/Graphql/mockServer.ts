/** 
 * Here we are configuring a server to mock the schema and the resolvers
 */
import { GraphQLServer, Options } from 'graphql-yoga';
import fs from 'fs';
import path from 'path';

// Modules to be tested from the project
import { resolvers } from '../../../userInformation/src/resolvers';
const typeDefs = './userInformation/src/schema.graphql';

// Testing the resolvers in the mocks
import { UserInfo, access, contactInfo } from './data';

const mocks={
    Query: ()=>({
        info: ()=>resolvers.Query.info(),
    }),
};

// Testing the graphql server configuration
const options:Options = {
    https: {
      key: fs.readFileSync(path.resolve(__dirname,'../../../userInformation/keys/key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname,'../../../userInformation/keys/certificate.pem')),
    },
    port: 4001
  };

const mockServer = new GraphQLServer({
    typeDefs,
    resolvers,
    mocks,
    context: {
        userInfo: UserInfo,
        userAccess: access
    },
});

mockServer.start(options,()=>console.log(`Mocking on port https://localhost:4001`));