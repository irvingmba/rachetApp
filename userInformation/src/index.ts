import { GraphQLServer, Options } from 'graphql-yoga';
import { resolvers } from './resolvers';
import fs from 'fs';
import path from 'path';
import cookieParser from 'cookie-parser';
import { ContextParameters, Props } from 'graphql-yoga/dist/types';


const context = (params:ContextParameters) => {
  params.request.cookies
  return {
    request: params.request,
    response: params.response
  };
};

export const props:Props = {
  typeDefs: './userServer/src/schema.graphql',
  resolvers,
  context,
};

const server = new GraphQLServer(props);

export const options:Options = {
  https: {
    key: fs.readFileSync(path.resolve(__dirname,'../keys/key.pem')),
    cert: fs.readFileSync(path.resolve(__dirname,'../keys/certificate.pem')),
  },
  port: 4010,
  endpoint: "/gql",
};

server.express.use(cookieParser());

server.start(options,() => console.log(`User Information Server is running on https://localhost:4010`))
