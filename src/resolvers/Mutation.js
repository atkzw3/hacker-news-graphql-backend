const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {APP_SECRET} = require("../utils");

// ユーザー新規登録
async function signup(parent, args, context){
  // パスワード設定
  // npm i bcryptjs 2引数は、ハッシュ化する桁数
  const password = await bcrypt.hash(args.password, 10);

  // 新規作成
  const user = await context.prisma.user.create({
    data: {
      ...args,
      password,
    },
  });
  // npm i jsonwebtoken
  const token = jwt.sign({
    userId: user.id
  }, APP_SECRET);

  return {
    token,
    user
  }
}

// ユーザーログイン
async function login(parent, args, context){
  const user = await context.prisma.user.findUnique({
    where: {
      email: args.email
    },
  });

  if(!user){
    throw new Error("そのようなユーザーは存在しません");
  }

  // パスワード比較
  const valid = await bcrypt.compare(args.password, user.password);
  if(!valid){
    throw new Error("無効なパスワードです");
  }

  // パスワード一致
  const token = jwt.sign({
    userId: user.id
  }, APP_SECRET);

  return {
    token,
    user
  }
}

// ニュース投稿
async function createNews(parent, args, context){
  const userId  = context.userId;

  return await context.prisma.link.create({
    data: {
      url: args.url,
      description: args.description,
      postedBy: {
        connect: {
          id: userId,
        }
      }
    },
  });
}

module.exports = {
  signup,
  login,
  createNews,
}