import * as express from "express";
import { createYoga, createSchema } from "graphql-yoga";
import * as morgan from "morgan";
import 'colors'
const app = express();
const schema = createSchema({
  typeDefs: /* GraphQL */ `
    type Query {
      hello(name: String): String
    }
  `,
  resolvers: {
    Query: {
      hello: (_: any, { name }) => `${name} world`,
    },
  },
});

// Create a Yoga instance with a GraphQL schema.
const yoga = createYoga({ schema, logging: "info" });
morgan.token("graphql-query", (req: express.Request) => {
  const { query } = req.body;
  console.log(req.body);
  return `GRAPHQL`.yellow +`: \nQuery: ${query}`.blue;
});
app.use(express.json());
app.use(morgan(":graphql-query"));
// Pass it into a server to hook into request handlers.
app.use("/graphql", yoga);

// Start the server and you're done!
app.listen(4000, () => {
  console.info("Server is running on http://localhost:4000/graphql");
});
