import { data } from '../testData/data';

export const resolvers = {
    Query: {
      info: () => `This is the API of a Hackernews Clone`,
      user: (name:string) => {
        const result = data.find((user)=>user.name === name);
        return result;
    }
    },
    User: {
        name: (name:string) => {
            const result = data.find((user)=>user.name === name);
            return result;
        }
    },
  }