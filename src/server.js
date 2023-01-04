const { ApolloServer, gql } = require('apollo-server');
//スキーマを別ファイルに移動するため
const fs = require("fs");
const path = require("path");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// リゾルバ関数
// graphQLスキーマ定義で定義した型に対して値を入れる
const resolvers = {
  Query: {
    info: () => 'HackerNews クローン',
    feed: async (parent, args, context) => {
      return context.prisma.link.findMany();
    },
  },

  Mutation: {
    createNews: (parent, args, context) => {
      return context.prisma.link.create({
        data: {
          url: args.url,
          description: args.description
        },
      });
    }
  }
};

/* Create an instance of ApolloServer */
// https://www.apollographql.com/docs/apollo-server/v2/getting-started
const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8"),
  resolvers,
  context: {
    prisma,
  },
});

server.listen().then(({url}) => {
  console.log(`${url}でサーバを起動中・・・・`)
})


// playGround で取得する処理
//オブジェクトでの場合 例
// query {
//   feed{
//     id
//     description
//   }
// }
