import { GraphQLScalarType, Kind } from 'graphql';
import { SchemUser } from './types';

export const resolvers = {
  Date: new GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar type",
    parseValue(value) {
      return new Date(value);// value comes from the client // from number to Date format
    },
    serialize(value) {
      return value.getTime();// value goes to the client// from Date to number format
    },
    parseLiteral(ast) {
      if(ast.kind===Kind.INT) {
        return new Date(ast.value);// ast value is always in string format
      };
      return null;
    },
  }),
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    getUser: (parent:{} ,args:{name:string},context:SchemUser[])=>{
      return context.find((user)=>user.name===args.name);
    },
  },
  User: {
    id: (parent:SchemUser)=>parent.id,
    name: (parent:SchemUser)=>parent.name,
    nickname: (parent:SchemUser)=>parent.nickname,
    birthday: (parent:SchemUser)=>parent.birthday,
    email: (parent:SchemUser)=>parent.email,
},
}; 