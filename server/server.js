const { ApolloServer } = require("apollo-server");
const typeDefs = `
  type Item {
    id: Int
    type: String
    description: String
  }

  type Query {
    prefixes: [Item]
    suffixes: [Item]
  }
`;

const items = [
  {
    id: 1,
    type: "prefix",
    description: "Air",
  },
  { id: 2, type: "prefix", description: "Jet" },
  { id: 3, type: "prefix", description: "Flight" },
  { id: 4, type: "suffix", description: "Hub" },
  { id: 5, type: "suffix", description: "Station" },
  { id: 6, type: "suffix", description: "Mart" },
];

const resolvers = {
  Query: {
    prefixes() {
      return items.filter((item) => item.type === "prefix");
    },
    suffixes() {
      return items.filter((item) => item.type === "suffix");
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen();
