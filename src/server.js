const { ApolloServer, gql } = require('apollo-server');
//スキーマを別ファイルに移動するため
const fs = require("fs");
const path = require("path");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { getUserId } = require("./utils")

// リゾルバ系
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const User = require("./resolvers/User");
const Link = require("./resolvers/Link");

// リゾルバ関数
// graphQLスキーマ定義で定義した型に対して値を入れる
const resolvers = {
  Query,
  Mutation,
  Link,
  User
};

/* Create an instance of ApolloServer */
// https://www.apollographql.com/docs/apollo-server/v2/getting-started
const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8"),
  resolvers,
  context: (request) => {
    return {
      ...request,
      prisma,
      userId: request && request.headers.authorization ? getUserId(request): null,
    }
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
