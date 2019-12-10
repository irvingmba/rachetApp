import { GraphQLServer, Options } from 'graphql-yoga';
import { resolvers } from './resolvers';
import fs from 'fs';
import path from 'path';
import { ContextParameters } from 'graphql-yoga/dist/types';

const context = ( req:ContextParameters ) => {
  return {
    request: req.request,
    response: req.response,
  };
};

const server = new GraphQLServer({
  typeDefs: './userAccess/src/schema.graphql',
  resolvers,
  context,
})

const options:Options = {
  port: 4000,
  endpoint: "/gql",
  https: {
    key: fs.readFileSync(path.resolve(__dirname,'../keys/key.pem')),
    cert: fs.readFileSync(path.resolve(__dirname,'../keys/certificate.pem')),
  },
};

server.start(options,() => console.log(`User Access Server is running on https://localhost:4000/gql`));
