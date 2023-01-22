import { IResolverMap } from "./types/resolvers";
import * as gqlTypes from "./types/schema";

export const resolvers: IResolverMap = {
  Query: {
    hello: (_, { name }: gqlTypes.QueryHelloArgs) => `${name} world`,
  },
  Mutation: {
    register(_, { email, password }: gqlTypes.MutationRegisterArgs) {
      console.log({ email, password });
      return false
    },
  },
};
