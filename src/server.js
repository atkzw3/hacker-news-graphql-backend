const { ApolloServer, gql } = require('apollo-server');
//スキーマを別ファイルに移動するため
const fs = require("fs");
const path = require("path");

// HackerNewsの配列
const links = [
  {
    id: 'links-0',
    description: 'GraphQLの説明です。',
    url: 'https://news.ycombinator.com/'
  },
  {
    id: 'links-1',
    description: 'GraphQLの説明2です。',
    url: 'https://cyounkins.medium.com/encrypted-dns-ntp-deadlock-9e378940b79f'
  },
]

// リゾルバ関数
// graphQLスキーマ定義で定義した型に対して値を入れる
const resolvers = {
  Query: {
    info: () => 'HackerNews クローン',
    feed: () => links,
  },

  Mutation: {
    createNews: (parent, args) => {
      let idCount = links.length;

      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      }

      links.push(link);
      return link;
    }
  }
};

/* Create an instance of ApolloServer */
// https://www.apollographql.com/docs/apollo-server/v2/getting-started
const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8"),
  resolvers
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
