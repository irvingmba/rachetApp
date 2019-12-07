/** 
 * Here we are configuring a server to mock the schema and the resolvers
 */
import { GraphQLServer, Options } from 'graphql-yoga';
import fs from 'fs';
import path from 'path';
import cookieParser from 'cookie-parser';

// Modules to be tested from the project
import { resolvers } from '../../../userInformation/src/resolvers';
const typeDefs = './userInformation/src/schema.graphql';
import { authenticate } from '../../../userInformation/src/Authentication/authentication';

// Testing the resolvers in the mocks
import { UserInfo, access, contactInfo } from './data';
import { ContextParameters } from 'graphql-yoga/dist/types';

const mocks={
    Query: ()=>({
        info: ()=>resolvers.Query.info(),
        getOwnProfile: (parent:any,args:any,context:any) => resolvers.Query.getOwnProfile(parent,args,context),
        getContacts: (parent:any,args:any,context:any) => resolvers.Query.getContacts(parent,args,context),
        getContactInfo: (parent:any,args:any,context:any) => resolvers.Query.getContactInfo(parent,args,context),
    }),
    Mutation: ()=>({
        addContact: (parent:any,args:any,context:any) => resolvers.Mutation.addContact(parent,args,context),
        delContact: (parent:any,args:any,context:any) => resolvers.Mutation.delContact(parent,args,context),
    }),
    User: ()=>({
        id: (parent:any) => resolvers.User.id(parent),
        name: (parent:any) => resolvers.User.name(parent),
        nickname: (parent:any) => resolvers.User.nickname(parent),
        birthday: (parent:any) => resolvers.User.birthday(parent),
        email: (parent:any) => resolvers.User.email(parent),
    }),
    publicFace: ()=>({
        id: (parent:any) => resolvers.publicFace.id(parent),
        nickname: (parent:any) => resolvers.publicFace.nickname(parent),
        email: (parent:any) => resolvers.publicFace.email(parent),
    }),
};

// Testing the graphql server configuration

const context = (params:ContextParameters) => {
    return {
      request: params.request,
      response: params.response,
      userInfo: UserInfo,
      userAccess: access,
      contactInfo
    };
  };

const options:Options = {
    https: {
      key: fs.readFileSync(path.resolve(__dirname,'../../../userInformation/keys/key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname,'../../../userInformation/keys/certificate.pem')),
    },
    port: 4011,
    endpoint: "/gql",
  };

const mockServer = new GraphQLServer({
    typeDefs,
    resolvers,
    mocks,
    context,
});

mockServer.express.use(cookieParser());

mockServer.express.use(async(req,res,next)=> {
  try {
    const cookie:{token:string;} = req.cookies;
    if(cookie.token){
      const userID = await authenticate(cookie.token);
      console.log(userID);
      if(userID) {
        Object.assign(res.locals,{userID});
        next();
        return;
      };
    };
    throw "Code 31: Invalid token"
  } catch (error) {
    console.log(error);
  }
});

mockServer.start(options,()=>console.log(`Mocking on port https://localhost:4011`));