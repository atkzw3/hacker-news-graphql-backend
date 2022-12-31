const { ApolloServer, gql } = require('apollo-server');

// graphQLスキーマ定義
const typeDefs = gql`
  # ! <= not exist null 
  type Query {
    info: String!
  }
`;

// リゾルバ関数
// graphQLスキーマ定義で定義した型に対して値を入れる
const resolvers = {
  Query: {
    info: () => 'HackerNews クローン',
  },
};