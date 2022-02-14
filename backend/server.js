// const { makeExecutableSchema } = require("graphql-tools");
// const ConstraintDirective = require("graphql-constraint-directive");
const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const cors = require("cors");
const { typeDefs, resolvers } = require("./graphql/resolve_def");

require("dotenv").config();
const { DB_USER, DB_PASS, DB_HOST, DB_NAME } = process.env;
const mongoURL = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;
mongoose
  .connect(mongoURL)
  .then(() => console.log("successfully connect to the database Atlas"))
  .catch((err) => console.log(`error connecting to the database Atlas ${err}`));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // mocks: true,

  // context: ({ req }) => ({
  //   //   // authScope: getScope(req.headers.authorization),
  // }),
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
