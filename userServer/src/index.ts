import { GraphQLServer, Options } from 'graphql-yoga';
import { resolvers } from './resolvers';
import fs from 'fs';
import path from 'path';

const server = new GraphQLServer({
  typeDefs: './userServer/src/schema.graphql',
  resolvers,
})

const options:Options = {
  https: {
    key: fs.readFileSync(path.resolve(__dirname,'../keys/key.pem')),
    cert: fs.readFileSync(path.resolve(__dirname,'../keys/certificate.pem')),
  },
};

server.start(options,() => console.log(`Server is running on https://localhost:4000`))