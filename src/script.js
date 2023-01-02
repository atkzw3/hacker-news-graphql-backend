// データベースにアクセスするためのクライアントライブラリ
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

async function main(){
  console.log("main");
  // prismaの後のリンクは、モデルを参照している。Link => link ex) User => prisma.userとなる
  const newLink = await prisma.link.create({
    data: {
      description: "猫はとてもかわいい生き物です",
      url: "こちらはURLです",
    }
  })

  const allLinks = await prisma.link.findMany();
  console.log("allLinks", allLinks);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
  // データベース接続を閉じる
  prisma.$disconnect();
})