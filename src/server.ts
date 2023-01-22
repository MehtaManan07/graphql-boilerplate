import * as express from "express";
import { createYoga, createSchema } from "graphql-yoga";
import * as morgan from "morgan";
import { resolvers } from './graphql/resolvers'
import "colors";
import { readFileSync } from "fs";
const app = express();
const schema = createSchema({
  typeDefs: readFileSync(require.resolve('./graphql/schema.graphql')).toString('utf-8'),
  resolvers,
});

// Create a Yoga instance with a GraphQL schema.
const yoga = createYoga({ schema, logging: "info" });
morgan.token("graphql-query", (req: express.Request) => {
  const { query } = req.body;
  return `GRAPHQL`.yellow + `: \nQuery: ${query}`.blue;
});
app.use(express.json());
app.use(morgan(":graphql-query"));
// Pass it into a server to hook into request handlers.
app.use("/graphql", yoga);

// Start the server and you're done!
app.listen(4000, () => {
  console.info("Server is running on http://localhost:4000/graphql");
});
