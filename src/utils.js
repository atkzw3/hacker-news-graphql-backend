const jwt =  require("jsonwebtoken");

APP_SECRET = "Graphql";

// トークンを複合する
function getTokenPayload(token){
  // トークン化された前の情報(user.id)を複合する
  return jwt.verify(token, APP_SECRET);
}

// ユーザーID取得する
function getUserId(request, authToken){
  if(request){
    // ヘッダーを確認し、認証権限確認
    const authHeader = request.header.authorization;
    if(authHeader){
      const token = authHeader.replace("Bearer", "");
      if(!token){
        throw new Error("トークンが見つかりません");
      }
      // トークンがない場合は、複合する
      const { userId } = getTokenPayload(token);

      return userId;
    }
  }else if(authToken){
    const { userId } = getTokenPayload(authToken);
    return userId;
  }

  throw new Error("認証権限がありません");
}


module.exports = {
  APP_SECRET,
  getUserId,
}